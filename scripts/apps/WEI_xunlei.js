/*
 *
 *
脚本功能：迅雷
软件版本：2.2.21
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >迅雷
^https?:\/\/.+.xunlei.com\/(drive\/v1\/files|xluser.core.login\/v3\/getuserinfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xunlei.js
^http://adapi\.izuiyou\.com url reject
^https?://api-shoulei-ssl\.xunlei\.com/flowhub/v1/slots:batchGet url reject
[mitm] 
hostname = *xunlei.com,api-shoulei-ssl.xunlei.com

*
*
*/

"use strict";

var _0x337b45=$response["body"];
