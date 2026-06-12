// bridge.js — ISOLATED world, has chrome.storage access
// 桥接脚本：隔离世界，有 chrome.storage 权限，通过 postMessage 与主世界通信
(function () {
  "use strict";

  function send(msg) {
    window.postMessage({ source: "tt-bridge", data: msg }, "*");
  }

  // 同步默认值：防止 content.js 在异步回调前读取不到值
  var _mirWasNull = false;
  try { if (localStorage.getItem("tt-mir") === null) { localStorage.setItem("tt-mir", "1"); _mirWasNull = true; } } catch (e) {}
  try { if (localStorage.getItem("tt-lang") === null) localStorage.setItem("tt-lang", "en"); } catch (e) {}

  // 初始加载 → 发送给 MAIN world
  chrome.storage.local.get(["signatureEnabled", "encodeEnabled", "format", "lang", "versionEnabled", "mirrorEnabled"], function (d) {
    var mir = d.mirrorEnabled !== undefined ? d.mirrorEnabled : true;
    try { localStorage.setItem("tt-mir", mir ? "1" : "0"); } catch (e) {}
    var lang = d.lang || "en";
    try { localStorage.setItem("tt-lang", lang); } catch (e) {}
    // 刷新后清除待处理标记，popup 不再显示刷新提示
    if (location.hostname === "cdn.tanktrouble.com") chrome.storage.local.remove("_mirPendingFrom");
    // 首次访问镜像站且实际应关闭 → 刷新一次确保 content.js 读到正确值
    if (_mirWasNull && !mir && location.hostname === "cdn.tanktrouble.com") {
      location.reload();
      return;
    }
    send({
      type: "init",
      sig: d.signatureEnabled !== undefined ? d.signatureEnabled : true,
      enc: d.encodeEnabled !== undefined ? d.encodeEnabled : true,
      fmt: d.format || "v2",
      lang: lang,
      ver: d.versionEnabled !== undefined ? d.versionEnabled : true,
      mir: mir
    });
  });

  chrome.storage.onChanged.addListener(function (c) {
    if (c.signatureEnabled) send({ type: "sig", value: c.signatureEnabled.newValue });
    if (c.encodeEnabled) send({ type: "enc", value: c.encodeEnabled.newValue });
    if (c.format) send({ type: "fmt", value: c.format.newValue });
    if (c.lang) { try { localStorage.setItem("tt-lang", c.lang.newValue); } catch (e) {} send({ type: "lang", value: c.lang.newValue }); }
    if (c.versionEnabled) send({ type: "ver", value: c.versionEnabled.newValue });
    if (c.mirrorEnabled) { try { localStorage.setItem("tt-mir", c.mirrorEnabled.newValue ? "1" : "0"); } catch (e) {} send({ type: "mir", value: c.mirrorEnabled.newValue }); }
    if (c._resetRequest && c._resetRequest.newValue) {
      send({ type: "reset" });
    }
  });
})();
