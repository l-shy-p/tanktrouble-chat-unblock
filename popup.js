// ============================================================
// TankTrouble Chat Unblock — Popup Panel / 弹出面板
// ============================================================

// ---- i18n dictionary / 多语言字典 ----
var L = {
  // Labels / 标签
  langEnable:     { en: "Enable Extension",    zh: "启用扩展",      ja: "拡張機能を有効化",  ko: "확장 활성화",       ru: "Включить",       ar: "تفعيل الإضافة",   fr: "Activer",           es: "Activar",            de: "Aktivieren",         pt: "Ativar" },
  langEnableDesc: { en: "Turn on/off encoding", zh: "开关消息编码",   ja: "エンコードを切替",  ko: "인코딩 전환",       ru: "Вкл/выкл кодирование", ar: "تشغيل/إيقاف الترميز", fr: "Activer/désactiver", es: "Activar/desactivar", de: "Ein/Aus",            pt: "Ligar/desligar" },
  langSignature:  { en: "Signature",           zh: "扩展签名",       ja: "署名",              ko: "서명",              ru: "Подпись",         ar: "توقيع",           fr: "Signature",         es: "Firma",              de: "Signatur",           pt: "Assinatura" },
  langSignatureDesc:{en:"Append link for non-users",zh:"为非扩展用户附加下载链接",ja:"未導入者にリンクを表示",ko:"미설치 사용자에게 링크 표시",ru:"Ссылка для не-пользователей",ar:"إضافة رابط للمستخدمين الآخرين",fr:"Ajouter lien pour non-utilisateurs",es:"Añadir enlace para no usuarios",de:"Link für Nicht-Nutzer",pt:"Link para não usuários"},
  langRecover:    { en: "Auto-Recovery",       zh: "超时自动恢复",    ja: "自動復帰",          ko: "자동 복구",         ru: "Авто-восст.",     ar: "استرداد تلقائي",  fr: "Auto-récupération", es: "Auto-recuperación",  de: "Auto-Wiederh.",      pt: "Auto-recuperação" },
  langRecoverDesc:{ en: "Reset UI on timeout",  zh: "发送超时时自动重置界面",ja:"送信失敗時にUIを自動復帰",ko:"전송 시간초과 시 UI 복구",ru:"Сброс UI при тайм-ауте",ar:"إعادة تعيين الواجهة عند انتهاء المهلة",fr:"Réinitialiser UI après timeout",es:"Restablecer UI tras timeout",de:"UI bei Timeout zurücksetzen",pt:"Resetar UI no timeout"},
  langVer:        { en: "v1.1 — Multi-language chat unlocker", zh:"v1.1 — 多语言聊天解锁器", ja:"v1.1 — 多言語チャット解除", ko:"v1.1 — 다국어 채팅 언락", ru:"v1.1 — Мультиязычный разблокировщик чата", ar:"v1.1 — أداة فتح الدردشة متعددة اللغات", fr:"v1.1 — Débloqueur de chat multilingue", es:"v1.1 — Desbloqueador de chat multilingüe", de:"v1.1 — Mehrsprachiger Chat-Entsperrer", pt:"v1.1 — Desbloqueador de chat multilíngue" },
  langStatusActive:{en:"Active",                 zh:"运行中",         ja:"作動中",            ko:"작동 중",           ru:"Активно",          ar:"نشط",             fr:"Actif",              es:"Activo",              de:"Aktiv",               pt:"Ativo" },
  langStatusOff:   { en:"Disabled",              zh:"已禁用",         ja:"無効",              ko:"비활성화",          ru:"Отключено",        ar:"معطل",            fr:"Désactivé",          es:"Desactivado",         de:"Deaktiviert",         pt:"Desativado" },
  langSelectLabel: { en:"Language / 语言",        zh:"Language / 语言", ja:"Language / 言語",    ko:"Language / 언어",    ru:"Language / Язык",  ar:"Language / اللغة", fr:"Language / Langue",  es:"Language / Idioma",   de:"Language / Sprache",  pt:"Language / Idioma" },
};

// Get localized string / 获取本地化字符串
function t(key, lang) {
  var entry = L[key];
  if (!entry) return key;
  return entry[lang] || entry["en"] || key;
}

// Apply localization to all UI elements / 应用本地化
function localize(lang) {
  document.querySelectorAll("[id^=lang]").forEach(function (el) {
    var key = el.id;
    var text = t(key, lang);
    if (text && text !== key) el.textContent = text;
  });
  // update status dot aria / 更新状态指示器
  var dot = document.getElementById("statusDot");
  var statusText = document.getElementById("langStatus");
  if (dot.classList.contains("off")) {
    statusText.textContent = t("langStatusOff", lang);
  } else {
    statusText.textContent = t("langStatusActive", lang);
  }
  updateCopyBtn(lang);
}

