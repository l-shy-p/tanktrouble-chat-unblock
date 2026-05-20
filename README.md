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
- ✍️ **Signature watermark** — non-extension users see `[Chat Unblocker]` tag

### What's New in v2.6
- 🎛 **Version number toggle** — signature watermark now includes a toggleable version number; with switch on: ` | v2.6 [Chat Unblocker]`; with switch off: ` [Chat Unblocker]` — let non-extension users choose readability or version info
- 📋 **Fluent copy menu** — hover any message to reveal a copy icon; click to copy message text, or hover the icon for a dropdown menu with 3 options: copy text (without names), copy full message (with names), and copy individual player names
- 🌍 **Full i18n support** — copy menu and all labels available in 10 languages (中文 / 日本語 / 한국어 / Русский / العربية / Français / Español / Deutsch / Português / English)
- 🎬 **Microsoft Fluent animations** — elastic cubic-bezier transitions, velocity-aware movement (no jitter during fast mouse), scale-pulse click feedback, and smooth resize/drag following with fade effects
- 🐛 **Fixed text selection visibility** — selected text displays green background + black text; text-shadow and text-stroke suppressed
- 🔧 **Dynamic chat detection** — runtime `CB.chatBody` detection with `CB.chat` fallback; no hardcoded CSS class dependency

### What's New in v2.5
- 🏷️ **Version tag in signature** — V2 messages now include ` | v2.5 [Chat Unblocker]` suffix; non-extension users can see the version number
- 🔄 **V1.2 format compatibility** — V1.2 mode also shows ` | v2.5 [Chat Unblocker]`; legacy users can see version info
- 🔒 **Signature lock for V1.2** — signature switch is locked when V1.2 format is selected; first close attempt triggers a warning animation + red alert
- ⚠️ **Smooth warning animations** — all warning boxes (yellow V1.2 warning, red signature warning) have expand/collapse transitions
- 🎨 **Signature switch feedback** — shake animation on first close attempt; red background when closed; smooth state transitions
- 📦 **Format selector animation** — format and language selectors have smooth expand/collapse animations on panel open

### What's New in v2.4
- 🐛 **Fixed first message toggle bug** — the first received message from others now correctly switches between decoded and raw encoded content when toggling the encoding switch
- 🐛 **Fixed double-click text duplication** — rapid clicking of the encoding toggle no longer causes message text to display doubled
- 🐛 **Fixed message state persistence** — all messages now reliably maintain their display state across toggle operations
- 🏷️ **Signature format reverted** — back to `[Chat Unblocker]` without version number
- 🔄 **Format labels updated** — V2.x and V1.2 format options in settings panel
- 🌐 **Page language label** — new "Page Language" label above the language selector

### What's New in v2.3
- 🐛 **Fixed V1.2 compatibility** — v1 mode now uses correct V1 signature format; v1.2 users can read messages again
- 🔄 **Format switcher** — choose between V2 (`~XXXX`) and V1.2 (`\uXXXX`) encoding
- ⚠️ **V1.2 warning** — warns that some V1.2 character combinations may be blocked by game server
- 🏷️ **Version signature** — V2 messages prefixed with `[Chat Unblocker V2.3]`; V1 messages use original suffix
- 🌐 **V1.2 label** — old format messages display with `[V1.2 Format]` prefix (i18n)

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
- 🎛 多语言弹出面板（10 种语言）
- ✍️ 未装扩展的玩家会看到 `[Chat Unblocker]` 签名水印

### v2.6 更新内容
- 🎛 **版本号显示开关** — 签名水印支持可切换版本号；开关打开：` | v2.6 [Chat Unblocker]`；开关关闭：` [Chat Unblocker]` — 让未装插件的用户选择可读性还是版本信息
- 📋 **Fluent复制菜单** — 鼠标悬停任意消息显示复制图标；点击直接复制消息文字，或悬停图标弹出下拉菜单：复制内容（不含名字）、复制整条（含名字）、复制单个玩家名
- 🌍 **完整多语言** — 复制菜单和所有标签支持10种语言
- 🎬 **微软 Fluent 动画** — 弹性贝塞尔过渡、鼠标速度感知（快速移动不抖动）、点击缩放反馈、拖动/缩放时平滑跟随+淡出
- 🐛 **修复选中文字可见性** — 框选文字绿色背景+黑色文字，阴影和描边被抑制
- 🔧 **动态聊天检测** — 运行时 `CB.chatBody` 检测+ `CB.chat` 回退，不依赖硬编码CSS类名

