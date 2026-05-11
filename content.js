(function () {
  "use strict";

  // ============================================================
  // Config / 配置
  // ============================================================
  var EXT_SITE = "https://github.com/L-Shy-P/TankTrouble-Chat-Unblock";
  var SIGNATURE = " [TTChat by L_Shy_P: " + EXT_SITE + "]";
  var SEND_TIMEOUT = 6000;          // receipt timeout / 无应答超时(ms)
  var XOR_KEY = 0x5A5A;             // scramble key / 加扰密钥

  // ============================================================
  // Logging helpers / 日志工具
  // ============================================================
  var GREEN = "color: #4f8; font-weight: bold;";
  var YELLOW = "color: #fc0; font-weight: bold;";
  var NONE = "color: inherit;";

  function log(msg) {
    console.log("%c[TT]%c " + msg, GREEN, NONE);
  }
  function warn(msg) {
    console.warn("%c[TT]%c " + msg, YELLOW, NONE);
  }

  // ============================================================
  // Load settings from storage / 读取用户设置
  // ============================================================
  var settings = {
    signatureEnabled: true,   // append signature? / 是否附加签名
    autoRecover: true,         // auto-recover on timeout? / 超时自动恢复
    enabled: true              // extension enabled? / 扩展是否启用
  };

  // Stats counter / 统计计数
  var stats = { sent: 0, recv: 0 };

  try {
    chrome.storage.local.get(["signatureEnabled", "autoRecover", "enabled", "sentCount", "recvCount"],
      function (data) {
        if (data.signatureEnabled !== undefined) settings.signatureEnabled = data.signatureEnabled;
        if (data.autoRecover !== undefined) settings.autoRecover = data.autoRecover;
        if (data.enabled !== undefined) settings.enabled = data.enabled;
        if (data.sentCount !== undefined) stats.sent = data.sentCount;
        if (data.recvCount !== undefined) stats.recv = data.recvCount;
      });

    // Listen for popup settings changes / 监听面板设置变更
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area !== "local") return;
      if (changes.enabled) settings.enabled = changes.enabled.newValue;
      if (changes.signatureEnabled) settings.signatureEnabled = changes.signatureEnabled.newValue;
      if (changes.autoRecover) settings.autoRecover = changes.autoRecover.newValue;
    });

    // Increment stat & persist / 递增统计并持久化
    function incStat(key) {
      stats[key]++;
      try {
        var obj = {};
        obj[key + "Count"] = stats[key];
        chrome.storage.local.set(obj);
      } catch (e) {}
    }
  } catch (e) {
    // storage API unavailable / 不可用时使用默认
    function incStat(key) {}
  }

  // ============================================================
  // Encode: non-ASCII → XOR scramble → ~XXXX  /  编码
  // ============================================================
  function hasNonAscii(str) {
    if (!str) return false;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return true;
    }
    return false;
  }

  // Encode one char / 编码单个字符
  function encodeChar(code) {
    var scrambled = (code ^ XOR_KEY) & 0xFFFF;
    return "~" + ("000" + scrambled.toString(16)).slice(-4);
  }

  // Encode a string: replace non-ASCII with ~XXXX escapes
  // 编码字符串：非 ASCII → XOR 加扰 → ~XXXX
  function encodeNonAscii(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      var ch = str.charAt(i);
      if (code > 127) {
        result += encodeChar(code);
      } else if (ch === "\\") {
        result += "\\\\";    // preserve literal backslash / 保留原始反斜杠
      } else {
        result += ch;
      }
    }
    return result;
  }

  // ============================================================
  // Decode: ~XXXX → XOR descramble → original char  /  解码
  // ============================================================
  function descrambleHex(hex) {
    var val = parseInt(hex, 16);
    return String.fromCharCode((val ^ XOR_KEY) & 0xFFFF);
  }

  // Decode all ~XXXX sequences in a string
  // 解码字符串中所有 ~XXXX 序列
  function decodeUnicodeEscapes(str) {
    if (!str) return str;
    return str.replace(/~([0-9a-fA-F]{4})/g, function (_, hex) {
      return descrambleHex(hex);
    });
  }

  // Strip signature for extension users / 扩展用户自动去签名
  function stripSignature(str) {
    if (!str) return str;
    var sigStart = str.lastIndexOf(" [TTChat by");
    if (sigStart >= 0) {
      return str.substring(0, sigStart).replace(/\s+$/, "");
    }
    return str;
  }

  // ============================================================
  // Hook ChatBox / 挂钩聊天框
  // ============================================================
  function hookChatBox() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    log("ChatBox ready / ChatBox 就绪");

    // ---- Remove maxlength limit / 解除输入长度限制 ----
    try {
      CB.chatInput.removeAttr("maxlength");
      log("maxlength removed / 已移除长度限制");
    } catch (e) {}

    // ========================================================
    // 1. sendChat — main entry: encode + sign + timeout
    //    sendChat — 主入口：编码 + 签名 + 超时恢复
    // ========================================================
    var origSendChat = CB.sendChat;
    CB.sendChat = function () {
      // If extension disabled, pass through / 扩展禁用时原样放行
      if (!settings.enabled) {
        return origSendChat.apply(this, arguments);
      }

      var input = this.chatInput;
      var val = input.val();

      log("send: disabled=" + input.prop("disabled") +
        " len=" + (val ? val.length : 0) +
        " \"" + (val || "").substring(0, 30) + "\"");

      // ASCII-only → pass through / 纯 ASCII → 原样放行
      if (!val || !hasNonAscii(val)) {
        return origSendChat.apply(this, arguments);
      }

      // Parse commands (#global, @mention, /r reply, etc.)
      // 解析命令前缀（#全局、@私聊、/r回复 等）
      var parsed = this._parseChat();
      log("parsed: \"" + parsed + "\"");

      if (!parsed || !hasNonAscii(parsed)) {
        return origSendChat.apply(this, arguments);
      }

      // XOR scramble + encode to ~XXXX + optional signature
      // XOR 加扰 + ~XXXX 编码 + 可选签名
      var encoded = encodeNonAscii(parsed);
      var fullMsg = settings.signatureEnabled ? encoded + SIGNATURE : encoded;
      log("encoded: \"" + parsed + "\" → " + fullMsg.length + " chars" +
        (settings.signatureEnabled ? " (signed)" : ""));

      this._sendChat(fullMsg);
      incStat("sent");

      // Timeout recovery: force UI reset if server doesn't respond
      // 超时恢复：服务器无应答时强制重置 UI
      if (settings.autoRecover) {
        var self = this;
        var tid = setTimeout(function () {
          if (self.chat && self.chat.hasClass("send")) {
            warn("no receipt, force recovery / 无应答，强制恢复");
            try {
              self.chat.removeClass("send");
              if (self._updateInputBackground) self._updateInputBackground(true);
              if (self.chatInput) {
                self.chatInput.prop("disabled", false);
                self.chatInput.val("");
                self.chatInput.outerHeight(16);
              }
            } catch (e) {}
          }
        }, SEND_TIMEOUT);
        this.__sendTimeout = tid;
      }
    };

    // ========================================================
    // 2. _handleChatSendReceipt — clear timeout on our receipt
    //    _handleChatSendReceipt — 自己消息回执到达时清除超时
    // ========================================================
    var origHandleReceipt = CB._handleChatSendReceipt;
    CB._handleChatSendReceipt = function (receipt) {
      // Only clear for non-empty receipts (our own message echo)
      // 仅非空 receipt 才代表我们自己消息的确认
      if (receipt && receipt !== "" && this.__sendTimeout) {
        clearTimeout(this.__sendTimeout);
        this.__sendTimeout = null;
        log("receipt: " + receipt + " ✓");
      }
      return origHandleReceipt.call(this, receipt);
    };

    // ========================================================
    // 3. Receive decode — XOR descramble + strip signature
    //    接收解码 — XOR 解扰 + 剥离签名
    // ========================================================
    function makeDecoder(origFn, msgIdx, label) {
      return function () {
        var msg = arguments[msgIdx];
        if (typeof msg === "string" && msg.indexOf("~") !== -1) {
          var decoded = decodeUnicodeEscapes(msg);
          decoded = stripSignature(decoded);
          if (decoded !== msg) {
            log("recv[" + label + "]: \"" + decoded.substring(0, 30) + "\"");
            arguments[msgIdx] = decoded;
            incStat("recv");
          }
        }
        return origFn.apply(this, arguments);
      };
    }

    // Public chat / 公共聊天
    CB.addChatMessage       = makeDecoder(CB.addChatMessage,       1, "public");
    // Global (#) chat / 全局聊天
    CB.addGlobalChatMessage = makeDecoder(CB.addGlobalChatMessage, 1, "global");
    // Private (@) chat / 私聊 (message is 3rd arg)
    CB.addUserChatMessage   = makeDecoder(CB.addUserChatMessage,   2, "private");

    // System message: decode + diagnostic logging
    // 系统消息：解码 + 诊断日志
    var origSys = CB.addSystemMessage;
    CB.addSystemMessage = function (playerIds, msg, unignorable) {
      if (typeof msg === "string") {
        if (/fail|error|send|chat|banned/i.test(msg)) {
          warn("system: \"" + msg + "\"");
        }
        msg = decodeUnicodeEscapes(msg);
      }
      return origSys.call(this, playerIds, msg, unignorable);
    };

    log("=== Ready / 就绪 ===");
    log("XOR+~enc | signature:" + settings.signatureEnabled +
      " | recovery:" + settings.autoRecover);
    return true;
  }

  // ============================================================
  // Startup with retry / 启动（带重试）
  // ============================================================
  var retries = 0;
  function init() {
    retries++;
    if (hookChatBox()) return;
    if (retries < 30) setTimeout(init, 200);
    else warn("Timeout: ChatBox not found. Enter a game room and reload. / 超时：未找到 ChatBox，请进入游戏房间后刷新");
  }
  init();
})();
