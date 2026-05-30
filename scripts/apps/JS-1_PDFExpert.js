/*************************************

项目名称：PDF Expert
脚本作者：alzuobaba

*************************************/
"use strict"

var body = JSON.parse($response.body);

var proEntitlements = [
  "macos.pe.pro",
  "macos.pe.pdf-editor",
  "macos.pe.convert",
  "macos.pe.ocr",
  "macos.pe.scan",
  "macos.pe.fill-sign",
  "macos.pe.ai-features",
  "macos.pe.export"
];

body.inAppStates.push({
  "entitlements": proEntitlements,
  "type": "subscription",
  "productId": "pdfexpert-pro-yearly",
  "state": "active",
  "originalPurchaseDate": "2022-09-09T09:09:09Z",
  "purchaseDate": "2022-09-09T09:09:09Z",
  "expirationDate": "2099-09-09T09:09:09Z"
});

$done({ body: JSON.stringify(body) });
