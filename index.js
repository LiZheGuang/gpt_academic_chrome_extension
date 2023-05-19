(() => {
  console.log("插件函数执行");
  VoicePlayBackSwich();
  CopySwich();

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    console.log("Tab ID:", tabs);
    chrome.tabs.sendMessage(tabId, "data", function () {
      console.log("收到响应");
    });
  });
})();
// Voice Playback Switching - 语音播放切换
function VoicePlayBackSwich() {
  $("#flexSwitchCheckChecked").on("change", function () {
    if ($(this).is(":checked")) {
      console.log("被选中");
      // 当checkbox被选中时执行的代码
    } else {
      console.log("被取消");
      // 当checkbox被取消选中时执行的代码
    }
  });
}
// 复制功能切换
function CopySwich() {
  $("#flexSwitchCheckDefault").on("change", function () {
    if ($(this).is(":checked")) {
      console.log("被选中");
      // 当checkbox被选中时执行的代码
    } else {
      console.log("被取消");
      // 当checkbox被取消选中时执行的代码
    }
  });
}

function ChromeExtentUtils() {
  return (function () {
    const MABE_SUPER_FN = function () {
      return {
        name: "MABE_SUPER_FN",
      };
    };
    return { MABE_SUPER_FN };
  })();
}
