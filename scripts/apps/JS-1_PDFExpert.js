/*************************************

项目名称：PDF Expert
脚本作者：alzuobaba

*************************************/
"use strict"

console.log($script.name + ": triggered");
console.log($script.name + ": URL = " + $request.url);

var url = $request.url;
var body = JSON.parse($response.body);

if (url.indexOf('/verifyReceipt') !== -1) {
  console.log($script.name + ": handling verifyReceipt");
  var now = Math.floor(Date.now() / 1000);
  var future = now + 315360000;
  var entry = {
    "quantity": "1",
    "product_id": "com.readdle.PDFExpert5.subscription.year50BMI_rollout",
    "transaction_id": "200000" + Math.random().toString().slice(2, 17),
    "original_transaction_id": "200000" + Math.random().toString().slice(2, 17),
    "purchase_date": new Date(now * 1000).toISOString(),
    "purchase_date_ms": (now * 1000).toString(),
    "purchase_date_pst": new Date(now * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    "original_purchase_date": "2022-09-09 09:09:09 America/Los_Angeles",
    "original_purchase_date_ms": "1662728949000",
    "original_purchase_date_pst": "2022-09-09 09:09:09 America/Los_Angeles",
    "expires_date": new Date(future * 1000).toISOString(),
    "expires_date_ms": (future * 1000).toString(),
    "expires_date_pst": new Date(future * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    "web_order_line_item_id": "200000" + Math.random().toString().slice(2, 17),
    "is_trial_period": "false",
    "is_in_intro_offer_period": "false",
    "in_app_ownership_type": "PURCHASED"
  };
  if (!body.latest_receipt_info) body.latest_receipt_info = [];
  if (!body.receipt) body.receipt = {};
  if (!body.receipt.in_app) body.receipt.in_app = [];
  body.latest_receipt_info.push(entry);
  body.receipt.in_app.push(entry);
  console.log($script.name + ": injected receipt for " + entry.product_id);
} else {
  console.log($script.name + ": handling subscription/refresh");
  body.inAppStates = [{
    "type": "subscription",
    "productId": "com.readdle.PDFExpert5.subscription.year50BMI_rollout",
    "originalTransactionId": 300001771036219,
    "subscriptionGroupId": "20537380",
    "productName": "subscription",
    "isEligibleForIntroPeriod": false,
    "subscriptionExpirationDate": "12:44 20/03/2099",
    "subscriptionExpirationTimestamp": 4077088262,
    "subscriptionState": "active",
    "subscriptionAutoRenewStatus": "autoRenewOn",
    "isInGracePeriod": false,
    "isInBillingRetryPeriod": false,
    "entitlements": [
      "ios.pe.ai-features",
      "ios.pe.subscription.pdf-features"
    ]
  }];
  console.log($script.name + ": replaced inAppStates with subscription entry");
}

$done({ body: JSON.stringify(body) });
