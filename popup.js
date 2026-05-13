// TT Chat Unblock — Popup

var BASE = "https://github.com/L-Shy-P/TankTrouble-Chat-Unblock/tree/master";

// 每种语言的 README 锚点
var ANCHORS = {
  en: "#english",    zh: "#中文",       ja: "#日本語",
  ko: "#한국어",     ru: "#русский",    ar: "#العربية",
  fr: "#français",   es: "#español",    de: "#deutsch",
  pt: "#português"
};

// 每种语言的 UI 文本
var T = {
  on:    { en:"Enable Encoding", zh:"启用编码", ja:"エンコードを有効化", ko:"인코딩 활성화", ru:"Включить кодирование", ar:"تفعيل الترميز", fr:"Activer l'encodage", es:"Activar codificación", de:"Kodierung aktivieren", pt:"Ativar codificação" },
  onD:   { en:"Toggle encoding for message display", zh:"切换消息文字的编码显示", ja:"メッセージのエンコード表示を切り替え", ko:"메시지 인코딩 표시 전환", ru:"Переключить отображение кодирования", ar:"تبديل عرض الترميز", fr:"Basculer l'affichage de l'encodage", es:"Alternar visualización de codificación", de:"Kodierungsanzeige umschalten", pt:"Alternar exibição de codificação" },
  sig:   { en:"Signature", zh:"扩展签名", ja:"署名", ko:"서명", ru:"Подпись", ar:"توقيع", fr:"Signature", es:"Firma", de:"Signatur", pt:"Assinatura" },
  sigD:  { en:"Append [Chat Unblocker] tag for non-users", zh:"为非扩展用户附加 [Chat Unblocker] 标记", ja:"未導入者に [Chat Unblocker] を表示", ko:"미설치 사용자에게 [Chat Unblocker] 태그 표시", ru:"Добавлять [Chat Unblocker] для не-пользователей", ar:"إضافة علامة [Chat Unblocker] للمستخدمين الآخرين", fr:"Ajouter [Chat Unblocker] pour les non-utilisateurs", es:"Añadir [Chat Unblocker] para no usuarios", de:"[Chat Unblocker] für Nicht-Nutzer anhängen", pt:"Adicionar [Chat Unblocker] para não usuários" },
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

// ---- DOM ----
var dot     = document.getElementById("dot");
var sText   = document.getElementById("sText");
var tglOn   = document.getElementById("tglOn");
var tglSig  = document.getElementById("tglSig");
var langSel = document.getElementById("langSel");
var linkInp = document.getElementById("linkInput");
var copyBtn = document.getElementById("copyBtn");
var resetBtn= document.getElementById("resetBtn");

// ---- 当前语言 ----
var lang = "en";

function getURL(l) { return BASE + (ANCHORS[l] || ""); }

function localize(l) {
  lang = l;
  document.getElementById("lblOn").textContent  = t("on", l);
  document.getElementById("dOn").textContent    = t("onD", l);
  document.getElementById("lblSig").textContent = t("sig", l);
  document.getElementById("dSig").textContent   = t("sigD", l);
  resetBtn.textContent = t("reset", l);
  copyBtn.textContent  = t("copy", l);
  linkInp.value = getURL(l);
  document.getElementById("footerText").textContent = t("by", l);
  document.getElementById("verLabel").innerHTML = '<span class="ver-dot-inline ' + (verDot ? verDot.className.replace("ver-dot-inline ", "") : "ok") + '" id="verDot"></span> v' + LOCAL_VER + ' — ' + t("stable", l);
  verDot = document.getElementById("verDot");
  sText.textContent = dot.classList.contains("off") ? t("off", l) : t("active", l);
}

function setOn(ena) {
  if (ena) { dot.classList.remove("off"); sText.textContent = t("active", lang); }
  else     { dot.classList.add("off");    sText.textContent = t("off", lang); }
}

function save(k, v) {
  var o = {}; o[k] = v;
  chrome.storage.local.set(o, function () {
    if (chrome.runtime.lastError) console.error("[popup] save err:", chrome.runtime.lastError);
    else console.log("[popup] saved " + k + "=" + v);
  });
}

// ---- 隐藏内容直到设置加载完成 ----
document.getElementById("mainContent").style.display = "none";

// ---- 加载设置 ----
try {
  chrome.storage.local.get(["encodeEnabled", "signatureEnabled", "lang"], function (d) {
    var ena = d.encodeEnabled !== undefined ? d.encodeEnabled : true;
    var sig = d.signatureEnabled !== undefined ? d.signatureEnabled : true;
    tglOn.checked = ena;
    tglSig.checked = sig;
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

// ---- 开关事件 ----
tglOn.addEventListener("change", function () {
  save("encodeEnabled", this.checked);
  setOn(this.checked);
});

tglSig.addEventListener("change", function () {
  save("signatureEnabled", this.checked);
});

langSel.addEventListener("change", function () {
  save("lang", this.value);
  localize(this.value);
  checkVersion();
});

// ---- 复制链接 ----
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

// ---- 重置按钮 ----
resetBtn.addEventListener("click", function () {
  save("_resetRequest", Date.now());
});

// ---- 版本检测 ----
var LOCAL_VER = "2.1";
var MANIFEST_URL = "https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/manifest.json";
var verDot  = document.getElementById("verDot");

var verLabel = document.getElementById("verLabel");

function setVer(cls, msg) {
  verDot.className = "ver-dot-inline " + (cls || "");
  verLabel.innerHTML = '<span class="ver-dot-inline ' + (cls || "") + '" id="verDot"></span> ' + msg;
  // re-grab verDot since innerHTML replaced it
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


