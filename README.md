# 🛡 TankTrouble Chat Unblock

> Browser extension to unlock multi-language chat in TankTrouble.com

<p align="center">
  <b>English</b> &nbsp;|&nbsp;
  <a href="#中文">中文</a> &nbsp;|&nbsp;
  <a href="#日本語">日本語</a> &nbsp;|&nbsp;
  <a href="#한국어">한국어</a> &nbsp;|&nbsp;
  <a href="#русский">Русский</a> &nbsp;|&nbsp;
  <a href="#العربية">العربية</a> &nbsp;|&nbsp;
  <a href="#français">Français</a> &nbsp;|&nbsp;
  <a href="#español">Español</a> &nbsp;|&nbsp;
  <a href="#deutsch">Deutsch</a> &nbsp;|&nbsp;
  <a href="#português">Português</a>
</p>

---

## English

### What It Does
TankTrouble.com blocks non-ASCII characters in chat — Chinese, Japanese, Korean, Arabic, Cyrillic, emoji, and more are rejected by the server. This extension bypasses the restriction by encoding Unicode characters into ASCII-safe `~XXXX` escape sequences before sending, then decoding them back on the receiving end.

### Features
- 🌍 **All writing systems** — CJK, Arabic, Cyrillic, Thai, Hindi, emoji, special symbols
- 🔐 **XOR scrambling** — avoids browser/network sensitive-word filters
- ⏱ **Timeout recovery** — auto-resets UI when server drops the receipt
- 🎛 **Popup panel** with language selector (10 languages)
- ✍️ **Signature watermark** — non-extension users see a link to install

