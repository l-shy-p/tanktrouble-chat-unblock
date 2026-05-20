// TT Chat Unblock — Popup (V2.6)

var BASE = "https://github.com/L-Shy-P/TankTrouble-Chat-Unblock/tree/master";

var ANCHORS = {
  en: "#english",    zh: "#中文",       ja: "#日本語",
  ko: "#한국어",     ru: "#русский",    ar: "#العربية",
  fr: "#français",   es: "#español",    de: "#deutsch",
  pt: "#português"
};

var T = {
  on:    { en:"Enable Encoding", zh:"启用编码", ja:"エンコードを有効化", ko:"인코딩 활성화", ru:"Включить кодирование", ar:"تفعيل الترميز", fr:"Activer l'encodage", es:"Activar codificación", de:"Kodierung aktivieren", pt:"Ativar codificação" },
  onD:   { en:"Toggle encoding for message display", zh:"切换消息文字的编码显示", ja:"メッセージのエンコード表示を切り替え", ko:"메시지 인코딩 표시 전환", ru:"Переключить отображение кодирования", ar:"تبديل عرض الترميز", fr:"Basculer l'affichage de l'encodage", es:"Alternar visualización de codificación", de:"Kodierungsanzeige umschalten", pt:"Alternar exibição de codificação" },
  sig:   { en:"Signature", zh:"扩展签名", ja:"署名", ko:"서명", ru:"Подпись", ar:"توقيع", fr:"Signature", es:"Firma", de:"Signatur", pt:"Assinatura" },
  sigD:  { en:"Append [Chat Unblocker] tag for non-users", zh:"为未安装扩展的玩家显示签名", ja:"未インストールのプレイヤーに署名を表示", ko:"확장을 설치하지 않은 플레이어에게 서명 표시", ru:"Показать подпись для игроков без расширения", ar:"إظهار توقيع للاعبين بدون الملحق", fr:"Afficher la signature pour les joueurs sans extension", es:"Mostrar firma para jugadores sin extensión", de:"Signatur für Spieler ohne Erweiterung anzeigen", pt:"Mostrar assinatura para jogadores sem extensão" },
  ver:   { en:"Version Tag", zh:"版本号", ja:"バージョンタグ", ko:"버전 태그", ru:"Тег версии", ar:"علامة الإصدار", fr:"Tag de version", es:"Etiqueta de versión", de:"Versionstag", pt:"Tag de versão" },
  verD:  { en:"Show \" | v2.6\" in decoded messages", zh:"在解码消息中显示\" | v2.6\"", ja:"デコードされたメッセージに\" | v2.6\"を表示", ko:"디코딩된 메시지에\" | v2.6\" 표시", ru:"Показывать \" | v2.6\" в декодированных сообщениях", ar:"إظهار \" | v2.6\" في الرسائل المفككة", fr:"Afficher \" | v2.6\" dans les messages décodés", es:"Mostrar \" | v2.6\" en mensajes decodificados", de:"\" | v2.6\" in dekodierten Nachrichten anzeigen", pt:"Mostrar \" | v2.6\" em mensagens decodificadas" },
  sigLock:{ en:"Signature is required in V1.2 mode", zh:"V1.2模式下签名必须开启", ja:"V1.2モードでは署名が必要です", ko:"V1.2 모드에서는 서명이 필요합니다", ru:"Подпись обязательна в режиме V1.2", ar:"التوقيع مطلوب في وضع V1.2", fr:"La signature est requise en mode V1.2", es:"La firma es requerida en modo V1.2", de:"Signatur ist im V1.2-Modus erforderlich", pt:"Assinatura é obrigatória no modo V1.2" },
  sigV1Warn:{ en:"Warning: If you turn off the signature, V1.2 users will not be able to see your message content.", zh:"警告：关闭签名后，V1.2用户将无法看到你的消息内容。", ja:"警告：署名をオフにすると、V1.2ユーザーはメッセージ内容を表示できません。", ko:"경고: 서명을 끄면 V1.2 사용자는 메시지 내용을 볼 수 없습니다.", ru:"Внимание: Если вы отключите подпись, пользователи V1.2 не смогут видеть ваши сообщения.", ar:"تحذير: إذا قمت بإيقاف التوقيع، لن يتمكن مستخدمو V1.2 من رؤية محتوى رسالتك.", fr:"Avertissement : Si vous désactivez la signature, les utilisateurs V1.2 ne pourront pas voir votre message.", es:"Advertencia: Si desactivas la firma, los usuarios V1.2 no podrán ver tu mensaje.", de:"Warnung: Wenn du die Signatur ausschaltest, können V1.2-Nutzer deine Nachricht nicht sehen.", pt:"Aviso: Se você desativar a assinatura, os usuários V1.2 não poderão ver sua mensagem." },
  fmt:   { en:"Message Format", zh:"消息格式", ja:"メッセージ形式", ko:"메시지 형식", ru:"Формат сообщения", ar:"تنسيق الرسالة", fr:"Format du message", es:"Formato del mensaje", de:"Nachrichtenformat", pt:"Formato da mensagem" },
  fmtD:  { en:"V2.x recommended; V1.2 may be blocked", zh:"推荐V2.x；V1.2可能被服务器拦截", ja:"V2.x推奨。V1.2はブロックされる可能性あり", ko:"V2.x 권장. V1.2는 서버에서 차단될 수 있음", ru:"Рекомендуется V2.x; V1.2 может быть заблокирован", ar:"يوصى بـ V2.x؛ قد يتم حظر V1.2", fr:"V2.x recommandé ; V1.2 peut être bloqué", es:"V2.x recomendado; V1.2 puede ser bloqueado", de:"V2.x empfohlen; V1.2 kann blockiert werden", pt:"V2.x recomendado; V1.2 pode ser bloqueado" },
  lang:  { en:"Page Language", zh:"页面语言", ja:"ページ言語", ko:"페이지 언어", ru:"Язык страницы", ar:"لغة الصفحة", fr:"Langue de la page", es:"Idioma de la página", de:"Seitensprache", pt:"Idioma da página" },
  easter:{ en:"This is NOT a translator!", zh:"这不是翻译器！", ja:"これは翻訳機ではありません！", ko:"이건 번역기가 아닙니다!", ru:"Это НЕ переводчик!", ar:"هذا ليس مترجمًا!", fr:"Ce n'est PAS un traducteur !", es:"¡Esto NO es un traductor!", de:"Das ist KEIN Übersetzer!", pt:"Isso NÃO é um tradutor!" },
  warn:  {
    en: "V1.2 format uses \\uXXXX escapes. Certain character combinations may be intercepted by the game server. Use V2.x (~XXXX) for reliable delivery.",
    zh: "V1.2 格式使用 \\uXXXX 转义。某些字符组合可能被游戏服务器拦截。建议使用 V2.x (~XXXX) 以确保可靠发送。",
    ja: "V1.2形式は\\uXXXXエスケープを使用します。特定の文字の組み合わせがゲームサーバーにブロックされる場合があります。確実な送信にはV2.x（~XXXX）を使用してください。",
    ko: "V1.2 형식은 \\uXXXX 이스케이프를 사용합니다. 특정 문자 조합은 게임 서버에서 차단될 수 있습니다. 안정적인 전송을 위해 V2.x(~XXXX)를 사용하세요.",
    ru: "Формат V1.2 использует экранирование \\uXXXX. Некоторые комбинации символов могут быть заблокированы сервером. Используйте V2.x (~XXXX) для надёжной отправки.",
    ar: "يستخدم تنسيق V1.2 هروب \\uXXXX. قد يتم اعتراض بعض مجموعات الأحرف بواسطة خادم اللعبة. استخدم V2.x (~XXXX) للإرسال الموثوق.",
    fr: "Le format V1.2 utilise des séquences \\uXXXX. Certaines combinaisons de caractères peuvent être interceptées par le serveur. Utilisez V2.x (~XXXX) pour un envoi fiable.",
    es: "El formato V1.2 usa escapes \\uXXXX. Ciertas combinaciones de caracteres pueden ser interceptadas por el servidor. Use V2.x (~XXXX) para un envío confiable.",
    de: "V1.2 verwendet \\uXXXX-Escapes. Bestimmte Zeichenkombinationen können vom Server blockiert werden. Verwenden Sie V2.x (~XXXX) für zuverlässiges Senden.",
    pt: "O formato V1.2 usa escapes \\uXXXX. Certas combinações de caracteres podem ser interceptadas pelo servidor. Use V2.x (~XXXX) para envio confiável."
  },
  active:{ en:"Active", zh:"运行中", ja:"作動中", ko:"작동 중", ru:"Активно", ar:"نشط", fr:"Actif", es:"Activo", de:"Aktiv", pt:"Ativo" },
  off:   { en:"Disabled", zh:"已禁用", ja:"無効", ko:"비활성화", ru:"Отключено", ar:"معطل", fr:"Désactivé", es:"Desactivado", de:"Deaktiviert", pt:"Desativado" },
  reset: { en:"Reset Chat Input & Copy", zh:"重置输入框并复制内容", ja:"入力欄をリセットしてコピー", ko:"입력창 초기화 및 복사", ru:"Сбросить поле и скопировать", ar:"إعادة تعيين ونسخ", fr:"Réinitialiser et copier", es:"Restablecer y copiar", de:"Zurücksetzen & kopieren", pt:"Resetar e copiar" },
  copy:  { en:"Copy", zh:"复制", ja:"コピー", ko:"복사", ru:"Копировать", ar:"نسخ", fr:"Copier", es:"Copiar", de:"Kopieren", pt:"Copiar" },
  done:  { en:"Copied!", zh:"已复制！", ja:"コピー完了！", ko:"복사됨!", ru:"Скопировано!", ar:"تم النسخ!", fr:"Copié !", es:"¡Copiado!", de:"Kopiert!", pt:"Copiado!" },
  by:    { en:"Made by L_Shy_P", zh:"L_Shy_P 制作", ja:"L_Shy_P 制作", ko:"L_Shy_P 제작", ru:"Создано L_Shy_P", ar:"صنع بواسطة L_Shy_P", fr:"Créé par L_Shy_P", es:"Hecho por L_Shy_P", de:"Von L_Shy_P", pt:"Feito por L_Shy_P" },
  verChk:{ en:"Checking for updates...", zh:"正在检查更新...", ja:"更新を確認中...", ko:"업데이트 확인 중...", ru:"Проверка обновлений...", ar:"جارٍ التحقق من التحديثات...", fr:"Vérification des mises à jour...", es:"Comprobando actualizaciones...", de:"Suche nach Updates...", pt:"Verificando atualizações..." },
  verOK: { en:"Up to date (v{0})", zh:"已是最新 (v{0})", ja:"最新です (v{0})", ko:"최신 버전 (v{0})", ru:"Актуально (v{0})", ar:"محدث (v{0})", fr:"À jour (v{0})", es:"Actualizado (v{0})", de:"Aktuell (v{0})", pt:"Atualizado (v{0})" },
  verMaj:{ en:"v{0} available — major update!", zh:"v{0} 可用 — 大版本更新！", ja:"v{0} 利用可能 — メジャーアップデート！", ko:"v{0} 사용 가능 — 주요 업데이트!", ru:"v{0} доступно — крупное обновление!", ar:"v{0} متاح — تحديث رئيسي!", fr:"v{0} disponible — mise à jour majeure !", es:"v{0} disponible — ¡actualización mayor!", de:"v{0} verfügbar — großes Update!", pt:"v{0} disponível — grande atualização!" },
  verMin:{ en:"v{0} available — minor update", zh:"v{0} 可用 — 小版本更新", ja:"v{0} 利用可能 — マイナーアップデート", ko:"v{0} 사용 가능 — 사소한 업데이트", ru:"v{0} доступно — небольшое обновление", ar:"v{0} متاح — تحديث ثانوي", fr:"v{0} disponible — mise à jour mineure", es:"v{0} disponible — actualización menor", de:"v{0} verfügbar — kleines Update", pt:"v{0} disponível — pequena atualização" },
  verErr:{ en:"Unable to check for updates", zh:"无法检查更新", ja:"更新を確認できません", ko:"업데이트를 확인할 수 없습니다", ru:"Не удалось проверить обновления", ar:"تعذر التحقق من التحديثات", fr:"Impossible de vérifier les mises à jour", es:"No se pudo verificar actualizaciones", de:"Update-Prüfung fehlgeschlagen", pt:"Não foi possível verificar atualizações" },
  stable:{ en:"Stable", zh:"稳定版", ja:"安定版", ko:"안정판", ru:"Стабильная", ar:"مستقر", fr:"Stable", es:"Estable", de:"Stabil", pt:"Estável" },
};

