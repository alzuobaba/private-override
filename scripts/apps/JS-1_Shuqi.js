/*************************************

项目名称：书旗小说
脚本作者：alzuobaba

*************************************/
"use strict"

console.log($script.name + ": triggered");
console.log($script.name + ": URL = " + $request.url);

var url = $request.url;
var body = JSON.parse($response.body);

if (url.indexOf("/adV2") !== -1) {
  console.log($script.name + ": handling adV2 - 去除阅读页广告");
  if (body.data) {
    if (body.data.middle) {
      body.data.middle.isShowAd = 0;
      body.data.middle.freeAdTime = 999999;
      body.data.middle.showTailForceAd = 0;
      body.data.middle.showRule = "0";
    }
    if (body.data.userInfo) {
      body.data.userInfo.userFreeAdTime = 999999;
    }
  }
  console.log($script.name + ": ads disabled");
}

if (url.indexOf("/adTurnChapter") !== -1) {
  console.log($script.name + ": handling adTurnChapter - 跳过看广告解锁");
  if (body.data) {
    body.data.adFreeVideo = {
      "status": 1,
      "freeChapterNum": 999,
      "freeTime": 999999
    };
  }
  console.log($script.name + ": ad turn chapter bypassed");
}

if (url.indexOf("/commodityInfoV3") !== -1) {
  console.log($script.name + ": handling commodityInfoV3 - VIP信息");
  if (body.data && body.data.play && body.data.play.monthlyInfo) {
    body.data.play.monthlyInfo.forEach(function(item) {
      item.money = 0;
      item.sdou = 0;
      item.lowestPrice = 0;
    });
  }
  console.log($script.name + ": VIP pricing modified");
}

$done({ body: JSON.stringify(body) });
