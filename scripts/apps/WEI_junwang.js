/*
 *
 *
脚本功能：恢复购买会员
软件版本：++++
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >新鲜壁纸-最美炫酷动图&游戏二次元主题（恢复购买）
# >水印大师-搬运素材&ai抠图&物体擦除（恢复购买）
# >资源搬运大师-短视频&图片（恢复购买）
# >水印熊-视频提取&一键水印&下载助手（恢复购买）
# >萌客ai绘画-贴纸&动漫卡通（恢复购买）
^https?:\/\/api.revenuecat.com\/v1\/receipts url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/junwang.js

[mitm] 
hostname = api.revenuecat.com
*
*
*/

"use strict";

var body=$response["body"];let obj=JSON["parse"]($response["body"]);obj={'request_date_ms':0x1916a9244fd,'request_date':"2024-08-19T12:17:36Z",'subscriber':{'non_subscriptions':{},'first_seen':"2024-08-19T12:14:29Z",'original_application_version':'877','other_purchases':{},'management_url':"https://apps.apple.com/account/subscriptions",'subscriptions':{'app.steps.stepsapp.premium.yearTrial.tier1':{'original_purchase_date':"2024-08-19T12:15:44Z",'expires_date':"2999-09-09T12:09:09Z",'is_sandbox':![],'refunded_at':null,'store_transaction_id':'710001752733822','unsubscribe_detected_at':null,'grace_period_expires_date':null,'period_type':"trial",'purchase_date':'2024-08-19T12:15:43Z','billing_issues_detected_at':null,'ownership_type':'PURCHASED','store':"app_store",'auto_resume_date':null}},'entitlements':{'stepsapp_pedometer_premium_1_year':{'grace_period_expires_date':null,'purchase_date':"2024-08-19T12:15:43Z",'product_identifier':"app.steps.stepsapp.premium.yearTrial.tier1",'expires_date':"2999-09-09T09:09:09Z"}},'original_purchase_date':"2024-08-19T12:15:44Z",'original_app_user_id':"$RCAnonymousID:47dc2a425f0e4ef2b0bf980e859e1111",'last_seen':'2024-08-19T12:14:29Z'}};$done({'body':JSON["stringify"](obj)});
