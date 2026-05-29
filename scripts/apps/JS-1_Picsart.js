/*************************************

项目名称：Picsart 解锁Gold
更新日期：2024-09-16
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[Script]
http-response ^https://api.(meiease|picsart).(cn|com)/gw-v2/shop/subscription/apple/purchases script-path=https://raw.githubusercontent.com/wangyuyan666/Doumu/main/Js/Picsart.js, requires-body=true, timeout=60, tag=Picsart

[MITM]
hostname = api.meiease.*, api.picsart.*

*************************************/
"use strict"
console.log($script.name)



var body = $response.body;
var obj = JSON.parse(body);

obj = {
  "status" : "success",
  "response" : [
    {
      "status" : "SUBSCRIPTION_PURCHASED",
      "order_id" : "210001770182151",
      "original_order_id" : "210001514424729",
      "is_trial" : false,
      "plan_meta" : {
        "storage_limit_in_mb" : 512000,
        "frequency" : "yearly",
        "scope_id" : "full",
        "id" : "com.picsart.studio.subscription_plus_tier_yearly",
        "product_id" : "subscription_plus_tier_yearly",
        "level" : 1000,
        "auto_renew_product_id" : "com.picsart.studio.subscription_plus_tier_yearly",
        "type" : "renewable",
        "permissions" : [
          "premium_tools_standard"
        ],
        "description" : "",
        "tier_id" : "plus"
      },
      "limitation" : {
        "max_count" : 5,
        "limits_exceeded" : false
      },
      "reason" : "ok",
      "subscription_id" : "com.picsart.studio.subscription_plus_tier_yearly",
      "is_eligible_for_introductory" : false,
      "purchase_date" : 1715695156000,
      "expire_date" : 1872518379000
    }
  ]
}


body = JSON.stringify(obj);
$done({body});