### v2.5 更新内容
- 🏷️ **签名带版本号** — V2 消息现在包含 ` | v2.5 [Chat Unblocker]` 后缀；未装扩展的玩家也能看到版本号
- 🔄 **V1.2 格式兼容** — V1.2 模式同样显示 ` | v2.5 [Chat Unblocker]`；老版本用户可看到版本信息
- 🔒 **V1.2 签名锁定** — 选择 V1.2 格式时签名开关被锁定；首次尝试关闭会触发警告动画+红色提示
- ⚠️ **警告框平滑动画** — 所有警告框（黄色 V1.2 警告、红色签名警告）都有展开/收起过渡效果
- 🎨 **签名开关反馈** — 首次尝试关闭时抖动动画；关闭后红色背景；状态切换平滑
- 📦 **选择器展开动画** — 格式和语言选择器在面板打开时有平滑的展开动画

### v2.4 更新内容
- 🐛 **修复第一条消息无法切换问题** — 别人发送的第一条消息现在可以在解码内容和原始编码内容之间正确切换
- 🐛 **修复快速双击文字翻倍** — 快速连续点击编码开关不再导致消息文字显示双倍
- 🐛 **修复消息状态持久化** — 所有消息现在在切换操作时都能可靠保持显示状态
- 🏷️ **签名格式改回** — 回到不带版本号的 `[Chat Unblocker]`
- 🔄 **格式标签更新** — 设置面板中显示 V2.x 和 V1.2 格式选项
- 🌐 **页面语言标签** — 语言选择器上方新增"页面语言"标签

### v2.3 更新内容
- 🐛 **修复 V1.2 兼容性** — v1 模式现使用正确的 V1 签名格式；v1.2 用户可正常阅读消息
- 🔄 **格式切换器** — 可选择 V2（`~XXXX`）或 V1.2（`\uXXXX`）编码格式
- ⚠️ **V1.2 警告提示** — 部分 V1.2 字符组合可能被游戏服务器拦截
- 🏷️ **版本签名** — V2 消息前缀 `[Chat Unblocker V2.3]`；V1 消息使用原始后缀
- 🌐 **V1.2 标识** — 旧格式消息显示时带 `[V1.2 格式]` 前缀（多语言）

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
- 🎛 10 言語対応ポップアップパネル

### v2.5 の新機能
- 🏷️ **署名にバージョン番号** — V2 メッセージに ` | v2.5 [Chat Unblocker]` サフィックスを追加；未インストールユーザーにもバージョンが見える
- 🔄 **V1.2 形式互換** — V1.2 モードでも ` | v2.5 [Chat Unblocker]` を表示；レガシーユーザーもバージョン情報を確認可能
- 🔒 **V1.2 署名ロック** — V1.2 形式選択時に署名スイッチがロック；初回クローズ試行で警告アニメーション＋赤色アラート
- ⚠️ **警告ボックスの滑らかなアニメーション** — 全警告ボックス（黄色 V1.2 警告、赤色署名警告）に展開/収縮トランジション
- 🎨 **署名スイッチのフィードバック** — 初回クローズ試行時にシェイクアニメーション；クローズ後赤色背景；状態切替が滑らかに
- 📦 **セレクター展開アニメーション** — パネルオープン時にフォーマットと言語セレクターが滑らかに展開

### v2.4 の新機能
- 🐛 **最初のメッセージ切替バグ修正** — 他人から送信された最初のメッセージが、エンコード切替時にデコード済み内容と生エンコード内容の間で正しく切替可能に
- 🐛 **ダブルクリック文字重複修正** — エンコード切替ボタンの連続クリックでメッセージ文字が二重表示されなくなりました
- 🐛 **メッセージ状態永続化修正** — 全メッセージが切替操作時に表示状態を確実に維持
- 🏷️ **署名形式の復元** — バージョン番号なしの `[Chat Unblocker]` に戻りました
- 🔄 **形式ラベル更新** — 設定パネルに V2.x と V1.2 形式オプション
- 🌐 **ページ言語ラベル** — 言語セレクターの上に「ページ言語」ラベル追加

