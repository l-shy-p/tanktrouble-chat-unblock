// TT Chat Unblock — Popup (V2.2)

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
  sigD:  { en:"Append [Chat Unblocker V2.2] prefix", zh:"为消息添加 [Chat Unblocker V2.2] 前缀", ja:"メッセージに [Chat Unblocker V2.2] プレフィックスを付与", ko:"메시지에 [Chat Unblocker V2.2] 접두사 추가", ru:"Добавлять префикс [Chat Unblocker V2.2]", ar:"إضافة بادئة [Chat Unblocker V2.2]", fr:"Ajouter le préfixe [Chat Unblocker V2.2]", es:"Añadir prefijo [Chat Unblocker V2.2]", de:"[Chat Unblocker V2.2]-Präfix anhängen", pt:"Adicionar prefixo [Chat Unblocker V2.2]" },
  fmt:   { en:"Message Format", zh:"消息格式", ja:"メッセージ形式", ko:"메시지 형식", ru:"Формат сообщения", ar:"تنسيق الرسالة", fr:"Format du message", es:"Formato del mensaje", de:"Nachrichtenformat", pt:"Formato da mensagem" },
  fmtD:  { en:"V2.2 recommended; V1.2 may be blocked", zh:"推荐V2.2；V1.2可能被服务器拦截", ja:"V2.2推奨。V1.2はブロックされる可能性あり", ko:"V2.2 권장. V1.2는 서버에서 차단될 수 있음", ru:"Рекомендуется V2.2; V1.2 может быть заблокирован", ar:"يوصى بـ V2.2؛ قد يتم حظر V1.2", fr:"V2.2 recommandé ; V1.2 peut être bloqué", es:"V2.2 recomendado; V1.2 puede ser bloqueado", de:"V2.2 empfohlen; V1.2 kann blockiert werden", pt:"V2.2 recomendado; V1.2 pode ser bloqueado" },
  warn:  {
    en: "V1.2 format uses \\uXXXX escapes. Certain character combinations may be intercepted by the game server. Use V2.2 (~XXXX) for reliable delivery.",
    zh: "V1.2 格式使用 \\uXXXX 转义。某些字符组合可能被游戏服务器拦截。建议使用 V2.2 (~XXXX) 以确保可靠发送。",
    ja: "V1.2形式は\\uXXXXエスケープを使用します。特定の文字の組み合わせがゲームサーバーにブロックされる場合があります。確実な送信にはV2.2（~XXXX）を使用してください。",
    ko: "V1.2 형식은 \\uXXXX 이스케이프를 사용합니다. 특정 문자 조합은 게임 서버에서 차단될 수 있습니다. 안정적인 전송을 위해 V2.2(~XXXX)를 사용하세요.",
    ru: "Формат V1.2 использует экранирование \\uXXXX. Некоторые комбинации символов могут быть заблокированы сервером. Используйте V2.2 (~XXXX) для надёжной отправки.",
    ar: "يستخدم تنسيق V1.2 هروب \\uXXXX. قد يتم اعتراض بعض مجموعات الأحرف بواسطة خادم اللعبة. استخدم V2.2 (~XXXX) للإرسال الموثوق.",
    fr: "Le format V1.2 utilise des séquences \\uXXXX. Certaines combinaisons de caractères peuvent être interceptées par le serveur. Utilisez V2.2 (~XXXX) pour un envoi fiable.",
    es: "El formato V1.2 usa escapes \\uXXXX. Ciertas combinaciones de caracteres pueden ser interceptadas por el servidor. Use V2.2 (~XXXX) para un envío confiable.",
    de: "V1.2 verwendet \\uXXXX-Escapes. Bestimmte Zeichenkombinationen können vom Server blockiert werden. Verwenden Sie V2.2 (~XXXX) für zuverlässiges Senden.",
    pt: "O formato V1.2 usa escapes \\uXXXX. Certas combinações de caracteres podem ser interceptadas pelo servidor. Use V2.2 (~XXXX) para envio confiável."
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
  document.getElementById("lblFmt").textContent = t("fmt", l);
  document.getElementById("dFmt").textContent   = t("fmtD", l);
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

function updateWarning() {
  if (fmtSel.value === "v1") {
    warnBox.style.display = "flex";
  } else {
    warnBox.style.display = "none";
  }
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
  chrome.storage.local.get(["encodeEnabled", "signatureEnabled", "format", "lang"], function (d) {
    var ena = d.encodeEnabled !== undefined ? d.encodeEnabled : true;
    var sig = d.signatureEnabled !== undefined ? d.signatureEnabled : true;
    var fmt = d.format || "v2";
    tglOn.checked = ena;
    tglSig.checked = sig;
    fmtSel.value = fmt;
    setOn(ena);
    lang = d.lang || "en";
    langSel.value = lang;
    localize(lang);
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

tglSig.addEventListener("change", function () {
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

var LOCAL_VER = "2.2";
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
