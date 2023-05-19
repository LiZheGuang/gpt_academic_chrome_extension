chrome.runtime.sendMessage(
  {
    info: "我是 content.js",
  },
  (res) => {
    // 答复
    // alert(res);
  }
);