function t(key, lang) { var e = T[key]; return e ? (e[lang] || e["en"]) : key; }

var dot     = document.getElementById("dot");
var sText   = document.getElementById("sText");
var tglOn   = document.getElementById("tglOn");
var tglSig  = document.getElementById("tglSig");
var tglVer  = document.getElementById("tglVer");
var fmtSel  = document.getElementById("fmtSel");
var langSel = document.getElementById("langSel");
var linkInp = document.getElementById("linkInput");
var copyBtn = document.getElementById("copyBtn");
var resetBtn= document.getElementById("resetBtn");
var warnBox = document.getElementById("warnBox");
var warnText= document.getElementById("warnText");

var lang = "en";

function getURL(l) { return BASE + (ANCHORS[l] || ""); }

function localize(l) {
  lang = l;
  document.getElementById("lblOn").textContent  = t("on", l);
  document.getElementById("dOn").textContent    = t("onD", l);
  document.getElementById("lblSig").textContent = t("sig", l);
  document.getElementById("dSig").textContent   = t("sigD", l);
  document.getElementById("lblVer").textContent = t("ver", l);
  document.getElementById("dVer").textContent   = t("verD", l);
  document.getElementById("lblFmt").textContent = t("fmt", l);
  document.getElementById("dFmt").textContent   = t("fmtD", l);
  document.getElementById("lblLang").textContent = t("lang", l);
  warnText.textContent = t("warn", l);
  resetBtn.textContent = t("reset", l);
  copyBtn.textContent  = t("copy", l);
  linkInp.value = getURL(l);
  document.getElementById("footerText").textContent = t("by", l);
  document.getElementById("verLabel").innerHTML = '<span class="ver-dot-inline ' + (verDot ? verDot.className.replace("ver-dot-inline ", "") : "ok") + '" id="verDot"></span> v' + LOCAL_VER + ' — ' + t("stable", l);
  verDot = document.getElementById("verDot");
  sText.textContent = dot.classList.contains("off") ? t("off", l) : t("active", l);
  updateWarning();
}

