// bridge.js — ISOLATED world, has chrome.storage access
// 桥接脚本：隔离世界，有 chrome.storage 权限，通过 postMessage 与主世界通信
(function () {
  "use strict";

  function send(msg) {
    window.postMessage({ source: "tt-bridge", data: msg }, "*");
  }

  // 初始加载 → 发送给 MAIN world
  chrome.storage.local.get(["signatureEnabled", "enabled", "lang"], function (d) {
    send({
      type: "init",
      sig: d.signatureEnabled !== undefined ? d.signatureEnabled : true,
      on: d.enabled !== undefined ? d.enabled : true,
      lang: d.lang || "en"
    });
  });

  // 变更监听 → 实时同步
  chrome.storage.onChanged.addListener(function (c) {
    if (c.signatureEnabled) send({ type: "sig", value: c.signatureEnabled.newValue });
    if (c.enabled) send({ type: "on", value: c.enabled.newValue });
    if (c.lang) send({ type: "lang", value: c.lang.newValue });
    if (c._resetRequest && c._resetRequest.newValue) {
      send({ type: "reset" });
    }
  });
})();
