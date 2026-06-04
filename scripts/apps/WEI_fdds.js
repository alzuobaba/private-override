/*
 *
 *
脚本功能：帆书-原樊登读书 解锁樊登讲书+课程+电子书
软件版本：6.7.1
下载地址：
脚本作者：
更新时间：2024+
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 帆书-原樊登读书 解锁樊登讲书+课程
^https?:\/\/.+dushu365.com\/(sns-orchestration-system\/homePage\/api\/v100\/myPage|smart-orch\/program|smart-orch\/course\/v100\/info|innovation-orchestration\/api\/ebook\/v100\/ebookInfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/fdds.js
^https?:\/\/.+dushu365.com\/resource-orchestration-system\/book\/v101\/content url script-request-body https://raw.githubusercontent.com/WeiGiegie/666/main/fdtk.js


[mitm]
hostname = *.dushu365.com,gw2.dushu365.com,gw1.dushu365.com

*
*
*/

"use strict";

let _0x27d916=$request["url"];let _0x152fa8=$response["body"];let _0x5c2d3b=_0x234ad0(_0x152fa8);let _0x57889c=new Uint8Array(_0x5c2d3b["length"]);