function setOn(ena) {
  if (ena) { dot.classList.remove("off"); sText.textContent = t("active", lang); }
  else     { dot.classList.add("off");    sText.textContent = t("off", lang); }
}

var sigWarnShown = false;

function updateWarning() {
  var sigWrap = tglSig.closest(".toggle");
  if (fmtSel.value === "v1") {
    warnBox.style.display = "flex";
    requestAnimationFrame(function () {
      warnBox.style.maxHeight = "80px";
      warnBox.style.opacity = "1";
      warnBox.style.padding = "8px 10px";
      warnBox.style.margin = "8px 0";
    });
  } else {
    warnBox.style.maxHeight = "0";
    warnBox.style.opacity = "0";
    warnBox.style.padding = "0 10px";
    warnBox.style.margin = "0";
    setTimeout(function () { if (warnBox.style.display !== "none") warnBox.style.display = "none"; }, 300);
    sigWrap.classList.remove("locked");
    sigWrap.classList.remove("shake");
    sigWrap.classList.remove("off-red");
    hideSigV1Warn();
    sigWarnShown = false;
  }
}

function showSigV1Warn() {
  var old = document.querySelector(".tt-sig-v1-warn");
  if (old) old.remove();
  var el = document.createElement("div");
  el.className = "tt-sig-v1-warn";
  el.style.cssText = "background:#3a0a00;border:1px solid #f44;border-radius:4px;padding:0 10px;margin:0;font-size:11px;color:#f88;line-height:1.4;max-height:0;opacity:0;overflow:hidden;transition:max-height .3s ease, opacity .3s ease, padding .3s ease, margin .3s ease;";
  el.textContent = t("sigV1Warn", lang);
  var setting = tglSig.closest(".setting");
  setting.parentNode.insertBefore(el, setting.nextSibling);
  requestAnimationFrame(function () {
    el.style.maxHeight = "100px";
    el.style.opacity = "1";
    el.style.padding = "8px 10px";
    el.style.margin = "6px 0 0";
  });
}

