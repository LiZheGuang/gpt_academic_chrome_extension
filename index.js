const { boolVal } = UtilsAll();
(() => {
  console.log("插件函数执行");
  EmitStore();
  VoicePlayBackSwich();
  CopySwich();
  ClickToSavePdf();
  ClickOptionsNext();
  ClickToSaveMd();
  Click_Bgc_options();
  HasStoreage();
})();
// Voice Playback Switching - 语音播放切换
function VoicePlayBackSwich() {
  $("#flexSwitchCheckChecked").on("change", function () {
    if ($(this).is(":checked")) {
      console.log("被选中");
      SendMessage({ checked: true, type: "yuyin" });
      Storage_Set("yuyin", true);
      // 当checkbox被选中时执行的代码
    } else {
      console.log("被取消");
      SendMessage({ checked: false, type: "yuyin" });
      Storage_Set("yuyin", false);

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
      SendMessage({ checked: true, type: "copy" });
      Storage_Set("copy", true);
    } else {
      console.log("被取消");
      // 当checkbox被取消选中时执行的代码
      SendMessage({ checked: false, type: "copy" });
      Storage_Set("copy", false);
    }
  });
}

// 点击导出PDF
function ClickToSavePdf() {
  $("#ToSavePdf").on("click", function () {
    SendMessage({ type: "tosavepdf" });
  });
}

// 点击导出md文件
function ClickToSaveMd() {
  $("#ToSaveMd").on("click", function () {
    SendMessage({ type: "tosavemd" });
    console.log("ToSaveMd");
  });
}

// 点击跳转设置页
function ClickOptionsNext() {
  $("#optinsNext").on("click", function () {
    window.open(chrome.runtime.getURL("options.html"));
  });
}

// 颜色点击选择
function Click_Bgc_options() {
  $(".color-options").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    const BGC_COLOR = $(this).css("background-color");
    SendMessage({ checked: { color: BGC_COLOR }, type: "SET_BGC" });
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

function SendMessage(data) {
  const { checked, type } = data;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabId = tabs[0].id;
    const sendObject = {
      checked,
      type,
    };
    EmitStore();
    chrome.tabs.sendMessage(tabId, sendObject, function () {});
  });
}

function Storage_Set(name, data) {
  return localStorage.setItem(name, data);
}

function Storage_Get(name) {
  return localStorage.getItem(name);
}

function InitStorage_SetALL() {}

function HasStoreage() {
  let copy = Storage_Get("copy");
  let yuyin = Storage_Get("yuyin");
  if (copy == null && yuyin == null) {
  } else {
    copy = boolVal(copy);
    yuyin = boolVal(yuyin);
    if (!copy) {
      console.log("需要未选中-copy");
      $("#flexSwitchCheckDefault").prop("checked", false);
    } else {
      $("#flexSwitchCheckDefault").prop("checked", true);
    }
    if (!yuyin) {
      console.log("需要未选中-yuyin");
      $("#flexSwitchCheckChecked").prop("checked", false);
    } else {
      $("#flexSwitchCheckChecked").prop("checked", true);
    }
  }
}

function EmitStore() {
  const Store = {
    copy: Storage_Get("copy") == null ? true : Storage_Get("copy"),
    yuyin: Storage_Get("yuyin") == null ? true : Storage_Get("yuyin"),
  };

  chrome.storage.sync.set({ Store });
}

function UtilsAll() {
  return (() => {
    const boolVal = (val) => {
      return val === "false" ? false : Boolean(val);
    };

    return {
      boolVal,
    };
  })();
}
