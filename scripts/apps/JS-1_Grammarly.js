/*************************************

项目名称：Grammarly
脚本作者：SubTek

*************************************/
"use strict"

var objc = {
  "isPremium": true,
  "nextPayDate": "Oct 28, 2999 4:56:52 AM",
  "isCancelled": false,
  "isDunning": false,
  "isPaymentMethodFailed": false,
  "isFree": false,
  "canCancelPlanSwitch": false,
  "isFreebie": false,
  "isPremiumConversion": true,
  "isLegacyPayPal": false,
  "isOnTrial": false,
  "currentPlan": {
    "id": 1005,
    "regularPlanId": 1005,
    "title": "Annual",
    "description": "1-year Grammarly Subscription",
    "regularPrice": 144.0,
    "regularPriceMoney": { "currency": "USD", "value": 144.0 },
    "price": 144.0,
    "priceMoney": { "currency": "USD", "value": 144.0 },
    "periodMonths": 12,
    "hasTrial": false,
    "trialDays": 0,
    "firstThreeMonthsPromo": 0,
    "baseInstitutionCampaign": false
  },
  "isAppleSubscription": false,
  "isGooglePlaySubscription": false,
  "customerSince": "Aug 27, 2020 8:11:05 PM",
  "lastSubscribedDate": "Oct 20, 2021 4:56:55 AM",
  "state": "DEFAULT"
};

$done({ body: JSON.stringify(objc) });
