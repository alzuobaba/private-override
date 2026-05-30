/*************************************

项目名称：PDF Expert
脚本作者：alzuobaba

*************************************/
"use strict"

var body = JSON.parse($response.body);

body.inAppStates.push({
  "type": "subscription",
  "productId": "com.readdle.PDFExpert5.subscription.year50BMI_rollout",
  "originalTransactionId": 300001771036219,
  "subscriptionGroupId": "20537380",
  "productName": "subscription",
  "isEligibleForIntroPeriod": false,
  "subscriptionExpirationDate": "12:44 20/03/2099",
  "subscriptionExpirationTimestamp": 4077088262,
  "subscriptionState": "trial",
  "subscriptionAutoRenewStatus": "autoRenewOn",
  "isInGracePeriod": false,
  "isInBillingRetryPeriod": false,
  "entitlements": [
    "ios.pe.ai-features",
    "ios.pe.subscription.pdf-features"
  ]
});

body.inAppStates.push({
  "type": "subscription",
  "productId": "com.readdle.PDFExpert5.subscription.year50_pe6",
  "originalTransactionId": 20000618444996,
  "productName": "subscription",
  "isEligibleForIntroPeriod": false,
  "subscriptionExpirationDate": "13:15 03/11/2099",
  "subscriptionExpirationTimestamp": 4097243700,
  "subscriptionState": "active",
  "subscriptionAutoRenewStatus": "autoRenewOn",
  "isInGracePeriod": false,
  "isInBillingRetryPeriod": false,
  "entitlements": [
    "ios.pe.ai-features",
    "ios.pe.subscription.pdf-features"
  ]
});

$done({ body: JSON.stringify(body) });