function hideSigV1Warn() {
  var el = document.querySelector(".tt-sig-v1-warn");
  if (!el) return;
  el.style.maxHeight = "0";
  el.style.opacity = "0";
  el.style.padding = "0 10px";
  el.style.margin = "0";
  setTimeout(function () { if (el.parentNode) el.remove(); }, 300);
}

function save(k, v) {
  var o = {}; o[k] = v;
  chrome.storage.local.set(o, function () {
    if (chrome.runtime.lastError) console.error("[popup] save err:", chrome.runtime.lastError);
    else console.log("[popup] saved " + k + "=" + v);
  });
}

document.getElementById("mainContent").style.display = "none";

try {
  chrome.storage.local.get(["encodeEnabled", "signatureEnabled", "format", "lang", "versionEnabled"], function (d) {
    var ena = d.encodeEnabled !== undefined ? d.encodeEnabled : true;
    var sig = d.signatureEnabled !== undefined ? d.signatureEnabled : true;
    var ver = d.versionEnabled !== undefined ? d.versionEnabled : true;
    var fmt = d.format || "v2";
    if (fmt === "v1") sig = true;
    tglOn.checked = ena;
    tglSig.checked = sig;
    tglVer.checked = ver;
    fmtSel.value = fmt;
    setOn(ena);
    lang = d.lang || "en";
    langSel.value = lang;
    localize(lang);
    var fmtWrap = document.getElementById("fmtWrap");
    var langWrap = document.getElementById("langWrap");
    requestAnimationFrame(function () {
      if (fmtWrap) { fmtWrap.classList.add("show"); }
      if (langWrap) { langWrap.classList.add("show"); }
    });
    checkVersion();
    document.getElementById("mainContent").style.display = "";
  });
} catch (e) {
  checkVersion();
  localize("en");
  document.getElementById("mainContent").style.display = "";
}

