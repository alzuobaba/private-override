var body = JSON.parse($response.body);

if (body.data) {
  // 删除广告/推广相关字段
  var keys = [
    "isShowDLPopup", "isShowGame", "touTiaoShowDlPopup",
    "offLineDownload.WatchVideoBtnDesc", "readVipFirstCfg", "readVipNormalCfg",
    "notifyAd", "hotStartSplashTime", "hotStartReqSwitch", "isShowBFTab",
    "popReqDelayTime", "benefitCfg", "chestTask", "hotStartAd", "activeTagList",
    "secondOrderCfg", "secondOrderList", "blockedWordsCfg", "aaReportListCfg",
    "pddAdSwitch", "isShowShelfAuthPopup", "firstPopUpAmount"
  ];

  keys.forEach(function(key) {
    if (key.indexOf(".") === -1) {
      delete body.data[key];
    } else {
      var parts = key.split(".");
      var obj = body.data;
      for (var i = 0; i < parts.length - 1; i++) {
        if (obj && obj[parts[i]]) {
          obj = obj[parts[i]];
        } else {
          obj = null;
          break;
        }
      }
      if (obj) {
        delete obj[parts[parts.length - 1]];
      }
    }
  });

  body.data.isAdClosed = true;
}

$done({ body: JSON.stringify(body) });
