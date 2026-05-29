/*************************************

# Filmr:视频剪辑 解锁 PRO
# 测试版本v7.6.18
# @Marol62926
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
# > Filmr-视频剪辑 解锁 PRO
https://payments.invideo.io/verify_purchase url script-response-body https://raw.githubusercontent.com/Marol62926/MarScrpt/main/filmr.js
https://payments.invideo.io/subscription url script-response-body https://raw.githubusercontent.com/Marol62926/MarScrpt/main/filmr.js

[mitm]
hostname = payments.invideo.io

*************************************/
"use strict"
console.log($script.name)



var body = $response.body; 
var obj = JSON.parse(body); 

obj = {
  "purchase_id": "480000515251249",
  "purchase_date": "2022-04-16T11:27:44Z",
  "next_renewal_date": "2099-04-19T11:27:43Z",
  "title": "FILMR PRO",
  "current_payment_source": "mobile",
  "show_next_renewal_date": true,
  "duration": "YEARLY",
  "plan": "FILMR_PRO",
  "upgrade_details": {
    "action_available": true,
    "action_title": "Upgrade to Desktop Plan",
    "upgradeable_plan_ids": [1]
  },
  "includes_access_to": ["Filmr Pro"],
  "is_iap_linked": true,
  "status": "ACTIVE",
  "is_free_user": false
}


body = JSON.stringify(obj);
$done({body});
