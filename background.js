// 插件与注入content=web双向通讯
chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected to content script");
  port.onMessage.addListener(async function (msg) {
    if (msg.request == "getCache") {
      const resopon = await chrome.storage.sync.get("Store");
      port.postMessage({ response: JSON.stringify(resopon) });
    }
  });
});
