// web页面代码注入js
(() => {
  var port = chrome.runtime.connect({ name: "cacheChannel" });
  port.postMessage({ request: "getCache" });
  // console.log('TurndownService',TurndownService)
  // 插件与注入content=web双向通讯
  port.onMessage.addListener(function (response) {
    console.log("Plugin cache: " + response.response);
    // console.log(isEmptyObject(response.response))

    if (response.response == "{}") {
      Vice();
      clickCopy();
    } else {
      const onResponseDatas = JSON.parse(response.response);
      let { copy, yuyin } = onResponseDatas.Store;
      copy = boolVal(copy);
      yuyin = boolVal(yuyin);
      if (copy == false) {
        $(document).off("mouseenter mouseleave", ".markdown-body");
      } else {
        clickCopy();
      }
      if (yuyin == false) {
        $(".vice-button").remove();
      } else {
        Vice();
      }
    }

    // console.log(onResponseDatas);
  });
  chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    console.log(msg, sender);
    const { checked, type } = msg;
    if (type === "yuyin") {
      if (checked) {
        Vice();
      } else {
        $(".vice-button").remove();
      }
    }
    if (type === "copy") {
      if (checked) {
        clickCopy();
      } else {
        $(document).off("mouseenter mouseleave", ".markdown-body");
      }
    }
    if (type === "tosavepdf") {
      console.log("导出PDF");
      DomToPdf();
    }
    if (type === "tosavemd") {
      console.log("导出MD");
      DomToMd();
    }

    response();
  });
})();

// 语音播报插件
function Vice() {
  var $component8 = $("#component-8");
  console.log($component8);
  setTimeout(() => {
    const button = document.createElement("button");
    button.classList.add("vice-button");
    button.innerText = "文本阅读";
    // button.style.color = "white";
    // button.style.backgroundColor = "yellow";
    // button.style.width = "100%";
    // button.style.height = "50px";

    // 创建 SpeechSynthesis 实例
    const synth = window.speechSynthesis;

    const speak = (textDtastr) => {
      // 创建新的 SpeechSynthesisUtterance 实例，并设置相关属性
      const utterance = new SpeechSynthesisUtterance(textDtastr);
      utterance.rate = 1.25; // 设置语速为 1.5x （可选）

      // 播放文本语音
      synth.speak(utterance);
    };
    $("#component-8").append(button);
    // 获取最后GPT输出的文案内容

    $(button).click(function () {
      const text = $(".markdown-body").last().text();
      speak(text);
    });
  }, 1500);
}