### v2.2 の新機能
- ✅ **V1.2 形式の互換性** — 古い `\uXXXX` メッセージを自動検出・デコード
- 🔄 **形式スイッチャー** — V2.2（`~XXXX`）と V1.2（`\uXXXX`）を選択可能
- ⚠️ **V1.2 警告** — 一部の V1.2 文字列はゲームサーバーにブロックされる可能性
- 🏷️ **バージョン署名** — メッセージは `[Chat Unblocker V2.2]` で始まる
- 🌐 **V1.2 ラベル** — 旧形式メッセージに `[V1.2 形式]` プレフィックス（多言語）

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
- 🎛 다국어 패널 (10 개 언어)

### v2.5 업데이트 내용
- 🏷️ **서명에 버전 번호** — V2 메시지에 ` | v2.5 [Chat Unblocker]` 접미사 추가; 미설치 사용자도 버전 확인 가능
- 🔄 **V1.2 형식 호환** — V1.2 모드에서도 ` | v2.5 [Chat Unblocker]` 표시; 레거시 사용자도 버전 정보 확인 가능
- 🔒 **V1.2 서명 잠금** — V1.2 형식 선택 시 서명 스위치 잠금; 첫 번째 닫기 시도 시 경고 애니메이션 + 빨간색 알림
- ⚠️ **경고창 부드러운 애니메이션** — 모든 경고창 (노란색 V1.2 경고, 빨간색 서명 경고) 에展开/收起 전환 효과
- 🎨 **서명 스위치 피드백** — 첫 번째 닫기 시도 시 쉐이크 애니메이션; 닫힌 후 빨간색 배경; 상태 전환 부드럽게
- 📦 **선택기展开 애니메이션** — 패널 열릴 때 형식 및 언어 선택기 부드러운展开 효과

### v2.4 업데이트 내용
- 🐛 **첫 번째 메시지 전환 버그 수정** — 다른 사용자가 보낸 첫 번째 메시지가 인코딩 전환 시 디코딩된 내용과 원시 인코딩 내용 간에 올바르게 전환됨
- 🐛 **더블클릭 텍스트 중복 수정** — 인코딩 토글 버튼을 빠르게 연속 클릭해도 메시지 텍스트가 두 배로 표시되지 않음
- 🐛 **메시지 상태 지속성 수정** — 모든 메시지가 전환 작업 시 표시 상태를 안정적으로 유지
- 🏷️ **서명 형식 복원** — 버전 번호 없는 `[Chat Unblocker]` 로 복귀
- 🔄 **형식 라벨 업데이트** — 설정 패널에 V2.x 및 V1.2 형식 옵션
- 🌐 **페이지 언어 라벨** — 언어 선택기 위에 "페이지 언어" 라벨 추가

### v2.2 업데이트 내용
- ✅ **V1.2 형식 호환** — 이전 `\uXXXX` 메시지 자동 감지 및 디코딩
- 🔄 **형식 전환기** — V2.2(`~XXXX`) 와 V1.2(`\uXXXX`) 중 선택 가능
- ⚠️ **V1.2 경고** — 일부 V1.2 문자 조합은 게임 서버에 차단될 수 있음
- 🏷️ **버전 서명** — 메시지가 `[Chat Unblocker V2.2]` 로 시작
- 🌐 **V1.2 라벨** — 이전 형식 메시지에 `[V1.2 형식]` 접두사 표시 (다국어)

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

### Новое в v2.4
- 🐛 **Исправлена ошибка переключения первого сообщения** — первое полученное сообщение теперь корректно переключается между декодированным и исходным закодированным содержимым
- 🐛 **Исправлено удвоение текста при двойном клике** — быстрое нажатие кнопки переключения больше не вызывает удвоение текста сообщения
- 🐛 **Исправлено сохранение состояния сообщений** — все сообщения теперь надёжно сохраняют состояние отображения при переключении
- 🏷️ **Возврат формата подписи** — обратно к `[Chat Unblocker]` без номера версии
- 🔄 **Обновлены метки форматов** — опции V2.x и V1.2 в панели настроек
- 🌐 **Метка языка страницы** — новый ярлык «Язык страницы» над селектором языка

