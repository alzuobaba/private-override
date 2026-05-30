/*************************************

项目名称：PDF Expert
脚本作者：alzuobaba

*************************************/
"use strict"

var body = JSON.parse($response.body);

body.inAppStates[0].entitlements = [
  "ios.pe.ai-features",
  "ios.pe.subscription.pdf-features"
];
body.inAppStates[0].productId = "com.readdle.PDFExpert5.subscription.year50BMI_rollout";

$done({ body: JSON.stringify(body) });