// ---- DOM refs / DOM 引用 ----
var toggleEnabled   = document.getElementById("toggleEnabled");
var toggleSignature = document.getElementById("toggleSignature");
var toggleRecover   = document.getElementById("toggleRecover");
var langSelector    = document.getElementById("langSelector");
var statusDot       = document.getElementById("statusDot");
var langStatus      = document.getElementById("langStatus");
var statsRow        = document.getElementById("statsRow");

// ---- Load settings & apply / 加载并应用设置 ----
try {
  chrome.storage.local.get(
    ["enabled", "signatureEnabled", "autoRecover", "lang"],
    function (data) {
      // Apply toggle states / 应用开关状态
      var ena = data.enabled !== undefined ? data.enabled : true;
      var sig = data.signatureEnabled !== undefined ? data.signatureEnabled : true;
      var rec = data.autoRecover !== undefined ? data.autoRecover : true;

      toggleEnabled.checked = ena;
      toggleSignature.checked = sig;
      toggleRecover.checked = rec;

      // Update status dot / 更新状态点
      updateStatus(ena);

      // Apply language / 应用语言
      var lang = data.lang || "en";
      langSelector.value = lang;
      localize(lang);

      // Show stats if available / 显示统计
      loadStats();
    }
  );
} catch (e) {
  // Fallback for direct open / 直接打开时的回退
  toggleEnabled.checked = true;
  toggleSignature.checked = true;
  toggleRecover.checked = true;
  updateStatus(true);
  localize("en");
}

function updateStatus(ena) {
  if (ena) {
    statusDot.classList.remove("off");
  } else {
    statusDot.classList.add("off");
  }
  localize(langSelector.value);
}

// ---- Save on toggle / 切换时保存 ----
function saveSetting(key, value) {
  try {
    var obj = {};
    obj[key] = value;
    chrome.storage.local.set(obj, function () {
      // saved / 已保存
    });
  } catch (e) {}
}

toggleEnabled.addEventListener("change", function () {
  var ena = this.checked;
  saveSetting("enabled", ena);
  updateStatus(ena);
});

toggleSignature.addEventListener("change", function () {
  saveSetting("signatureEnabled", this.checked);
});

toggleRecover.addEventListener("change", function () {
  saveSetting("autoRecover", this.checked);
});

langSelector.addEventListener("change", function () {
  var lang = this.value;
  saveSetting("lang", lang);
  localize(lang);
});

// ---- Stats counter (approximate from background) / 统计计数 ----
function loadStats() {
  try {
    chrome.storage.local.get(["sentCount", "recvCount"], function (data) {
      var sent = data.sentCount || 0;
      var recv = data.recvCount || 0;
      if (sent > 0 || recv > 0) {
        statsRow.style.display = "flex";
        document.getElementById("statSent").textContent = sent;
        document.getElementById("statRecv").textContent = recv;
      }
    });
  } catch (e) {}
}

// ---- Copy link / 一键复制 ----
var copyLabels = {
  en:["Copy","Copied!"], zh:["复制","已复制！"], ja:["コピー","コピー完了！"],
  ko:["복사","복사됨!"], ru:["Копировать","Скопировано!"], ar:["نسخ","تم النسخ!"],
  fr:["Copier","Copié !"], es:["Copiar","¡Copiado!"], de:["Kopieren","Kopiert!"],
  pt:["Copiar","Copiado!"]
};
var GITHUB_URL = "https://github.com/L-Shy-P/TankTrouble-Chat-Unblock";
var copyBtn = document.getElementById("copyBtn");
var linkInput = document.getElementById("linkInput");

function updateCopyBtn(lang) {
  var labels = copyLabels[lang] || copyLabels["en"];
  copyBtn.textContent = labels[0];
  copyBtn.dataset.copy = labels[0];
  copyBtn.dataset.done = labels[1];
}

copyBtn.addEventListener("click", function () {
  linkInput.select();
  try {
    navigator.clipboard.writeText(GITHUB_URL).then(function () {
      copyBtn.textContent = copyBtn.dataset.done;
      copyBtn.classList.add("done");
      setTimeout(function () {
        copyBtn.textContent = copyBtn.dataset.copy;
        copyBtn.classList.remove("done");
      }, 1500);
    });
  } catch (e) {
    document.execCommand("copy");
    copyBtn.textContent = copyBtn.dataset.done;
    copyBtn.classList.add("done");
    setTimeout(function () {
      copyBtn.textContent = copyBtn.dataset.copy;
      copyBtn.classList.remove("done");
    }, 1500);
  }
});

// Update copy button label on lang change
var origLangChange = langSelector.onchange;
langSelector.addEventListener("change", function () {
  updateCopyBtn(langSelector.value);
});

// Init copy button
updateCopyBtn("en");
