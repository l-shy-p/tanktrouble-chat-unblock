// TT Chat Unblock — v1.2 (commit c718734 + log + sig + dedup)
(function () {
  "use strict";

  // 签名（面板可关）
  var SIGNATURE = " [TT Unblock]";
  var settings = { sig: true, on: true };
  try {
    chrome.storage.local.get(["signatureEnabled", "enabled"], function (d) {
      if (d.signatureEnabled !== undefined) settings.sig = d.signatureEnabled;
      if (d.enabled !== undefined) settings.on = d.enabled;
    });
    chrome.storage.onChanged.addListener(function (c) {
      if (c.signatureEnabled) settings.sig = c.signatureEnabled.newValue;
      if (c.enabled) settings.on = c.enabled.newValue;
    });
  } catch (e) {}

  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 127) return true;
    }
    return false;
  }

  function encode(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) {
        r += "\\u" + ("000" + c.toString(16)).slice(-4);
      } else if (s.charAt(i) === "\\") {
        r += "\\\\";
      } else {
        r += s.charAt(i);
      }
    }
    return r;
  }

  function decode(s) {
    if (!s) return s;
    return s.replace(/\\u([0-9a-fA-F]{4})/g, function (_, h) {
      return String.fromCharCode(parseInt(h, 16));
    });
  }

  function hook() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    console.log("[TT] hooked — ChatBox ready");

    // ---- 发送 ----
    var origSendChat = CB.sendChat;
    CB.sendChat = function () {
      if (!settings.on) return origSendChat.apply(this, arguments);

      var val = this.chatInput.val();
      if (!val || !hasNonAscii(val)) {
        return origSendChat.apply(this, arguments);
      }

      // 防重复：等待服务器回执时忽略重复回车
      if (this.chat.hasClass("send")) {
        console.log("[TT] send blocked: already sending");
        return;
      }

      var parsed = this._parseChat();
      console.log("[TT] send: \"" + parsed + "\" (" + parsed.length + " chars)");
      if (!parsed || !hasNonAscii(parsed)) {
        return origSendChat.apply(this, arguments);
      }

      var encoded = encode(parsed);
      if (settings.sig) encoded += SIGNATURE;
      console.log("[TT] encoded: " + encoded.length + " chars → sending");
      this._sendChat(encoded);
    };

    // ---- 接收 ----
    function mkDec(orig, idx, label) {
      return function () {
        var m = arguments[idx];
        if (typeof m === "string" && m.indexOf("\\u") !== -1) {
          var d = decode(m);
          console.log("[TT] recv[" + label + "]: \"" + d + "\"");
          arguments[idx] = d;
        }
        return orig.apply(this, arguments);
      };
    }
    CB.addChatMessage       = mkDec(CB.addChatMessage,       1, "pub");
    CB.addGlobalChatMessage = mkDec(CB.addGlobalChatMessage, 1, "glo");
    CB.addUserChatMessage   = mkDec(CB.addUserChatMessage,   2, "prv");

    var origSys = CB.addSystemMessage;
    CB.addSystemMessage = function (p, m, u) {
      if (typeof m === "string") m = decode(m);
      return origSys.call(this, p, m, u);
    };

    return true;
  }

  var n = 0;
  (function go() { n++; if (hook()) return; if (n < 30) setTimeout(go, 200); else console.warn("[TT] ChatBox not found"); })();
})();
