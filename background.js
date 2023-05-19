// chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
//   console.log(req, "123123");
//   //   chrome.storage.local.get(["copy"], function (result) {
//   //     console.log("Value currently is " + result.key);
//   //   });
//   const data = await chrome.storage.sync.get("copy");
//   console.log(data, "data");
//   const result = chrome.storage.local.get(["copy"]).then((result) => {
//     return result;
//   });
//   sendResponse({ code: 200, stor: "缓存", result: data });
// });

// await chrome.storage.sync.get("copy");
// await chrome.storage.sync.get("copy");

chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected to content script");
  port.onMessage.addListener(async function (msg) {
    if (msg.request == "getCache") {
      const resopon = await chrome.storage.sync.get("Store");
      port.postMessage({ response: JSON.stringify(resopon) });
    }
  });
});