### Новое в v2.2
- ✅ **Совместимость с V1.2** — автоматическое обнаружение и декодирование старых `\uXXXX` сообщений
- 🔄 **Переключатель формата** — выбор между V2.2 (`~XXXX`) и V1.2 (`\uXXXX`)
- ⚠️ **Предупреждение V1.2** — некоторые комбинации V1.2 могут блокироваться сервером
- 🏷️ **Версия подписи** — сообщения начинаются с `[Chat Unblocker V2.2]`
- 🌐 **Метка V1.2** — старые сообщения отображаются с префиксом `[V1.2 Формат]` (i18n)

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

### الجديد في v2.4
- 🐛 **إصلاح خطأ تبديل الرسالة الأولى** — الرسالة الأولى المستلمة تتبدل الآن بشكل صحيح بين المحتوى المفكوك والمحتوى المشفر الخام
- 🐛 **إصلاح تكرار النص عند النقر المزدوج** — النقر السريع على زر التبديل لم يعد يسبب تكرار نص الرسالة
- 🐛 **إصلاح استمرار حالة الرسائل** — جميع الرسائل تحافظ الآن على حالة العرض بشكل موثوق
- 🏷️ **إعادة تنسيق التوقيع** — العودة إلى `[Chat Unblocker]` بدون رقم إصدار
- 🔄 **تحديث ملصقات التنسيق** — خيارات V2.x و V1.2 في لوحة الإعدادات
- 🌐 **ملصق لغة الصفحة** — ملصق جديد "لغة الصفحة" فوق محدد اللغة

### الجديد في v2.2
- ✅ **التوافق مع تنسيق V1.2** — الكشف التلقائي وفك ترميز رسائل `\uXXXX` القديمة
- 🔄 **مبدل التنسيق** — اختيار بين V2.2 (`~XXXX`) و V1.2 (`\uXXXX`)
- ⚠️ **تحذير V1.2** — بعض تركيبات V1.2 قد تحظرها لعبة الخادم
- 🏷️ **توقيع الإصدار** — الرسائل تبدأ بـ `[Chat Unblocker V2.2]`
- 🌐 **ملصق V1.2** — الرسائل القديمة تعرض مع البادئة `[V1.2 تنسيق]` (متعدد اللغات)

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

### Nouveautés v2.4
- 🐛 **Correction du bug de basculement du premier message** — le premier message reçu bascule désormais correctement entre le contenu décodé et le contenu encodé brut
- 🐛 **Correction de la duplication de texte au double-clic** — cliquer rapidement sur le bouton de basculement ne duplique plus le texte du message
- 🐛 **Correction de la persistance de l'état des messages** — tous les messages conservent désormais leur état d'affichage de manière fiable
- 🏷️ **Retour au format de signature** — retour à `[Chat Unblocker]` sans numéro de version
- 🔄 **Mise à jour des étiquettes de format** — options V2.x et V1.2 dans le panneau des paramètres
- 🌐 **Étiquette de langue de la page** — nouvelle étiquette « Langue de la page » au-dessus du sélecteur de langue

### Nouveautés v2.2
- ✅ **Compatibilité V1.2** — détection et décodage automatiques des anciens messages `\uXXXX`
- 🔄 **Sélecteur de format** — choix entre V2.2 (`~XXXX`) et V1.2 (`\uXXXX`)
- ⚠️ **Avertissement V1.2** — certaines combinaisons V1.2 peuvent être bloquées par le serveur
- 🏷️ **Signature de version** — les messages commencent par `[Chat Unblocker V2.2]`
- 🌐 **Étiquette V1.2** — les anciens messages affichent `[V1.2 Format]` (i18n)

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

