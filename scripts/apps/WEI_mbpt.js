/*
 *
 *
脚本功能：面包拼图（永久会员）
软件版本：1.0.9
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >面包拼图（永久会员）
^https?:\/\/bread28resapi.wscreativity.com\/v2\/(purchase\/vip\/verification|user\/profile) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/mbpt.js

[mitm] 
hostname = bread28resapi.wscreativity.com
*
*
*/

"use strict";

if($request["url"]["includes"]("/v2/user/profile")){let _0x40d66f=JSON["parse"]($response["body"]);Object["assign"](_0x40d66f["data"],{'nickname':"t.me/GieGie777",'headImg':"https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg"});$done({'body':JSON["stringify"](_0x40d66f)});}else if($request["url"]["includes"]("/v2/purchase/vip/verification")){let _0x367965=JSON["parse"]($response["body"]);Object["assign"](_0x367965["data"],{'isValid':0x1,'expiredTs':0x790c89135,'vipType':0x1});$done({'body':JSON["stringify"](_0x367965)});}
