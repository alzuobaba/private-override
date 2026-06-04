/*
 *
 *
脚本功能：为你读诗pro
软件版本：1.5.6
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 为你读诗pro
^^https?:\/\/app.thepoemforyou.com\/api\/v1\/(getProgramList|getUserInfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/weinidushi.js

[mitm]
hostname = app.thepoemforyou.com
*
*
*/

"use strict";

var _0x56f1f9=$response["body"];