### Novedades v2.4
- 🐛 **Corregido el bug de alternancia del primer mensaje** — el primer mensaje recibido ahora cambia correctamente entre contenido decodificado y contenido codificado crudo
- 🐛 **Corregida la duplicación de texto al hacer doble clic** — hacer clic rápido en el botón de alternancia ya no duplica el texto del mensaje
- 🐛 **Corregida la persistencia del estado de los mensajes** — todos los mensajes ahora mantienen su estado de visualización de manera confiable
- 🏷️ **Restaurado formato de firma** — de vuelta a `[Chat Unblocker]` sin número de versión
- 🔄 **Etiquetas de formato actualizadas** — opciones V2.x y V1.2 en el panel de configuración
- 🌐 **Etiqueta de idioma de la página** — nueva etiqueta "Idioma de la página" sobre el selector de idioma

### Novedades v2.2
- ✅ **Compatibilidad con V1.2** — detección y decodificación automática de mensajes `\uXXXX` antiguos
- 🔄 **Selector de formato** — elegir entre V2.2 (`~XXXX`) y V1.2 (`\uXXXX`)
- ⚠️ **Advertencia V1.2** — algunas combinaciones V1.2 pueden ser bloqueadas por el servidor
- 🏷️ **Firma de versión** — los mensajes comienzan con `[Chat Unblocker V2.2]`
- 🌐 **Etiqueta V1.2** — mensajes antiguos muestran `[V1.2 Formato]` (i18n)

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

### Neu in v2.4
- 🐛 **Umschaltfehler der ersten Nachricht behoben** — die erste empfangene Nachricht wechselt jetzt korrekt zwischen dekodiertem und rohem kodiertem Inhalt
- 🐛 **Textverdopplung bei Doppelklick behoben** — schnelles Klicken auf die Umschalttaste verdoppelt den Nachrichtentext nicht mehr
- 🐛 **Nachrichtenzustand-Persistenz behoben** — alle Nachrichten behalten jetzt ihren Anzeigestatus zuverlässig bei
- 🏷️ **Signaturformat wiederhergestellt** — zurück zu `[Chat Unblocker]` ohne Versionsnummer
- 🔄 **Formatetiketten aktualisiert** — V2.x- und V1.2-Formatoptionen im Einstellungsfenster
- 🌐 **Seitensprachen-Etikett** — neues Etikett „Seitensprache" über dem Sprachwähler

### Neu in v2.2
- ✅ **V1.2-Kompatibilität** — automatische Erkennung und Dekodierung alter `\uXXXX` Nachrichten
- 🔄 **Formatumschalter** — Wahl zwischen V2.2 (`~XXXX`) und V1.2 (`\uXXXX`)
- ⚠️ **V1.2-Warnung** — manche V1.2-Kombinationen können vom Server blockiert werden
- 🏷️ **Versions-Signatur** — Nachrichten beginnen mit `[Chat Unblocker V2.2]`
- 🌐 **V1.2-Kennzeichnung** — alte Nachrichten zeigen `[V1.2 Format]` Präfix (i18n)

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

### Novidades v2.4
- 🐛 **Corrigido bug de alternância da primeira mensagem** — a primeira mensagem recebida agora alterna corretamente entre conteúdo decodificado e conteúdo codificado bruto
- 🐛 **Corrigida duplicação de texto ao clicar duas vezes** — clicar rapidamente no botão de alternância não duplica mais o texto da mensagem
- 🐛 **Corrigida persistência do estado das mensagens** — todas as mensagens agora mantêm seu estado de exibição de forma confiável
- 🏷️ **Formato de assinatura restaurado** — de volta a `[Chat Unblocker]` sem número de versão
- 🔄 **Rótulos de formato atualizados** — opções V2.x e V1.2 no painel de configurações
- 🌐 **Rótulo de idioma da página** — novo rótulo "Idioma da página" acima do seletor de idioma

### Novidades v2.2
- ✅ **Compatibilidade com V1.2** — detecção e decodificação automática de mensagens `\uXXXX` antigas
- 🔄 **Seletor de formato** — escolha entre V2.2 (`~XXXX`) e V1.2 (`\uXXXX`)
- ⚠️ **Aviso V1.2** — algumas combinações V1.2 podem ser bloqueadas pelo servidor
- 🏷️ **Assinatura de versão** — mensagens começam com `[Chat Unblocker V2.2]`
- 🌐 **Rótulo V1.2** — mensagens antigas exibem `[V1.2 Formato]` (i18n)

