(function () {
  "use strict";

  // ============================================================
  // Config / 配置
  // ============================================================
  var EXT_SITE = "https://github.com/L-Shy-P/TankTrouble-Chat-Unblock";
  // 签名不包含链接，仅说明乱码含义 / no URL in chat watermark
  var SIGNATURE = " [🌐 TT Unblock]";
  var SEND_TIMEOUT = 6000;
  var XOR_KEY = 0x5A5A;

  // 本地回显去重：5 秒内相同内容不重复渲染 / dedup window
  var DEDUP_WINDOW = 5000;

  // ============================================================
  // Logging / 日志
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
  // Settings from storage / 读取面板设置
  // ============================================================
  var settings = {
    signatureEnabled: true,
    autoRecover: true,
    enabled: true
  };
  var stats = { sent: 0, recv: 0 };

  try {
    chrome.storage.local.get(
      ["signatureEnabled", "autoRecover", "enabled", "sentCount", "recvCount"],
      function (data) {
        if (data.signatureEnabled !== undefined) settings.signatureEnabled = data.signatureEnabled;
        if (data.autoRecover !== undefined) settings.autoRecover = data.autoRecover;
        if (data.enabled !== undefined) settings.enabled = data.enabled;
        if (data.sentCount !== undefined) stats.sent = data.sentCount;
        if (data.recvCount !== undefined) stats.recv = data.recvCount;
      }
    );
    chrome.storage.onChanged.addListener(function (changes, area) {
      if (area !== "local") return;
      if (changes.enabled) settings.enabled = changes.enabled.newValue;
      if (changes.signatureEnabled) settings.signatureEnabled = changes.signatureEnabled.newValue;
      if (changes.autoRecover) settings.autoRecover = changes.autoRecover.newValue;
    });
    function incStat(key) {
      stats[key]++;
      try {
        var obj = {};
        obj[key + "Count"] = stats[key];
        chrome.storage.local.set(obj);
      } catch (e) {}
    }
  } catch (e) {
    function incStat(key) {}
  }

  // ============================================================
  // Encode / 编码
  // ============================================================
  function hasNonAscii(str) {
    if (!str) return false;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127) return true;
    }
    return false;
  }

  function encodeChar(code) {
    var scrambled = (code ^ XOR_KEY) & 0xFFFF;
    return "~" + ("000" + scrambled.toString(16)).slice(-4);
  }

  // 非 ASCII → XOR 加扰 → ~XXXX
  function encodeNonAscii(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      var ch = str.charAt(i);
      if (code > 127) {
        result += encodeChar(code);
      } else if (ch === "\\") {
        result += "\\\\";
      } else {
        result += ch;
      }
    }
    return result;
  }

  // ============================================================
  // Decode / 解码
  // ============================================================
  function descrambleHex(hex) {
    var val = parseInt(hex, 16);
    return String.fromCharCode((val ^ XOR_KEY) & 0xFFFF);
  }

  // ~XXXX → XOR 解扰 → 原字符
  function decodeUnicodeEscapes(str) {
    if (!str) return str;
    return str.replace(/~([0-9a-fA-F]{4})/g, function (_, hex) {
      return descrambleHex(hex);
    });
  }

  // 剥离签名 for extension users / 扩展用户去签名
  function stripSignature(str) {
    if (!str) return str;
    var sigStart = str.lastIndexOf(" [🌐 TT Unblock]");
    if (sigStart >= 0) {
      return str.substring(0, sigStart).replace(/\s+$/, "");
    }
    return str;
  }

  // ============================================================
  // 本地回显去重 / Local echo dedup
  // ============================================================
  var recentSends = [];  // [{text, time}]

  function addRecentSend(text) {
    var now = Date.now();
    recentSends.push({ text: text, time: now });
    // 清理过期记录 / purge old entries
    recentSends = recentSends.filter(function (r) {
      return now - r.time < DEDUP_WINDOW;
    });
  }

  function isRecentSend(text) {
    var now = Date.now();
    for (var i = 0; i < recentSends.length; i++) {
      if (recentSends[i].text === text && now - recentSends[i].time < DEDUP_WINDOW) {
        return true;
      }
    }
    return false;
  }

  // ============================================================
  // Hook ChatBox / 挂钩
  // ============================================================
  function hookChatBox() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    log("ChatBox ready");

    // 解除输入长度限制
    try { CB.chatInput.removeAttr("maxlength"); } catch (e) {}

    // ========================================================
    // 1. sendChat — 入口
    // ========================================================
    var origSendChat = CB.sendChat;
    CB.sendChat = function () {
      if (!settings.enabled) return origSendChat.apply(this, arguments);

      var input = this.chatInput;
      var val = input.val();

      log("send: disabled=" + input.prop("disabled") +
        " len=" + (val ? val.length : 0) +
        " \"" + (val || "").substring(0, 30) + "\"");

      if (!val || !hasNonAscii(val)) {
        return origSendChat.apply(this, arguments);
      }

      var parsed = this._parseChat();
      if (!parsed || !hasNonAscii(parsed)) {
        return origSendChat.apply(this, arguments);
      }

      // 编码
      var encoded = encodeNonAscii(parsed);
      var fullMsg = settings.signatureEnabled ? encoded + SIGNATURE : encoded;
      log("encoded: \"" + parsed + "\" → " + fullMsg.length + " chars");

      // === 本地回显：立即在聊天框显示，不等待服务器回执 ===
      try {
        var localPlayerIds = Users.getAllPlayerIds();
        if (localPlayerIds.length > 0) {
          CB.addChatMessage(localPlayerIds, parsed, 0);
          addRecentSend(parsed);
          log("local echo: \"" + parsed + "\"");
        }
      } catch (e) {
        warn("local echo failed: " + e.message);
      }

      // 发送
      this._sendChat(fullMsg);
      incStat("sent");

      // 超时恢复
      if (settings.autoRecover) {
        var self = this;
        var tid = setTimeout(function () {
          if (self.chat && self.chat.hasClass("send")) {
            warn("no receipt, force recovery");
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
    // 2. Receipt handler / 回执处理
    // ========================================================
    var origHandleReceipt = CB._handleChatSendReceipt;
    CB._handleChatSendReceipt = function (receipt) {
      if (receipt && receipt !== "" && this.__sendTimeout) {
        clearTimeout(this.__sendTimeout);
        this.__sendTimeout = null;
        log("receipt: " + receipt);
      }
      return origHandleReceipt.call(this, receipt);
    };

    // ========================================================
    // 3. Receive decoder / 接收解码（带去重）
    // ========================================================
    function makeDecoder(origFn, msgIdx, label) {
      return function () {
        var msg = arguments[msgIdx];
        if (typeof msg === "string" && msg.indexOf("~") !== -1) {
          var decoded = decodeUnicodeEscapes(msg);
          decoded = stripSignature(decoded);

          // 去重：跳过本地回显已渲染的消息 / skip locally echoed
          if (isRecentSend(decoded)) {
            log("dedup[" + label + "]: skipped echo");
            return;  // 不渲染重复消息
          }

          if (decoded !== msg) {
            log("recv[" + label + "]: \"" + decoded.substring(0, 30) + "\"");
            arguments[msgIdx] = decoded;
            incStat("recv");
          }
        }
        return origFn.apply(this, arguments);
      };
    }

    CB.addChatMessage       = makeDecoder(CB.addChatMessage,       1, "public");
    CB.addGlobalChatMessage = makeDecoder(CB.addGlobalChatMessage, 1, "global");
    CB.addUserChatMessage   = makeDecoder(CB.addUserChatMessage,   2, "private");

    // 系统消息
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

    log("=== Ready ===");
    log("local-echo | dedup | sig:" + settings.signatureEnabled);
    return true;
  }

  // ============================================================
  // Startup / 启动
  // ============================================================
  var retries = 0;
  function init() {
    retries++;
    if (hookChatBox()) return;
    if (retries < 30) setTimeout(init, 200);
    else warn("ChatBox not found. Enter a game room and reload.");
  }
  init();
})();
