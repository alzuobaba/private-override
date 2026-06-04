/*
 *
 *
脚本功能：柠檬小剧场 Unlock VIP剧
软件版本：1.3.3
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >柠檬小剧场 Unlock VIP剧
^https?:\/\/(videohub.xdplt|mv-ps.xdplt).com\/api\/v1\/(short\/play|user\/info|payment\/apple\/pay\/verify\/info) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/nmxjc.js


[mitm]
hostname = mv-ps.xdplt.com,videohub.xdplt.com

*
*
*/

"use strict";

var _0x103da5=$response["body"];var _0x5c470b=$request["url"];const _0x25935a="/api/v1/user/info/";
