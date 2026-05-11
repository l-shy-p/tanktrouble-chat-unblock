(function () {
  "use strict";

  // ============================================================
  // Config
  // ============================================================
  var SIGNATURE = " [🌐 TT Unblock]";
  var SEND_TIMEOUT = 6000;
  var XOR_KEY = 0x5A5A;
  var DEDUP_WINDOW = 5000;

  var G = "color: #4f8; font-weight: bold;";
  var Y = "color: #fc0; font-weight: bold;";
  var N = "color: inherit;";
  function log(m) { console.log("%c[TT]%c " + m, G, N); }
  function warn(m) { console.warn("%c[TT]%c " + m, Y, N); }

  // ============================================================
  // Settings
  // ============================================================
  var S = { sig: true, recover: true, on: true };
  var stats = { sent: 0, recv: 0 };

  try {
    chrome.storage.local.get(
      ["signatureEnabled", "autoRecover", "enabled", "sentCount", "recvCount"],
      function (d) {
        if (d.signatureEnabled !== undefined) S.sig = d.signatureEnabled;
        if (d.autoRecover !== undefined) S.recover = d.autoRecover;
        if (d.enabled !== undefined) S.on = d.enabled;
        if (d.sentCount !== undefined) stats.sent = d.sentCount;
        if (d.recvCount !== undefined) stats.recv = d.recvCount;
      }
    );
    chrome.storage.onChanged.addListener(function (c, a) {
      if (a !== "local") return;
      if (c.enabled) S.on = c.enabled.newValue;
      if (c.signatureEnabled) S.sig = c.signatureEnabled.newValue;
      if (c.autoRecover) S.recover = c.autoRecover.newValue;
    });
    function incStat(k) { stats[k]++; try { var o = {}; o[k + "Count"] = stats[k]; chrome.storage.local.set(o); } catch (e) {} }
  } catch (e) { function incStat(k) {} }

  // ============================================================
  // Encode / Decode
  // ============================================================
  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) { if (s.charCodeAt(i) > 127) return true; }
    return false;
  }
  function encChar(c) { return "~" + ("000" + ((c ^ XOR_KEY) & 0xFFFF).toString(16)).slice(-4); }
  function encode(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) r += encChar(c);
      else if (s.charAt(i) === "\\") r += "\\\\";
      else r += s.charAt(i);
    }
    return r;
  }
  function descramble(h) { return String.fromCharCode((parseInt(h, 16) ^ XOR_KEY) & 0xFFFF); }
  function decode(s) {
    if (!s) return s;
    return s.replace(/~([0-9a-fA-F]{4})/g, function (_, h) { return descramble(h); });
  }
  function stripSig(s) {
    if (!s) return s;
    var i = s.lastIndexOf(" [🌐 TT Unblock]");
    return i >= 0 ? s.substring(0, i).replace(/\s+$/, "") : s;
  }

  // ============================================================
  // Local echo dedup
  // ============================================================
  var recent = [];
  function addRecent(t) {
    var now = Date.now();
    recent.push({ t: t, ts: now });
    recent = recent.filter(function (r) { return now - r.ts < DEDUP_WINDOW; });
  }
  function isRecent(t) {
    var now = Date.now();
    for (var i = 0; i < recent.length; i++) {
      if (recent[i].t === t && now - recent[i].ts < DEDUP_WINDOW) return true;
    }
    return false;
  }

  // ============================================================
  // Hook
  // ============================================================
  function hook() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    log("ready");

    try { CB.chatInput.removeAttr("maxlength"); } catch (e) {}

    // ---- 1. _notifyEventListeners: encode outgoing messages ----
    var origNotify = CB._notifyEventListeners;
    CB._notifyEventListeners = function (evt, data) {
      if (!S.on) return origNotify.call(this, evt, data);

      if (evt === CB.EVENTS.CHAT || evt === CB.EVENTS.GLOBAL_CHAT) {
        if (typeof data === "string" && hasNonAscii(data)) {
          var enc = encode(data);
          if (S.sig) enc += SIGNATURE;
          log("enc[" + evt + "]: \"" + data + "\" → " + enc.length + "c");
          data = enc; incStat("sent");
        }
      } else if (evt === CB.EVENTS.USER_CHAT) {
        if (data && typeof data.message === "string" && hasNonAscii(data.message)) {
          var enc = encode(data.message);
          if (S.sig) enc += SIGNATURE;
          log("enc[user]: → " + enc.length + "c");
          data = { recipientPlayerIds: data.recipientPlayerIds, message: enc };
          incStat("sent");
        }
      }
      return origNotify.call(this, evt, data);
    };
    log("hooked _notifyEventListeners");

    // ---- 2. _sendChat: local echo + timeout ----
    var origSend = CB._sendChat;
    CB._sendChat = function (msg) {
      // 调用原始 _sendChat
      var result = origSend.call(this, msg);

      if (!S.on) return result;

      // 本地回显：把原文立即显示在聊天列表
      if (msg && hasNonAscii(msg)) {
        try {
          var U = window.TankTrouble ? window.Users || TankTrouble.Users : window.Users;
          if (U && U.getAllPlayerIds) {
            var ids = U.getAllPlayerIds();
            if (ids && ids.length > 0) {
              CB.addChatMessage(ids, msg, 0);
              addRecent(msg);
              log("echo: \"" + msg + "\"");
            }
          }
        } catch (e) { warn("echo: " + e.message); }
      }

      // 超时恢复
      if (S.recover) {
        var self = this;
        this.__ttTimeout = setTimeout(function () {
          if (self.chat && self.chat.hasClass("send")) {
            warn("timeout recovery");
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
      }

      return result;
    };
    log("hooked _sendChat (echo + timeout)");

    // ---- 3. Receipt: clear timeout ----
    var origReceipt = CB._handleChatSendReceipt;
    CB._handleChatSendReceipt = function (r) {
      if (r && r !== "" && this.__ttTimeout) {
        clearTimeout(this.__ttTimeout);
        this.__ttTimeout = null;
        log("receipt: " + r);
      }
      return origReceipt.call(this, r);
    };

    // ---- 4. Receive decode ----
    function mkDec(orig, idx, label) {
      return function () {
        var m = arguments[idx];
        if (typeof m === "string" && m.indexOf("~") !== -1) {
          var d = decode(m);
          d = stripSig(d);
          if (isRecent(d)) { log("dedup[" + label + "]"); return; }
          if (d !== m) {
            log("recv[" + label + "]: \"" + d.substring(0, 30) + "\"");
            arguments[idx] = d; incStat("recv");
          }
        }
        return orig.apply(this, arguments);
      };
    }
    CB.addChatMessage       = mkDec(CB.addChatMessage,       1, "pub");
    CB.addGlobalChatMessage = mkDec(CB.addGlobalChatMessage, 1, "glo");
    CB.addUserChatMessage   = mkDec(CB.addUserChatMessage,   2, "usr");

    var origSys = CB.addSystemMessage;
    CB.addSystemMessage = function (p, m, u) {
      if (typeof m === "string") {
        if (/fail|error|send|chat|banned/i.test(m)) warn("sys: \"" + m + "\"");
        m = decode(m);
      }
      return origSys.call(this, p, m, u);
    };

    log("=== Ready ===");
    return true;
  }

  // ============================================================
  // Start
  // ============================================================
  var n = 0;
  (function go() { n++; if (hook()) return; if (n < 30) setTimeout(go, 200); else warn("ChatBox not found. Enter a game room and reload."); })();
})();
