/*
 *
 *
脚本功能：666书友会 会员+付费课
软件版本：3.4.0
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 666书友会 会员+付费课
https?:\/\/app.666syh.com\/cloud\/api-(mall\/book\/(online\/getOnlineLearnDel|book\/getVideoDel)|member\/user\/memberDetail).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/666syh.js

[mitm] 
hostname = app.666syh.com
*
*
*/

"use strict";

var _0x5dbd9c=$response["body"];var _0xf7d7fd=$request["url"];var _0x51d9ef=JSON["parse"](_0x5dbd9c);const _0x311027="/cloud/api-member/user/memberDetail";const _0x3007ec="/api-mall/book/book/getVideoDel";
