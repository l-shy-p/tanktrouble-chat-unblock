// bridge.js — ISOLATED world, has chrome.storage access
// 桥接脚本：隔离世界，有 chrome.storage 权限，通过 postMessage 与主世界通信
(function () {
  "use strict";

  function send(msg) {
    window.postMessage({ source: "tt-bridge", data: msg }, "*");
  }

  // 初始加载 → 发送给 MAIN world
  chrome.storage.local.get(["signatureEnabled", "encodeEnabled", "format", "lang"], function (d) {
    send({
      type: "init",
      sig: d.signatureEnabled !== undefined ? d.signatureEnabled : true,
      enc: d.encodeEnabled !== undefined ? d.encodeEnabled : true,
      fmt: d.format || "v2",
      lang: d.lang || "en"
    });
  });

  chrome.storage.onChanged.addListener(function (c) {
    if (c.signatureEnabled) send({ type: "sig", value: c.signatureEnabled.newValue });
    if (c.encodeEnabled) send({ type: "enc", value: c.encodeEnabled.newValue });
    if (c.format) send({ type: "fmt", value: c.format.newValue });
    if (c.lang) send({ type: "lang", value: c.lang.newValue });
    if (c._resetRequest && c._resetRequest.newValue) {
      send({ type: "reset" });
    }
  });
})();
