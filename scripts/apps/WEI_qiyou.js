/*
 *
 *
脚本功能：奇游手游加速器
软件版本：3.5.4
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >奇游手游加速器
^https?:\/\/api.qiyou.cn\/api\/common_bll\/.+\/(member\/login_status|members).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/qiyou.js
^https?://api\.qiyou\.cn/api/common_bll/v1/client_advertisements url reject
^https?://api\.qiyou\.cn/api/common_bll/adv url reject-dict
[mitm]
hostname = api.qiyou.cn,apifast.qiyou.cn

*
*
*/

"use strict";

var _0x2488f7=$response["body"];var _0x40cba4=$request["url"];const _0x45aaab="/common_bll/v1/members/";const _0x418703="/common_bll/v4/member/login_status";if(typeof _0x2488f7==="string"){if(_0x40cba4["indexOf"](_0x45aaab)!==-0x1){_0x2488f7=_0x2488f7["replace"](/.+/g,"{\"rn_info\":{\"check_real_name_source\":\"CERT_NO\"},\"nickname\":\"https://t.me/GieGie777\"}");}var _0x13d0a6;try{_0x13d0a6=JSON["parse"](_0x2488f7);if(_0x40cba4["indexOf"](_0x418703)!=0x1){for(var _0x2c6e2b=0x0;_0x2c6e2b<_0x13d0a6["member"]["accounts"]["length"];_0x2c6e2b++){_0x13d0a6["member"]["accounts"][_0x2c6e2b]["duration_type"]="MONTH";_0x13d0a6["member"]["accounts"][_0x2c6e2b]["amount"]=0x790c89135;_0x13d0a6["member"]["accounts"][_0x2c6e2b]["account_status"]="VALID";}_0x2488f7=JSON["stringify"](_0x13d0a6);}}catch(_0x4e58dc){console["log"]("JSON 解析错误: "+_0x4e58dc["message"]);}}$done({'body':_0x2488f7});