### Install
1. Download or clone this repo
2. Open `chrome://extensions/` in Chrome/Edge
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** → select the extension folder
5. Go to [tanktrouble.com](https://tanktrouble.com) and chat in any language!

### How It Works
```
You type "你好"
  → XOR scramble → ~153a~0839
  → sent as pure ASCII (passes server filter)
  → received by others → decoded back to "你好"
```

> ⚠ Both sender and receiver need the extension to see decoded text. Non-users see raw `~XXXX` codes + a download link.

---

## 中文

### 功能
TankTrouble.com 的聊天系统会拦截非 ASCII 字符——中文、日文、韩文、阿拉伯文、表情符号等都会被服务器拒绝。此扩展在发送前将 Unicode 字符编码为 ASCII 安全的 `~XXXX` 转义序列，接收端自动解码还原。

### 特性
- 🌍 支持所有书写系统
- 🔐 XOR 加扰规避敏感词过滤器
- ⏱ 超时无应答自动恢复 UI
- 🎛 多语言弹出面板（10种语言）
- ✍️ 未装扩展的玩家会看到安装链接

### 安装
1. 下载或克隆此仓库
2. 打开 `chrome://extensions/`
3. 开启「开发者模式」→「加载已解压的扩展程序」
4. 选择扩展文件夹
5. 去 tanktrouble.com 即可用中文聊天

---

## 日本語

### 概要
TankTrouble.com のチャットは非 ASCII 文字をブロックします。この拡張機能は、Unicode 文字を `~XXXX` 形式の ASCII 安全なエスケープシーケンスにエンコードして送信し、受信側で自動的にデコードします。

### 特徴
- 🌍 すべての文字体系に対応（CJK、アラビア語、キリル文字、絵文字等）
- 🔐 XOR スクランブルでフィルター対策
- ⏱ 応答喪失時の自動 UI 復帰
- 🎛 10言語対応ポップアップパネル

### インストール
1. リポジトリをダウンロード
2. `chrome://extensions/` を開く
3. デベロッパーモード → パッケージ化されていない拡張機能を読み込む

---

## 한국어

### 설명
TankTrouble.com 채팅은 비ASCII 문자를 차단합니다. 이 확장 프로그램은 유니코드 문자를 ASCII 안전 `~XXXX` 형식으로 인코딩하여 전송하고, 수신 측에서 자동으로 디코딩합니다.

### 기능
- 🌍 모든 문자 체계 지원 (한글, 한자, 가나, 아랍어, 이모지 등)
- 🔐 XOR 스크램블로 필터 우회
- ⏱ 응답 없을 시 UI 자동 복구
- 🎛 다국어 패널 (10개 언어)

### 설치
1. 저장소 다운로드
2. `chrome://extensions/` 열기
3. 개발자 모드 → 압축해제된 확장 로드

---

## Русский

### Описание
Чат TankTrouble.com блокирует не-ASCII символы. Расширение кодирует Unicode в ASCII-безопасные `~XXXX` последовательности перед отправкой и декодирует их при получении.

### Возможности
- 🌍 Поддержка всех письменностей (кириллица, CJK, арабица, эмодзи)
- 🔐 XOR-скремблирование для обхода фильтров
- ⏱ Автовосстановление UI при потере ответа
- 🎛 Многоязычная панель (10 языков)

### Установка
1. Скачайте репозиторий
2. Откройте `chrome://extensions/`
3. Режим разработчика → Загрузить распакованное расширение

---

## العربية

### الوصف
دردشة TankTrouble.com تحظر الأحرف غير ASCII. هذا الملحق يقوم بتشفير Unicode إلى تسلسلات `~XXXX` الآمنة ASCII قبل الإرسال، ويفك تشفيرها عند الاستلام.

### الميزات
- 🌍 دعم جميع أنظمة الكتابة (العربية، CJK، السيريلية، الإيموجي)
- 🔐 تشفير XOR لتجاوز الفلاتر
- ⏱ استرداد تلقائي للواجهة
- 🎛 لوحة متعددة اللغات (10 لغات)

### التثبيت
1. حمل المستودع
2. افتح `chrome://extensions/`
3. وضع المطور → تحميل ملحق غير مضغوط

---

## Français

### Description
Le chat de TankTrouble.com bloque les caractères non-ASCII. Cette extension encode les caractères Unicode en séquences `~XXXX` (compatibles ASCII) avant l'envoi, puis les décode à la réception.

### Fonctionnalités
- 🌍 Tous les systèmes d'écriture (CJK, arabe, cyrillique, emoji)
- 🔐 Brouillage XOR anti-filtre
- ⏱ Récupération automatique de l'IU
- 🎛 Panneau multilingue (10 langues)

### Installation
1. Télécharger le dépôt
2. Ouvrir `chrome://extensions/`
3. Mode développeur → Charger l'extension non empaquetée

---

## Español

### Descripción
El chat de TankTrouble.com bloquea caracteres no-ASCII. Esta extensión codifica Unicode en secuencias `~XXXX` seguras para ASCII antes de enviar, y las decodifica al recibir.

### Características
- 🌍 Todos los sistemas de escritura (CJK, árabe, cirílico, emoji)
- 🔐 Ofuscación XOR anti-filtro
- ⏱ Recuperación automática de IU
- 🎛 Panel multilingüe (10 idiomas)

### Instalación
1. Descargar el repositorio
2. Abrir `chrome://extensions/`
3. Modo desarrollador → Cargar extensión desempaquetada

---

## Deutsch

### Beschreibung
Der Chat von TankTrouble.com blockiert nicht-ASCII Zeichen. Diese Erweiterung kodiert Unicode als ASCII-sichere `~XXXX` Sequenzen vor dem Senden und dekodiert sie beim Empfang.

### Funktionen
- 🌍 Alle Schriftsysteme (CJK, Arabisch, Kyrillisch, Emoji)
- 🔐 XOR-Verschlüsselung gegen Filter
- ⏱ Automatische UI-Wiederherstellung
- 🎛 Mehrsprachiges Panel (10 Sprachen)

### Installation
1. Repository herunterladen
2. `chrome://extensions/` öffnen
3. Entwicklermodus → Entpackte Erweiterung laden

---

## Português

### Descrição
O chat do TankTrouble.com bloqueia caracteres não-ASCII. Esta extensão codifica Unicode em sequências `~XXXX` seguras para ASCII antes de enviar, e as decodifica ao receber.

### Funcionalidades
- 🌍 Todos os sistemas de escrita (CJK, árabe, cirílico, emoji)
- 🔐 Embaralhamento XOR anti-filtro
- ⏱ Recuperação automática da UI
- 🎛 Painel multilíngue (10 idiomas)

### Instalação
1. Baixar o repositório
2. Abrir `chrome://extensions/`
3. Modo desenvolvedor → Carregar extensão descompactada

---

## License

MIT © 2026 L_Shy_P

## Changelog / 更新日志

### v2.1 — 2026-05-13

**Major / 重要更新：**
- 🇬🇧 Changed encoding prefix from `\u` to `~` to bypass profanity filter that corrupted certain character combinations
- 🇨🇳 编码前缀由 `\u` 改为 `~`，修复部分字符组合触发敏感词过滤器导致乱码的问题
- 🇯🇵 エンコード prefix を `\u` から `~` に変更、文字化けを修正
- 🇰🇷 인코딩 prefix를 `\u`에서 `~`로 변경, 일부 문자 조합 깨짐 현상 수정
- 🇷🇺 Префикс кодирования изменён с `\u` на `~`, исправлен баг с фильтром
- 🇸🇦 تم تغيير prefix الترميز من `\u` إلى `~` لإصلاح مشكلة تشويه بعض تركيبات الأحرف
- 🇫🇷 Préfixe d'encodage changé de `\u` à `~` pour contourner le filtre
- 🇪🇸 Prefijo de codificación cambiado de `\u` a `~` para evitar el filtro
- 🇩🇪 Kodierungspräfix von `\u` auf `~` geändert
- 🇵🇹 Prefixo de codificação alterado de `\u` para `~`

**Minor / 小更新：**
- 🇬🇧 Toggle now swaps message display instantly (no page reload) + popup no longer flashes on open + version checker added to header + "Stable" label i18n
- 🇨🇳 编码开关即时切换消息显示（不再刷新网页）+ 弹窗打开无闪烁 + 标题栏版本检测 + "稳定版"多语言化
- 🇯🇵 エンコード切替で即時表示更新 + ポップアップ表示の改善 + バージョン検出機能 + 「安定版」多言語化
- 🇰🇷 인코딩 토글 즉시 전환 + 팝업 깜빡임 수정 + 버전 확인 추가 + "안정판" 다국어화
- 🇷🇺 Мгновенное переключение отображения + исправлено мерцание + проверка версий + "Стабильная" на 10 языках
- 🇸🇦 تبديل فوري لعرض الرسائل + إصلاح وميض النافذة + فحص الإصدارات + "مستقر" متعدد اللغات
- 🇫🇷 Basculement instantané + correction du scintillement + vérification de version + "Stable" i18n
- 🇪🇸 Cambio instantáneo + arreglo de parpadeo + verificación de versión + "Estable" i18n
- 🇩🇪 Sofortige Umschaltung + Flackern behoben + Versionsprüfung + "Stabil" i18n
- 🇵🇹 Troca instantânea + correção de flicker + verificação de versão + "Estável" i18n

---

## How to Update / 更新方法（无需下载）

**English：** Open [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → paste into your local `content.js` file → go to `chrome://extensions/` → click ↻ on the extension card.

**中文：** 打开 [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → 全选复制 → 粘贴替换本地 `content.js` → 打开 `chrome://extensions/` → 点扩展卡片上的 ↻。

**日本語：** [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) を開く → 全選択コピー → ローカルの `content.js` に上書き → `chrome://extensions/` → ↻ クリック。

**한국어：** [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) 열기 → 전체 복사 → 로컬 `content.js`에 붙여넣기 → `chrome://extensions/` → ↻ 클릭.

**Русский：** Откройте [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → вставьте в локальный `content.js` → `chrome://extensions/` → нажмите ↻.

**العربية：** افتح [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → نسخ الكل → لصق في الملف المحلي `content.js` → `chrome://extensions/` → اضغط ↻.

**Français：** Ouvrez [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → collez dans votre `content.js` local → `chrome://extensions/` → cliquez ↻.

**Español：** Abra [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → pegue en su `content.js` local → `chrome://extensions/` → haga clic en ↻.

**Deutsch：** Öffnen Sie [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → in lokale `content.js` einfügen → `chrome://extensions/` → ↻ klicken.

**Português：** Abra [`content.js`](https://raw.githubusercontent.com/L-Shy-P/TankTrouble-Chat-Unblock/master/content.js) → Ctrl+A → Ctrl+C → cole no seu `content.js` local → `chrome://extensions/` → clique em ↻.

> 💡 **Tip:** Usually only `content.js` changes. If the changelog mentions `bridge.js` or `popup.js`, update those too the same way.

## Links

- 🔗 [GitHub Repository](https://github.com/L-Shy-P/TankTrouble-Chat-Unblock)
- 🎮 [TankTrouble.com](https://tanktrouble.com)
