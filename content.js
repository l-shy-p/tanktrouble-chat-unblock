(function () {
  "use strict";

  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 127) return true;
    }
    return false;
  }

  // 非 ASCII → \uXXXX / \uXXXX → 原字符
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

    // ---- 发送：绕过原始 sendChat，直接编码后发送 ----
    var origSendChat = CB.sendChat;
    CB.sendChat = function () {
      var val = this.chatInput.val();
      if (!val || !hasNonAscii(val)) {
        return origSendChat.apply(this, arguments);
      }

      var parsed = this._parseChat();
      if (!parsed || !hasNonAscii(parsed)) {
        return origSendChat.apply(this, arguments);
      }

      var encoded = encode(parsed);
      this._sendChat(encoded);
    };

    // ---- 接收：解码 ----
    function mkDec(orig, idx) {
      return function () {
        var m = arguments[idx];
        if (typeof m === "string" && m.indexOf("\\u") !== -1) {
          arguments[idx] = decode(m);
        }
        return orig.apply(this, arguments);
      };
    }
    CB.addChatMessage       = mkDec(CB.addChatMessage,       1);
    CB.addGlobalChatMessage = mkDec(CB.addGlobalChatMessage, 1);
    CB.addUserChatMessage   = mkDec(CB.addUserChatMessage,   2);

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
