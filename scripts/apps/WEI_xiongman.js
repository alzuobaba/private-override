/*
 *
 *
脚本功能：漫熊（美区商店下载）
软件版本：6.5
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >漫熊（美区商店下载）
^https?:\/\/cb.uvogin.xyz\/(auth\/getUserByUserid|comic\/getComicDetialByid) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/manxiong.js

[mitm] 
hostname = cb.uvogin.xyz

*
*
*/

"use strict";

var _0xb6bede=$response["body"];var _0x2c3580=$request["url"];const _0x269d9d="/auth/getUserByUserid";const _0x33e61f="/comic/getComicDetialByid";if(typeof _0xb6bede==="string"){if(_0x2c3580["indexOf"](_0x33e61f)!==-0x1){_0xb6bede=_0xb6bede["replace"](/lock":\w+/g,"lock\":false");}var _0x231186;try{_0x231186=JSON["parse"](_0xb6bede);if(_0x2c3580["indexOf"](_0x269d9d)!==-0x1){var _0x74b82c="4|2|6|0|3|5|1"["split"]('|'),_0xa17682=0x0;while(!![]){switch(_0x74b82c[_0xa17682++]){case'0':_0x231186["message"]["no_ad_time"]=0x1d8d8f773708;continue;case'1':_0xb6bede=JSON["stringify"](_0x231186);continue;case'2':_0x231186["message"]["user_headimg"]="https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg";continue;case'3':_0x231186["message"]["card_num"]=0xf41c8;continue;case'4':_0x231186["message"]["user_nickname"]="https://t.me/GieGie777";continue;case'5':_0x231186["message"]["level"]=0x5;continue;case'6':_0x231186["message"]["vip_time"]=0x1d8d8f773708;continue;}break;}}}catch(_0x5758ab){console["log"]("JSON 解析错误: "+_0x5758ab["message"]);}}$done({'body':_0xb6bede});
