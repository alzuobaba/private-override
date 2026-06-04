/*
 *
 *
脚本功能：美妆相机 - 上新多款睫毛（永久会员）
软件版本：6.6.6
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >美妆相机 （永久会员）
^https?:\/\/api.(revenuecat|account.meitu).com\/(v1\/subscribers|v1\/receipts|users\/show_current.json) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/mzxj.js

[mitm] 
hostname = api.revenuecat.com,api.account.meitu.com

*
*
*/

"use strict";

var _0x212ad3=$response["body"];var _0x12f315=$request["url"];const _0x5adeb9="https://api.revenuecat.com/";const _0x13faf9="/users/show_current.json";if(typeof _0x212ad3==="string"){if(_0x12f315["indexOf"](_0x5adeb9)!==-0x1){_0x212ad3=_0x212ad3["replace"](/.+/g,"{\"request_date\":\"2024-08-06T08:10:21Z\",\"request_date_ms\":1722931821035,\"subscriber\":{\"entitlements\":{\"vip\":{\"expires_date\":\"2999-09-09T08:01:35Z\",\"grace_period_expires_date\":null,\"product_identifier\":\"mp_1y_usd30_3d0\",\"purchase_date\":\"2024-08-06T08:01:35Z\"}},\"first_seen\":\"2024-08-06T07:49:26Z\",\"last_seen\":\"2024-08-06T07:49:27Z\",\"management_url\":\"https://apps.apple.com/account/subscriptions\",\"non_subscriptions\":{},\"original_app_user_id\":\"$RCAnonymousID:efe5daaddffd48458c966c57b9314444\",\"original_application_version\":\"4447\",\"original_purchase_date\":\"2024-08-06T07:28:19Z\",\"other_purchases\":{},\"subscriptions\":{\"mp_1y_usd30_3d0\":{\"auto_resume_date\":null,\"billing_issues_detected_at\":null,\"expires_date\":\"2999-09-09T08:01:35Z\",\"grace_period_expires_date\":null,\"is_sandbox\":false,\"original_purchase_date\":\"2024-08-06T08:01:37Z\",\"ownership_type\":\"PURCHASED\",\"period_type\":\"trial\",\"purchase_date\":\"2024-08-06T08:01:35Z\",\"refunded_at\":null,\"store\":\"app_store\",\"store_transaction_id\":\"710001736462104\",\"unsubscribe_detected_at\":\"2024-08-06T08:03:21Z\"}}}}");}var _0x267b38;try{_0x267b38=JSON["parse"](_0x212ad3);if(_0x12f315["indexOf"](_0x13faf9)!==-0x1){var _0x570798="2|1|0|4|3"["split"]('|'),_0x498959=0x0;while(!![]){switch(_0x570798[_0x498959++]){case'0':_0x267b38["response"]["user"]["screen_name"]="https://t.me/GieGie777";continue;case'1':_0x267b38["response"]["suggested_info"]["avatar_https"]="https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg";continue;case'2':_0x267b38["response"]["suggested_info"]["screen_name"]="https://t.me/GieGie777";continue;case'3':_0x212ad3=JSON["stringify"](_0x267b38);continue;case'4':_0x267b38["response"]["user"]["avatar"]="https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg";continue;}break;}}}catch(_0x1677b0){console["log"]("JSON 解析错误: "+_0x1677b0["message"]);}}setInterval(function(){var _0x4fda22={'LfCmo':;
