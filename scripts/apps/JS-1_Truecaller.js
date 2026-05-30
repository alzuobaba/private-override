/*************************************

项目名称：Truecaller
脚本作者：SubTek

*************************************/
"use strict"

var features = [
  { id: "siri_search", rank: 1, status: "Included" },
  { id: "no_ads", rank: 2, status: "Included" },
  { id: "spam_blocking", rank: -2147483648, status: "Included" },
  { id: "extended_spam_blocking", rank: 3, status: "Included" },
  { id: "caller_id", rank: -2147483648, status: "Included" },
  { id: "who_viewed_my_profile", rank: 9, status: "Included" },
  { id: "incognito_mode", rank: 11, status: "Included" },
  { id: "premium_badge", rank: 15, status: "Included" },
  { id: "premium_support", rank: 16, status: "Included" },
  { id: "premium_app_icon", rank: 19, status: "Included" },
  { id: "gold_caller_id", rank: 20, status: "Included" }
];
var obj;

if (/subscriptions\/status/.test($request.url)) {
  obj = {
    expire: "2099-12-31T01:01:01Z",
    start: "2025-01-01T02:32:04Z",
    paymentProvider: "Apple",
    isExpired: false,
    isGracePeriodExpired: false,
    subscriptionStatus: "INITIAL_BUY",
    inAppPurchaseAllowed: true,
    product: {
      id: "renewable.gold.annual",
      sku: "renewable.gold.annual",
      contentType: "subscription",
      productType: "GoldYearly",
      isFreeTrial: true
    },
    tier: { id: "gold", feature: features }
  };
}

if (/products\/apple/.test($request.url)) {
  obj = {
    "tier": [
      {
        "id": "gold",
        "product": [
          {
            "productType": "GoldYearly",
            "id": "renewable.gold.annual",
            "sku": "renewable.gold.annual",
            "contentType": "subscription",
            "rank": 6,
            "paymentProvider": "Apple",
            "clientProductMetadata": {
              "selectionRank": 5,
              "displayOrder": 5,
              "isEntitledPremiumScreenProduct": false
            }
          }
        ],
        "feature": features,
        "rank": 5
      }
    ]
  };
}

$done({ body: JSON.stringify(obj) });
