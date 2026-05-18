// TT Chat Unblock — MAIN world (V2.5)
(function () {
  "use strict";

  var VERSION = "2.5";
  var V2_VER = " | v" + VERSION;
  var V2_SIG = V2_VER + " [Chat Unblocker]";
  var V1_SIG = " [Chat Unblocker]";

  var settings = { sig: true, enc: true, fmt: "v2", lang: "en", ver: true };
  var _lastToggle = 0;
  var _lastSentText = "";
  var _isSending = false;
  var _sendQueue = [];

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

  var V1_LABEL = {
    en: "[V1.2 Format] ",
    zh: "[V1.2格式] ",
    ja: "[V1.2形式] ",
    ko: "[V1.2형식] ",
    ru: "[V1.2 Формат] ",
    ar: "[V1.2 تنسيق] ",
    fr: "[V1.2 Format] ",
    es: "[V1.2 Formato] ",
    de: "[V1.2 Format] ",
    pt: "[V1.2 Formato] "
  };

  var MIXED_LABEL = {
    en: "[Mixed Format] ",
    zh: "[混合编码格式] ",
    ja: "[混合形式] ",
    ko: "[혼합 형식] ",
    ru: "[Смешанный Формат] ",
    ar: "[تنسيق مختلط] ",
    fr: "[Format Mixte] ",
    es: "[Formato Mixto] ",
    de: "[Gemischtes Format] ",
    pt: "[Formato Misto] "
  };

  var SENDING_TEXT = {
    en: "Sending...",
    zh: "正在发送...",
    ja: "送信中...",
    ko: "전송 중...",
    ru: "Отправка...",
    ar: "جار الإرسال...",
    fr: "Envoi en cours...",
    es: "Enviando...",
    de: "Wird gesendet...",
    pt: "Enviando..."
  };

  // ---- bridge 通信 ----
  window.addEventListener("message", function (e) {
    if (!e.data || e.data.source !== "tt-bridge") return;
    var d = e.data.data;
    if (d.type === "init")  { settings.sig = d.sig; settings.enc = d.enc; settings.fmt = d.fmt || "v2"; settings.lang = d.lang; settings.ver = d.ver !== false; console.log("[TT] init sig=" + settings.sig + " enc=" + settings.enc + " fmt=" + settings.fmt + " lang=" + settings.lang + " ver=" + settings.ver); }
    if (d.type === "sig")   { settings.sig = d.value; console.log("[TT] sig→" + settings.sig); }
    if (d.type === "enc")   { settings.enc = d.value; console.log("[TT] enc→" + settings.enc); toggleMessages(); }
    if (d.type === "fmt")   { settings.fmt = d.value; console.log("[TT] fmt→" + settings.fmt); }
    if (d.type === "lang")  { settings.lang = d.value; console.log("[TT] lang→" + settings.lang); }
    if (d.type === "ver")   { settings.ver = d.value; console.log("[TT] ver→" + settings.ver); toggleMessages(); }
    if (d.type === "reset") { doReset(); }
  });

  // ---- 切换消息显示（编码开关 → 从 _raw 实时解析后重绘） ----
  function toggleMessages() {
    var now = Date.now();
    if (now - _lastToggle < 400) return;
    _lastToggle = now;
    try {
      var CB = window.TankTrouble && window.TankTrouble.ChatBox;
      if (!CB || !CB.messages) return;
      for (var i = 0; i < CB.messages.length; i++) {
        var msg = CB.messages[i];
        if (msg._raw) {
          if (settings.enc) {
            // 开启编码：解析 _raw 显示解码内容
            var decoded = null, isOld = false, isMixed = false;
            if (isV2(msg._raw) && isV1(msg._raw)) {
              // 混合编码：先解V2再解V1
              decoded = stripSig(decodeV1(decodeV2(msg._raw)));
              isMixed = true;
            } else if (isV2(msg._raw)) {
              decoded = stripSig(decodeV2(msg._raw));
            } else if (isV1(msg._raw)) {
              decoded = stripSig(decodeV1(msg._raw));
              isOld = true;
            }
            if (decoded) {
              var lang = settings.lang || "en";
              var label = "";
              if (isMixed) {
                label = (MIXED_LABEL[lang] || MIXED_LABEL["en"]) + " ";
              } else if (isOld) {
                label = (V1_LABEL[lang] || V1_LABEL["en"]) + " ";
              }
              msg.message = label + decoded;
            }
          } else {
            // 关闭编码：显示原始内容
            msg.message = msg._raw;
          }
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

  // ---- 编码/解码 ----
  function hasNonAscii(s) {
    if (!s) return false;
    for (var i = 0; i < s.length; i++) { if (s.charCodeAt(i) > 127) return true; }
    return false;
  }

  // V2.2 格式：~XXXX
  function encodeV2(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) r += "~" + ("000" + c.toString(16)).slice(-4);
      else if (s.charAt(i) === "\\") r += "\\\\";
      else r += s.charAt(i);
    }
    return r;
  }
  function decodeV2(s) {
    if (!s) return s;
    return s.replace(/~([0-9a-fA-F]{4})/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });
  }

  // V1.2 格式：\uXXXX（字面反斜杠+u+4位十六进制）
  function encodeV1(s) {
    var r = "";
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c > 127) r += "\\u" + ("000" + c.toString(16)).slice(-4);
      else if (s.charAt(i) === "\\") r += "\\\\";
      else r += s.charAt(i);
    }
    return r;
  }
  function decodeV1(s) {
    if (!s) return s;
    return s.replace(/\\u([0-9a-fA-F]{4})/g, function (_, h) { return String.fromCharCode(parseInt(h, 16)); });
  }

  function isV2(s) { return s && /~[0-9a-fA-F]{4}/.test(s); }
  function isV1(s) { return s && /\\u[0-9a-fA-F]{4}/.test(s); }

  function stripSig(s) {
    if (!s) return s;
    // V2.5+ 完整格式： | v2.5 [Chat Unblocker]
    var p2 = s.lastIndexOf(V2_SIG);
    if (p2 >= 0) {
      var base = s.substring(0, p2);
      return settings.ver ? base + V2_VER : base;
    }
    // V2.5+ 仅版本号： | v2.5
    var pv = s.lastIndexOf(V2_VER);
    if (pv >= 0) {
      var base = s.substring(0, pv);
      return settings.ver ? base + V2_VER : base;
    }
    // V1.2/V2.2 格式： [Chat Unblocker]
    var p1 = s.lastIndexOf(V1_SIG);
    if (p1 >= 0) return s.substring(0, p1);
    // 旧前缀格式：[Chat Unblocker V2.x] 
    if (s.indexOf("[Chat Unblocker V") === 0) {
      var end = s.indexOf("] ");
      if (end > 0) return s.substring(end + 2);
    }
    return s;
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

  // 聊天文本可选中 + 换行 + 选中样式修复
  var style = document.createElement("style");
  style.textContent = [
    ".chatBody, .chatBody * { user-select: text !important; -webkit-user-select: text !important; }",
    ".chatBody { overflow-x: hidden !important; word-wrap: break-word !important; overflow-wrap: break-word !important; }",
    ".chatBody > div, .chatBody > p, .chatBody > td, .chatBody div > div, .chatBody td > div, .chatBody td > p { word-wrap: break-word !important; overflow-wrap: break-word !important; word-break: break-word !important; white-space: normal !important; max-width: 100% !important; }",
    ".chatBody *::selection { background: #4f8 !important; color: #000 !important; text-shadow: none !important; -webkit-text-stroke: 0 !important; -webkit-text-fill-color: #000 !important; }",
    ".chatBody *::-moz-selection { background: #4f8 !important; color: #000 !important; text-shadow: none !important; }"
  ].join("\n");
  document.head.appendChild(style);

  function hook() {
    var TT = window.TankTrouble;
    if (!TT || !TT.ChatBox) return false;
    var CB = TT.ChatBox;
    console.log("[TT] hooked V" + VERSION);

    // ---- 发送 ----
    var origSendChat = CB.sendChat;

    function showSendingIndicator() {
      var lang = settings.lang || "en";
      var text = SENDING_TEXT[lang] || SENDING_TEXT["en"];
      $(".tt-sending-indicator").remove();
      var indicator = $("<span class='tt-sending-indicator'>").text(text).css({
        position:"fixed",zIndex:"9999",right:"10px",bottom:"10px",
        color:"#fff",background:"rgba(0,0,0,0.7)",
        padding:"6px 12px",borderRadius:"4px",fontSize:"12px",
        display:"flex",alignItems:"center",gap:"6px"
      });
      var spinner = $("<span>").css({
        display:"inline-block",width:"12px",height:"12px",
        border:"2px solid #fff",borderTopColor:"transparent",
        borderRadius:"50%",animation:"tt-spin 1s linear infinite"
      });
      indicator.prepend(spinner);
      $("body").append(indicator);
    }

    function hideSendingIndicator() {
      $(".tt-sending-indicator").fadeOut(200, function(){ $(this).remove(); });
    }

    // 添加旋转动画
    var spinStyle = document.createElement("style");
    spinStyle.textContent = "@keyframes tt-spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(spinStyle);

    CB.sendChat = function () {
      if (this.chat.hasClass("send")) return;
      var val = this.chatInput.val();
      if (!val) return origSendChat.apply(this, arguments);
      var parsed = this._parseChat();

      // @私聊保护（始终生效，不受编码开关影响）
      if (this.recipientUsernames.length > 0) {
        var self = this;
        var hasNon = hasNonAscii(parsed);
        var text;
        if (hasNon && settings.enc) {
          text = settings.fmt === "v1" ? encodeV1(parsed) : encodeV2(parsed);
        } else {
          text = parsed;
        }
        if (hasNon && settings.enc) {
          text += V2_VER;
          if (settings.sig) text += " [Chat Unblocker]";
        }
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
        textToSend = settings.fmt === "v1" ? encodeV1(parsed) : encodeV2(parsed);
        textToSend += V2_VER;
        if (settings.sig) textToSend += " [Chat Unblocker]";
      } else {
        textToSend = parsed;
      }

      // 消息去重：如果内容和上一条相同且正在发送，加入队列等待
      if (textToSend === _lastSentText && _isSending) {
        _sendQueue.push(textToSend);
        return;
      }

      _lastSentText = textToSend;
      _isSending = true;
      showSendingIndicator();

      // 包装 _sendChat 以检测发送完成
      var self = this;
      var origSend = this._sendChat;
      this._sendChat = function(text) {
        origSend.call(self, text);
        // 发送完成后检查队列
        setTimeout(function() {
          _isSending = false;
          hideSendingIndicator();
          if (_sendQueue.length > 0) {
            var nextText = _sendQueue.shift();
            _lastSentText = nextText;
            _isSending = true;
            showSendingIndicator();
            self._sendChat(nextText);
          }
        }, 500);
      };

      this._sendChat(textToSend);
    };

    // ---- 接收 ----
    function storeRaw(raw) {
      try {
        var msgs = CB.messages;
        if (!msgs || msgs.length === 0) return;
        var lastMsg = msgs[msgs.length - 1];
        if (!lastMsg._raw) {
          lastMsg._raw = raw;
        }
      } catch (e) {}
    }

    function decodeMessage(m) {
      if (typeof m !== "string") return { decoded: null, isOld: false, isMixed: false };
      var hasV2 = isV2(m);
      var hasV1 = isV1(m);
      var decoded = null;
      var isOld = false;
      var isMixed = false;

      if (hasV2 && hasV1) {
        // 混合编码：先解V2再解V1
        decoded = stripSig(decodeV1(decodeV2(m)));
        isMixed = true;
      } else if (hasV2) {
        decoded = stripSig(decodeV2(m));
      } else if (hasV1) {
        decoded = stripSig(decodeV1(m));
        isOld = true;
      }

      return { decoded: decoded, isOld: isOld, isMixed: isMixed };
    }

    function mkDec(orig, idx, label) {
      return function () {
        var m = arguments[idx];
        var raw = m;
        var result = decodeMessage(m);
        var decoded = result.decoded;
        var isOldFormat = result.isOld;
        var isMixed = result.isMixed;

        if (settings.enc && decoded) {
          var lang = settings.lang || "en";
          var label = "";
          if (isMixed) {
            label = (MIXED_LABEL[lang] || MIXED_LABEL["en"]) + " ";
          } else if (isOldFormat) {
            label = (V1_LABEL[lang] || V1_LABEL["en"]) + " ";
          }
          arguments[idx] = label + decoded;
        }
        var prevLen = CB.messages.length;
        var result = orig.apply(this, arguments);
        if (decoded) {
          if (prevLen < CB.messages.length) {
            storeRaw(raw);
          }
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
      var result = decodeMessage(m);
      var decoded = result.decoded;
      var isOldFormat = result.isOld;
      var isMixed = result.isMixed;

      if (settings.enc && decoded) {
        var lang = settings.lang || "en";
        var label = "";
        if (isMixed) {
          label = (MIXED_LABEL[lang] || MIXED_LABEL["en"]) + " ";
        } else if (isOldFormat) {
          label = (V1_LABEL[lang] || V1_LABEL["en"]) + " ";
        }
        m = label + decoded;
      }
      var prevLen = CB.messages.length;
      var result = origSys.call(this, p, m, u);
      if (decoded) {
        if (prevLen < CB.messages.length) {
          storeRaw(raw);
        }
      }
      return result;
    };
    // ---- 消息悬浮复制按钮 ----
    var _copyBtnTimer = null;
    var _copyBtnEl = null;

    function initCopyBtn() {
      document.addEventListener("mouseover", function (e) {
        var el = e.target;
        if (!el || el.nodeType !== 1) return;
        var chatBody = el.closest(".chatBody");
        if (!chatBody) return;
        var txt = (el.textContent || "").trim();
        if (!txt || txt.length < 2 || txt.length > 3000) return;
        if (el === _copyBtnEl) return;
        removeCopyBtn();
        if (el.classList.contains("tt-copy-btn")) return;
        if (el.querySelector(".tt-copy-btn")) return;

        var btn = document.createElement("span");
        btn.className = "tt-copy-btn";
        btn.textContent = "\uD83D\uDCCB";
        btn.style.cssText = "position:absolute;right:4px;top:2px;cursor:pointer;opacity:0;background:rgba(0,0,0,0.7);color:#ccc;padding:1px 5px;border-radius:3px;font-size:11px;z-index:10;line-height:1.4;pointer-events:auto;";
        var cs = getComputedStyle(el);
        if (cs.position === "static") el.style.position = "relative";

        btn.addEventListener("click", function (ev) {
          ev.stopPropagation();
          ev.preventDefault();
          var t = (el.cloneNode(true).textContent || "").replace(/\uD83D\uDCCB|\u2713/g, "").trim();
          try {
            navigator.clipboard.writeText(t).then(function () {
              btn.textContent = "\u2713";
              btn.style.background = "#4f8";
              btn.style.color = "#000";
              setTimeout(function () { btn.textContent = "\uD83D\uDCCB"; btn.style.background = "rgba(0,0,0,0.7)"; btn.style.color = "#ccc"; }, 1000);
            }).catch(function () { fallbackCopy(t, btn); });
          } catch (ex) { fallbackCopy(t, btn); }
        });

        el.appendChild(btn);
        _copyBtnEl = el;
        requestAnimationFrame(function () { btn.style.opacity = "0.8"; });
      });

      document.addEventListener("mouseout", function (e) {
        var el = e.target;
        if (!el || el.nodeType !== 1) return;
        if (el === _copyBtnEl) {
          var related = e.relatedTarget;
          if (related && (related === _copyBtnEl || _copyBtnEl.contains(related))) return;
          removeCopyBtn();
        }
      });
    }

    function removeCopyBtn() {
      if (_copyBtnEl) {
        var btn = _copyBtnEl.querySelector(".tt-copy-btn");
        if (btn) {
          btn.style.opacity = "0";
          setTimeout(function () { if (btn.parentNode) btn.parentNode.removeChild(btn); }, 200);
        }
        _copyBtnEl = null;
      }
    }

    function fallbackCopy(txt, btn) {
      var ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.cssText = "position:fixed;opacity:0;pointer-events:none;";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      btn.textContent = "\u2713";
      btn.style.background = "#4f8";
      btn.style.color = "#000";
      setTimeout(function () { btn.textContent = "\uD83D\uDCCB"; btn.style.background = "rgba(0,0,0,0.7)"; btn.style.color = "#ccc"; }, 1000);
    }

    initCopyBtn();

    return true;
  }

  var n = 0;
  (function go() { n++; if (hook()) return; if (n < 30) setTimeout(go, 200); else console.warn("[TT] ChatBox not found"); })();
})();
