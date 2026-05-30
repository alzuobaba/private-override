var body = JSON.parse($response.body);
var url = $request.url;

if (url.indexOf("/adV2") !== -1) {
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
}

if (url.indexOf("/adTurnChapter") !== -1) {
  if (body.data) {
    body.data.adFreeVideo = {
      "status": 1,
      "freeChapterNum": 999,
      "freeTime": 999999
    };
  }
}

if (url.indexOf("/commodityInfoV3") !== -1) {
  if (body.data && body.data.play && body.data.play.monthlyInfo) {
    body.data.play.monthlyInfo.forEach(function(item) {
      item.money = 0;
      item.sdou = 0;
      item.lowestPrice = 0;
    });
  }
}

$done({ body: JSON.stringify(body) });