### Instalação
1. Baixar o repositório
2. Abrir `chrome://extensions/`
3. Modo desenvolvedor → Carregar extensão descompactada

---

## License

MIT © 2026 L_Shy_P

## Changelog / 更新日志

### v2.2 — 2026-05-15

**Major / 重要更新：**
- 🇬🇧 Added V1.2 format compatibility — can now receive and decode old `\uXXXX` messages + option to send in either V2.2 (`~XXXX`) or V1.2 (`\uXXXX`) format
- 🇨🇳 新增 V1.2 格式兼容 — 可接收并解码旧的 `\uXXXX` 消息 + 可选择发送格式（V2.2 `~XXXX` 或 V1.2 `\uXXXX`）
- 🇯🇵 V1.2 形式互換を追加 — 古い `\uXXXX` メッセージの受信とデコード + V2.2(`~XXXX`)かV1.2(`\uXXXX`)かを選択可能
- 🇰🇷 V1.2 형식 호환 추가 — 이전 `\uXXXX` 메시지 수신 및 디코딩 + V2.2(`~XXXX`) 또는 V1.2(`\uXXXX`)中选择
- 🇷🇺 Добавлена совместимость с V1.2 — приём и декодирование старых `\uXXXX` сообщений + выбор формата отправки
- 🇸🇦 تمت إضافة التوافق مع تنسيق V1.2 — استقبال وفك ترميز رسائل `\uXXXX` القديمة + اختيار تنسيق الإرسال
- 🇫🇷 Compatibilité V1.2 ajoutée — réception et décodage des anciens messages `\uXXXX` + choix du format d'envoi
- 🇪🇸 Añadida compatibilidad con V1.2 — recepción y decodificación de mensajes `\uXXXX` antiguos + opción de formato
- 🇩🇪 V1.2-Kompatibilität hinzugefügt — Empfang und Dekodierung alter `\uXXXX` Nachrichten + Formatwahl
- 🇧🇷 Adicionada compatibilidade com V1.2 — recebimento e decodificação de mensagens `\uXXXX` antigas + escolha de formato

**Minor / 小更新：**
- 🇬🇧 New signature format `[Chat Unblocker V2.2]` placed at message start + V1.2 messages display with `[V1.2 Format]` prefix + format switcher in popup panel + V1.2 warning about server blocking
- 🇨🇳 新签名格式 `[Chat Unblocker V2.2]` 放在消息开头 + V1.2 消息显示 `[V1.2 格式]` 前缀 + 弹窗新增格式切换器 + V1.2 警告提示
- 🇯🇵 新しい署名形式 `[Chat Unblocker V2.2]` をメッセージ先頭に + V1.2 メッセージには `[V1.2 形式]` プレフィックス + ポップアップに形式スイッチャー + V1.2 警告
- 🇰🇷 새 서명 형식 `[Chat Unblocker V2.2]` 메시지 시작에 배치 + V1.2 메시지는 `[V1.2 형식]` 접두사 표시 + 팝업에 형식 전환기 + V1.2 경고
- 🇷🇺 Новый формат подписи `[Chat Unblocker V2.2]` в начале сообщения + V1.2 сообщения с префиксом `[V1.2 Формат]` + переключатель в панели + предупреждение
- 🇸🇦 تنسيق التوقيع الجديد `[Chat Unblocker V2.2]` في بداية الرسالة + رسائل V1.2 تعرض مع `[V1.2 تنسيق]` + مبدل التنسيق في اللوحة + تحذير
- 🇫🇷 Nouveau format de signature `[Chat Unblocker V2.2]` au début + messages V1.2 avec `[V1.2 Format]` + sélecteur dans le popup + avertissement
- 🇪🇸 Nuevo formato de firma `[Chat Unblocker V2.2]` al inicio + mensajes V1.2 con `[V1.2 Formato]` + selector en panel + advertencia
- 🇩🇪 Neue Signatur `[Chat Unblocker V2.2]` am Anfang + V1.2 Nachrichten mit `[V1.2 Format]` Präfix + Formatumschalter + Warnung
- 🇧🇷 Novo formato de assinatura `[Chat Unblocker V2.2]` no início + mensagens V1.2 com `[V1.2 Formato]` + seletor no popup + aviso

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
