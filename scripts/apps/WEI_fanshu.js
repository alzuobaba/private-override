/*
 *
 *
脚本功能：番薯小说阅读器—百万正版小说听书看书神器（解锁会员）
软件版本：2.5.76
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >番薯小说阅读器—百万正版小说听书看书神器（解锁会员）
^https?:\/\/g20.manmeng168.com\/v1\/client\/user\/completeUserInfo\? url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/fanshu.js

[mitm] 
hostname = g20.manmeng168.com

*
*
*/

"use strict";

var _0x21480d=$response["body"];var _0x4572ae=$request["url"];const _0x475872="/v1/client/user/completeUserInfo";var _0x3bf4f1;try{_0x3bf4f1=JSON["parse"](_0x21480d);if(_0x4572ae["indexOf"](_0x475872)!==-0x1){var _0x4098fe="2|1|0|4|5|3"["split"]('|'),_0x324884=0x0;while(!![]){switch(_0x4098fe[_0x324884++]){case'0':_0x3bf4f1["data"]["vip_end_time"]=0x1d8d8f773708;continue;case'1':_0x3bf4f1["data"]["vip"]=!![];continue;case'2':_0x3bf4f1["data"]["vip_type"]=0x1;continue;case'3':_0x21480d=JSON["stringify"](_0x3bf4f1);continue;case'4':_0x3bf4f1["data"]["nick"]="https://t.me/GieGie777";continue;case'5':_0x3bf4f1["data"]["avatar"]="https://zdimg.lifeweek.com.cn/app/20230410/16811146599505136.jpg";continue;}break;}}}catch(_0x884edd){console["log"]("JSON 解析错误: "+_0x884edd["message"]);}$done({'body':_0x21480d});