tglOn.addEventListener("change", function () {
  save("encodeEnabled", this.checked);
  setOn(this.checked);
});

tglVer.addEventListener("change", function () {
  save("versionEnabled", this.checked);
});

tglSig.addEventListener("change", function () {
  if (fmtSel.value === "v1" && !this.checked && !sigWarnShown) {
    this.checked = true;
    var sigWrap = this.closest(".toggle");
    sigWrap.classList.add("shake");
    setTimeout(function () {
      sigWrap.classList.remove("shake");
    }, 400);
    showSigV1Warn();
    sigWarnShown = true;
    return;
  }
  if (fmtSel.value === "v1" && !this.checked && sigWarnShown) {
    var sigWrap = this.closest(".toggle");
    sigWrap.classList.add("off-red");
    sigWarnShown = false;
  }
  if (fmtSel.value === "v1" && this.checked) {
    var sigWrap = this.closest(".toggle");
    sigWrap.classList.remove("off-red");
    hideSigV1Warn();
    sigWarnShown = false;
  }
  save("signatureEnabled", this.checked);
});

fmtSel.addEventListener("change", function () {
  save("format", this.value);
  updateWarning();
});

langSel.addEventListener("change", function () {
  save("lang", this.value);
  localize(this.value);
  checkVersion();
});

