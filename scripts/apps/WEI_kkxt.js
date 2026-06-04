/*
 *
 *
脚本功能：可可修图（永久会员）
软件版本：1.3.1
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >可可修图（永久会员）
^https?:\/\/cocamapi.imendon.com\/v2\/(purchase\/(vip\/verification|receipt\/verify)|user\/profile) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/kkxt.js

[mitm] 
hostname = cocamapi.imendon.com

*
*
*/

"use strict";

var _0x4e8cda=$response["body"];var _0x30f785=$request["url"];const _0x4ff73b="cocamapi.imendon.com";const _0x35042c="/v2/user/profile";