// 复制文本插件
function clickCopy() {
  $(document).on("mouseenter mouseleave", ".markdown-body", function (event) {
    var $btn;
    if (event.type === "mouseenter") {
      // 移入时的回调
      // 在这里编写相关逻辑
      var svg = $(
        '<svg t="1683197822769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2660" width="16" height="16"><path d="M857.373005 65.290005 469.604424 65.290005c-34.211173 0-62.044078 27.832905-62.044078 62.043055l0 10.340509-63.076594 0c-25.993001 0-48.228421 16.346293-57.001225 39.293935L166.626995 176.967504c-34.21015 0-62.043055 27.832905-62.043055 62.043055l0 657.655358c0 34.21015 27.832905 62.043055 62.043055 62.043055l550.115086 0c34.21015 0 62.043055-27.832905 62.043055-62.043055l0-49.634444 78.587869 0c34.21015 0 62.043055-27.832905 62.043055-62.043055L919.41606 127.33306C919.41606 93.122911 891.583155 65.290005 857.373005 65.290005zM344.483752 179.035606l194.402595 0c10.833743 0 19.646456 8.813736 19.646456 19.646456 0 10.833743-8.813736 19.646456-19.646456 19.646456L344.483752 218.328517c-10.833743 0-19.646456-8.813736-19.646456-19.646456C324.836273 187.849342 333.650009 179.035606 344.483752 179.035606zM737.423099 896.665917c0 11.402701-9.278317 20.681018-20.681018 20.681018L166.626995 917.346935c-11.403724 0-20.681018-9.278317-20.681018-20.681018L145.945977 239.010559c0-11.402701 9.277294-20.681018 20.681018-20.681018l120.111588 0c8.197706 24.02723 30.977525 41.362037 57.744145 41.362037l194.402595 0c26.767644 0 49.54644-17.334807 57.744145-41.362037l120.111588 0c11.402701 0 20.681018 9.278317 20.681018 20.681018L737.422076 896.665917zM878.054023 784.988418c0 11.402701-9.278317 20.681018-20.681018 20.681018l-78.587869 0L778.785136 239.010559c0-34.21015-27.832905-62.043055-62.043055-62.043055L595.886549 176.967504c-8.771781-22.947641-31.007201-39.293935-57.001225-39.293935l-89.963964 0L448.921359 127.33306c0-11.403724 9.278317-20.681018 20.683065-20.681018l387.768581 0c11.402701 0 20.681018 9.277294 20.681018 20.681018L878.054023 784.988418z" fill="#bfbfbf" p-id="2661"></path><path d="M620.597347 334.252737 260.748652 334.252737c-11.422144 0-20.681018 9.259898-20.681018 20.681018s9.258874 20.681018 20.681018 20.681018l359.849718 0c11.42112 0 20.681018-9.259898 20.681018-20.681018S632.018467 334.252737 620.597347 334.252737z" fill="#bfbfbf" p-id="2662"></path><path d="M620.597347 454.201619 260.748652 454.201619c-11.422144 0-20.681018 9.259898-20.681018 20.681018 0 11.42112 9.258874 20.681018 20.681018 20.681018l359.849718 0c11.42112 0 20.681018-9.259898 20.681018-20.681018C641.278365 463.46254 632.018467 454.201619 620.597347 454.201619z" fill="#bfbfbf" p-id="2663"></path><path d="M440.673511 574.151525 260.748652 574.151525c-11.422144 0-20.681018 9.259898-20.681018 20.681018 0 11.42112 9.258874 20.681018 20.681018 20.681018l179.924859 0c11.42112 0 20.681018-9.259898 20.681018-20.681018C461.35453 583.411423 452.093609 574.151525 440.673511 574.151525z" fill="#bfbfbf" p-id="2664"></path></svg>'
      );
      $btn = $("<button/>") // 创建一个 <button> 元素
        .html(svg)
        .addClass("my-btn"); // 添加一个自定义类名
      // .prepend(this); // 将按钮添加到容器中
      $(this).prepend($btn);
      // console.log("移入");
    } else {
      // 移出时的回调
      // 在这里编写相关逻辑
      $(this).find(".my-btn").remove();
      // console.log("移出");
    }
  });

  $(document).on("click", ".my-btn", function (event) {
    console.log("click-my-btn");
    let that = this;
    const markDownDom = $(this).parent();
    // $(this).remove();
    const text = markDownDom.text();
    var $temp = $("<textarea>"); // 创建一个隐藏的textarea元素
    $("body").append($temp); // 将textarea元素添加到DOM中
    $temp.val(text).select(); // 将文案内容复制到textarea元素中，并且选中
    // 有兼容问题最好是谷歌浏览器
    document.execCommand("copy"); // 执行复制操作
    $temp.remove(); // 移除textarea元素
  });
}

const boolVal = (val) => {
  return val === "false" ? false : Boolean(val);
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

// 左侧MD转PDF
function DomToPdf() {
  const { jsPDF } = jspdf;
  //使用HTML2Canvas将HTML转化为Canvas
  console.log(document.querySelector(".message-wrap"),'-----???')
  html2canvas(document.querySelector(".message-wrap"), {
    scale: 2, //调整缩放比例例如2表示2倍大小
    useCORS: true,
    allowTaint: true, //允许跨域访问图片
    logging: false,
    backgroundColor: null,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png"); //将Canvas转化为JPG图片
    const img = new Image();
    img.onload = function () {
      const pdf = new jsPDF("p", "mm", "a4"); //A4 size paper portrait
      // save the generated PDF
      pdf.setFillColor(55, 65, 81); // white color
      pdf.rect(
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
        "F"
      );
      const width = pdf.internal.pageSize.getWidth();
      const totalHeight = (img.height * width) / img.width;
      let heightLeft = totalHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, width, totalHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - (img.height * width) / img.width;
        pdf.addPage();
        pdf.setFillColor(55, 65, 81); // white color
        pdf.rect(
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight(),
          "F"
        );
        pdf.addImage(imgData, "JPEG", 0, position, width, totalHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`${new Date().getTime()}-GPT记录导出.pdf`);
    };
    img.src = imgData; //设置图片src
  });
}

// dom转md
function DomToMd() {
  var turndownService = new TurndownService();
  var markdown = turndownService.turndown(
    document.querySelector(".message-wrap")
  );
  UtilsAll().blobMd(markdown);
}

function UtilsAll() {
  return {
    blobMd: function (markdown) {
      // 创建一个Blob对象
      const blob = new Blob([markdown], {
        type: "text/plain",
      });

      // 生成下载链接
      const url = URL.createObjectURL(blob);

      // 创建一个a标签，模拟点击下载链接
      const a = document.createElement("a");
      a.href = url;
      a.download = `${new Date().getTime()}-GPT-MD-记录导出.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 释放下载链接
      URL.revokeObjectURL(url);
    },
  };
}
