// TT Chat Unblock — MAIN world
(function () {
  "use strict";

  var SIGNATURE = " [Chat Unblocker]";
  var settings = { sig: true, enc: true, lang: "en" };

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
    if (d.type === "init")  { settings.sig = d.sig; settings.enc = d.enc; settings.lang = d.lang; console.log("[TT] init sig="+settings.sig+" enc="+settings.enc+" lang="+settings.lang); }
    if (d.type === "sig")   { settings.sig = d.value; console.log("[TT] sig→" + settings.sig); }
    if (d.type === "enc")   { settings.enc = d.value; console.log("[TT] enc→" + settings.enc); toggleMessages(); }
    if (d.type === "lang")  { settings.lang = d.value; console.log("[TT] lang→" + settings.lang); }
    if (d.type === "reset") { doReset(); }
  });

  // ---- 切换消息显示（编码开关 → 交换 CB.messages 后重绘） ----
  function toggleMessages() {
    try {
      var CB = window.TankTrouble && window.TankTrouble.ChatBox;
      if (!CB || !CB.messages) return;
      for (var i = 0; i < CB.messages.length; i++) {
        var msg = CB.messages[i];
        if (msg._raw) {
          var tmp = msg.message;
          msg.message = msg._raw;
          msg._raw = tmp;
        }
      }
      CB._refreshChat(true);
      console.log("[TT] messages toggled, enc=" + settings.enc);
    } catch (e) { console.warn("[TT] toggle err:", e); }
  }

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

  // ---- 编码/解码（~ 前缀避开敏感词过滤） ----
  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) { if (s.charCodeAt(i) > 127) return true; }
    return false;
  }
  function encode(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) r += "~" + ("000" + c.toString(16)).slice(-4);
      else if (s.charAt(i) === "\\") r += "\\\\";
      else r += s.charAt(i);
    }
    return r;
  }
  function decode(s) {
    if (!s) return s;
    return s.replace(/~([0-9a-fA-F]{4})/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });
  }
  function stripSig(s) {
    if (!s) return s;
    var p = s.lastIndexOf(SIGNATURE);
    return p >= 0 ? s.substring(0, p) : s;
  }

  // ---- @私聊异步查找 ----
  function resolveRecipients(CB, usernames, callback) {
    var count = 0, total = usernames.length;
    var notFound = [];
    for (var i = 0; i < usernames.length; i++) {
      Backend.getInstance().getPlayerDetailsByUsername(
        function (result) {
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
          if (count === total) callback(CB.recipientPlayerIds.length > 0, notFound);
        },
        usernames[i],
        Caches.getPlayerDetailsByUsernameCache()
      );
    }
  }

  // 聊天文本可选中
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
      if (this.chat.hasClass("send")) return;
      var val = this.chatInput.val();
      if (!val) return origSendChat.apply(this, arguments);
      var parsed = this._parseChat();

      // @私聊保护（始终生效，不受编码开关影响）
      if (this.recipientUsernames.length > 0) {
        var self = this;
        var hasNon = hasNonAscii(parsed);
        var text = (hasNon && settings.enc) ? encode(parsed) : parsed;
        if (hasNon && settings.enc && settings.sig) text += SIGNATURE;
        var usernames = this.recipientUsernames.slice();

        resolveRecipients(CB, usernames, function (ok) {
          if (ok) {
            self._sendChat(text);
          } else {
            var lang = settings.lang || "en";
            var msg = MSG_NO_RECIPIENTS[lang] || MSG_NO_RECIPIENTS["en"];
            $(".tt-err-bubble").remove();
            var off = self.chatInput.offset();
            var h = self.chatInput.outerHeight();
            var w = self.chatInput.outerWidth();
            var arrow = $("<span>").css({
              position:"absolute",left:"-6px",top:"50%",transform:"translateY(-50%)",
              width:"0",height:"0",borderTop:"5px solid transparent",
              borderBottom:"5px solid transparent",borderRight:"6px solid #e53935"
            });
            var bubble = $("<span class='tt-err-bubble'>").text(msg).css({
              position:"fixed",zIndex:"9999",left:(off.left+w+8)+"px",top:(off.top+h/2)+"px",
              transform:"translateY(-50%)",color:"#fff",background:"#e53935",
              padding:"4px 10px",borderRadius:"4px",fontSize:"12px",fontWeight:"bold",
              whiteSpace:"nowrap",boxShadow:"0 2px 6px rgba(0,0,0,.3)"
            });
            bubble.append(arrow).hide(); $("body").append(bubble);
            bubble.fadeIn(150).delay(2000).fadeOut(300,function(){$(this).remove();});
          }
        });
        return;
      }

      // 无 @：纯 ASCII 走原始流程；中文且编码开启则编码发送
      if (!hasNonAscii(parsed)) return origSendChat.apply(this, arguments);
      if (!parsed) return origSendChat.apply(this, arguments);

      var textToSend;
      if (settings.enc) {
        textToSend = encode(parsed);
        if (settings.sig) textToSend += SIGNATURE;
      } else {
        textToSend = parsed;
      }
      this._sendChat(textToSend);
    };

    // ---- 接收 ----
    function mkDec(orig, idx, label) {
      return function () {
        var m = arguments[idx];
        var raw = m;
        if (settings.enc && typeof m === "string" && m.indexOf("~") !== -1) {
          var d = decode(m);
          d = stripSig(d);
          console.log("[TT] recv[" + label + "]: \"" + d + "\"");
          arguments[idx] = d;
        }
        var result = orig.apply(this, arguments);
        // 将原始编码文本存入消息对象，供开关切换时使用
        if (typeof raw === "string" && raw.indexOf("~") !== -1) {
          try {
            var msgs = CB.messages;
            if (msgs.length > 0) msgs[msgs.length - 1]._raw = raw;
          } catch (e) {}
        }
        return result;
      };
    }
    CB.addChatMessage       = mkDec(CB.addChatMessage,       1, "pub");
    CB.addGlobalChatMessage = mkDec(CB.addGlobalChatMessage, 1, "glo");
    CB.addUserChatMessage   = mkDec(CB.addUserChatMessage,   2, "prv");

    var origSys = CB.addSystemMessage;
    CB.addSystemMessage = function (p, m, u) {
      var raw = m;
      if (settings.enc && typeof m === "string") m = decode(m);
      var result = origSys.call(this, p, m, u);
      if (typeof raw === "string" && raw.indexOf("~") !== -1) {
        try {
          var msgs = CB.messages;
          if (msgs.length > 0) msgs[msgs.length - 1]._raw = raw;
        } catch (e) {}
      }
      return result;
    };
    return true;
  }

  var n = 0;
  (function go() { n++; if (hook()) return; if (n < 30) setTimeout(go, 200); else console.warn("[TT] ChatBox not found"); })();
})();