// 页面语言悬浮彩蛋
var langHoverTimer = null;
var easterEl = null;
document.getElementById("lblLang").addEventListener("mouseenter", function () {
  langHoverTimer = setTimeout(function () {
    if (easterEl) return;
    easterEl = document.createElement("div");
    easterEl.style.cssText = "position:fixed;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%);background:#333;color:#ccc;padding:8px 14px;border-radius:6px;font-size:12px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.3);pointer-events:none;";
    easterEl.textContent = t("easter", lang);
    document.body.appendChild(easterEl);
    setTimeout(function () {
      if (easterEl) { easterEl.style.opacity = "0"; easterEl.style.transition = "opacity .3s"; }
      setTimeout(function () { if (easterEl) { document.body.removeChild(easterEl); easterEl = null; } }, 300);
    }, 2000);
  }, 5000);
});
document.getElementById("lblLang").addEventListener("mouseleave", function () {
  if (langHoverTimer) { clearTimeout(langHoverTimer); langHoverTimer = null; }
});

copyBtn.addEventListener("click", function () {
  linkInp.select();
  try {
    navigator.clipboard.writeText(linkInp.value).then(function () {
      copyBtn.textContent = t("done", lang);
      setTimeout(function () { copyBtn.textContent = t("copy", lang); }, 1500);
    });
  } catch (e) {
    document.execCommand("copy");
    copyBtn.textContent = t("done", lang);
    setTimeout(function () { copyBtn.textContent = t("copy", lang); }, 1500);
  }
});

resetBtn.addEventListener("click", function () {
  save("_resetRequest", Date.now());
});

var LOCAL_VER = "2.6";
var MANIFEST_URL = "https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/manifest.json";
var verDot  = document.getElementById("verDot");
var verLabel = document.getElementById("verLabel");

function setVer(cls, msg) {
  verDot.className = "ver-dot-inline " + (cls || "");
  verLabel.innerHTML = '<span class="ver-dot-inline ' + (cls || "") + '" id="verDot"></span> ' + msg;
  verDot = document.getElementById("verDot");
}

function checkVersion() {
  setVer("", "v" + LOCAL_VER + " — " + t("stable", lang));
  try {
    fetch(MANIFEST_URL + "?t=" + Date.now())
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        var remote = data.version || "";
        var localParts = LOCAL_VER.split(".");
        var remoteParts = remote.split(".");
        var localMajor = parseInt(localParts[0]) || 0;
        var localMinor = parseInt(localParts[1]) || 0;
        var remoteMajor = parseInt(remoteParts[0]) || 0;
        var remoteMinor = parseInt(remoteParts[1]) || 0;

        if (remoteMajor > localMajor) {
          setVer("major", t("verMaj", lang).replace("{0}", remote));
        } else if (remoteMajor === localMajor && remoteMinor > localMinor) {
          setVer("minor", t("verMin", lang).replace("{0}", remote));
        } else {
          setVer("ok", t("verOK", lang).replace("{0}", LOCAL_VER));
        }
      })
      .catch(function () {
        setVer("", t("verErr", lang));
      });
  } catch (e) {
    setVer("", t("verErr", lang));
  }
}
