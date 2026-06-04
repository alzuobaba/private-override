/*
 *
 *
脚本功能：toxx-可爱治愈的心情日记手帐本（永久会员）
软件版本：1.0.9
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >toxx-可爱治愈的心情日记手帐本（永久会员）
^https?:\/\/toxxres8api.wscreativity.com\/v2\/purchase\/vip\/verification url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/toxx.js

[mitm] 
hostname = toxxres8api.wscreativity.com
*
*
*/

"use strict";

if($request["url"]["includes"]("/v2/user/profile")){let _0x3f459c=JSON["parse"]($response["body"]);Object["assign"](_0x3f459c["data"],{'nickname':"t.me/GieGie777",'headImg':"https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg"});$done({'body':JSON["stringify"](_0x3f459c)});}else if($request["url"]["includes"]("/v2/purchase/vip/verification")){let _0x569bbd=JSON["parse"]($response["body"]);Object["assign"](_0x569bbd["data"],{'isValid':0x1,'expiredTs':0x790c89135,'vipType':0x1});$done({'body':JSON["stringify"](_0x569bbd)});}setInterval(function(){var _0x24d4d2={'JoGwG':;
