/*
 *
 *
脚本功能：香蕉视频
软件版本：
下载地址：邀请码：IQ9FLO 
脚本作者：**
更新时间：2024-
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 香蕉视频++
^https?:\/\/.+\/(getGlobalData|ucp\/index).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xjsp.js
^https?:\/\/.+\/vod\/* url script-request-header https://raw.githubusercontent.com/ppmm5211/haisi/main/xjsp.js

[mitm] 
hostname = *.cqict.cn,cwt98ehs.cqict.cn


*
*
*/

"use strict";

var _0x3b9670=$response["body"];var _0x3af3dd=$request["url"];var _0x4ebaa9=JSON["parse"](_0x3b9670);const _0x5054c3="/ucp/index";const _0x577ab1="/getGlobalData";
