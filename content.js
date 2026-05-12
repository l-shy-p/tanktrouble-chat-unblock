// TT Chat Unblock — MAIN world
(function () {
  "use strict";

  var SIGNATURE = " [Chat Unblocker]";
  var settings = { sig: true, on: true, lang: "en" };

  // @失败多语言提示
  var MSG_NO_RECIPIENTS = {
    en: "No valid recipients — message not sent",
    zh: "无有效收件人 — 消息未发送",
    ja: "有効な受信者がいません — 送信取消",
    ko: "유효한 수신자가 없습니다 — 전송 취소",
    ru: "Нет получателей — не отправлено",
    ar: "لا يوجد مستلمون صالحون — لم يتم الإرسال",
    fr: "Aucun destinataire — non envoyé",
    es: "Sin destinatarios válidos — no enviado",
    de: "Keine gültigen Empfänger — nicht gesendet",
    pt: "Sem destinatários — não enviado"
  };

  // ---- bridge 通信 ----
  window.addEventListener("message", function (e) {
    if (!e.data || e.data.source !== "tt-bridge") return;
    var d = e.data.data;
    if (d.type === "init")  { settings.sig = d.sig; settings.on = d.on; settings.lang = d.lang; console.log("[TT] init sig="+settings.sig+" on="+settings.on+" lang="+settings.lang); }
    if (d.type === "sig")   { settings.sig = d.value; console.log("[TT] sig→" + settings.sig); }
    if (d.type === "on")    { settings.on  = d.value; console.log("[TT] on→" + settings.on); }
    if (d.type === "lang")  { settings.lang = d.value; console.log("[TT] lang→" + settings.lang); }
    if (d.type === "reset") { doReset(); }
  });

  function doReset() {
    try {
      var CB = window.TankTrouble && window.TankTrouble.ChatBox;
      if (CB && CB.chat && CB.chatInput) {
        CB.chat.removeClass("send user global");
        if (CB._updateInputBackground) CB._updateInputBackground(true);
        CB.chatInput.prop("disabled", false);
        var txt = CB.chatInput.val();
        if (txt) { CB.chatInput[0].select(); document.execCommand("copy"); }
        CB.chatInput.val("").outerHeight(16);
        console.log("[TT] reset done");
      }
    } catch (e) {}
  }

  // ---- 编码/解码 ----
  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) { if (s.charCodeAt(i) > 127) return true; }
    return false;
  }
  function encode(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) r += "\\u" + ("000" + c.toString(16)).slice(-4);
      else if (s.charAt(i) === "\\") r += "\\\\";
      else r += s.charAt(i);
    }
    return r;
  }
  function decode(s) {
    if (!s) return s;
    return s.replace(/\\u([0-9a-fA-F]{4})/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });
  }
  function stripSig(s) {
    if (!s) return s;
    var p = s.lastIndexOf(SIGNATURE);
    return p >= 0 ? s.substring(0, p) : s;
  }

  // ---- @私聊异步查找 ----
  function resolveRecipients(CB, usernames, callback) {
    var count = 0, total = usernames.length;
    var notFound = []; // 未找到的用户名
    for (var i = 0; i < usernames.length; i++) {
      Backend.getInstance().getPlayerDetailsByUsername(
        function (result) {
          console.log("[TT] lookup:", typeof result, typeof result === "object" ? result.getPlayerId() : result);
          if (typeof result === "object") {
            if (!Users.isAnyUser(result.getPlayerId())) {
              if (CB.recipientPlayerIds.indexOf(result.getPlayerId()) === -1) {
                CB.recipientPlayerIds.push(result.getPlayerId());
              }
            }
          } else {
            notFound.push(result);
          }
        },
        function () {},
        function () {
          count++;
          if (count === total) {
            console.log("[TT] lookup done: ok=" + (CB.recipientPlayerIds.length > 0) + " recipients=" + CB.recipientPlayerIds.length);
            callback(CB.recipientPlayerIds.length > 0, notFound);
          }
        },
        usernames[i],
        Caches.getPlayerDetailsByUsernameCache()
      );
    }
  }

  // 聊天消息可选中
  var style = document.createElement("style");
  style.textContent = ".chatBody, .chatBody * { user-select: text !important; -webkit-user-select: text !important; }";
  document.head.appendChild(style);

  function hook() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    console.log("[TT] hooked");

    // ---- 发送 ----
    var origSendChat = CB.sendChat;
    CB.sendChat = function () {
      if (!settings.on) return origSendChat.apply(this, arguments);
      if (this.chat.hasClass("send")) return;

      var val = this.chatInput.val();
      if (!val) return origSendChat.apply(this, arguments);

      // 先解析，获取 @用户名 / #全局 等副作用
      var parsed = this._parseChat();

      // ---- @私聊：不论含不含中文，统一走我们的异步查找 ----
      if (this.recipientUsernames.length > 0) {
        var self = this;
        var hasNon = hasNonAscii(parsed);
        // 含中文才编码，纯英文保留原文
        var text = hasNon ? encode(parsed) : parsed;
        if (hasNon && settings.sig) text += SIGNATURE;
        var usernames = this.recipientUsernames.slice();
        console.log("[TT] @mention: \"" + parsed + "\" → looking up " + usernames.join(","));

        resolveRecipients(CB, usernames, function (ok, notFound) {
          if (ok) {
            console.log("[TT] @mention ok, sending USER_CHAT");
            self._sendChat(text);
          } else {
            // 无有效收件人 → 输入框右侧红色气泡（fixed 定位，不挡 UI）
            var lang = settings.lang || "en";
            var msg = MSG_NO_RECIPIENTS[lang] || MSG_NO_RECIPIENTS["en"];
            console.log("[TT] @mention blocked: " + msg);
            $(".tt-err-bubble").remove();
            var off = self.chatInput.offset();
            var h = self.chatInput.outerHeight();
            var w = self.chatInput.outerWidth();
            var arrow = $("<span>").css({
              "position": "absolute", "left": "-6px", "top": "50%",
              "transform": "translateY(-50%)",
              "width": "0", "height": "0",
              "border-top": "5px solid transparent",
              "border-bottom": "5px solid transparent",
              "border-right": "6px solid #e53935"
            });
            var bubble = $("<span class='tt-err-bubble'>").text(msg).css({
              "position": "fixed", "z-index": "9999",
              "left": (off.left + w + 8) + "px",
              "top": (off.top + h / 2) + "px",
              "transform": "translateY(-50%)",
              "color": "#fff", "background": "#e53935",
              "padding": "4px 10px", "border-radius": "4px",
              "font-size": "12px", "font-weight": "bold",
              "white-space": "nowrap",
              "box-shadow": "0 2px 6px rgba(0,0,0,0.3)"
            });
            bubble.append(arrow);
            bubble.hide();
            $("body").append(bubble);
            bubble.fadeIn(150).delay(2000).fadeOut(300, function () { $(this).remove(); });
          }
        });
        return;
      }

      // ---- 纯 ASCII 无 @ → 走原始流程 ----
      if (!hasNonAscii(parsed)) return origSendChat.apply(this, arguments);

      // ---- #全局 / 普通中文消息 ----
      console.log("[TT] send: \"" + parsed + "\"");
      if (!parsed) return origSendChat.apply(this, arguments);

      var encoded = encode(parsed);
      if (settings.sig) encoded += SIGNATURE;
      console.log("[TT] encoded: " + encoded.length + " chars");
      this._sendChat(encoded);
    };

    // ---- 接收（尊重 settings.on 开关） ----
    function mkDec(orig, idx, label) {
      return function () {
        if (!settings.on) return orig.apply(this, arguments); // 扩展关闭时不解码
        var m = arguments[idx];
        if (typeof m === "string" && m.indexOf("\\u") !== -1) {
          var d = decode(m);
          d = stripSig(d);
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
      if (settings.on && typeof m === "string") m = decode(m);
      return origSys.call(this, p, m, u);
    };
    return true;
  }

  var n = 0;
  (function go() { n++; if (hook()) return; if (n < 30) setTimeout(go, 200); else console.warn("[TT] ChatBox not found"); })();
})();
