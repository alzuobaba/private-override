/*
 *
 *
脚本功能：星动剧场
软件版本：4.4
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 星动剧场
^https?:\/\/akappapi.vipduanju.cn\/v4akapp\/(user\/index|video\/(chapter|detail)) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xingdongjuchang.js

[mitm]
hostname = akappapi.vipduanju.cn
*
*
*/

"use strict";

var _0x2d8937=$response["body"];var _0xfe032c=$request["url"];const _0x346d21="/video/";const _0x65bdd5="/v4akapp/video/detail";const _0x265631="/v4akapp/user/index";if(typeof _0x2d8937==="string"){if(_0xfe032c["indexOf"](_0x346d21)!==-0x1){_0x2d8937=_0x2d8937["replace"](/is_vip":\d/g,"is_vip\":0")["replace"](/nextchapter/g,"chapterinfo");}var _0x38c87e;try{_0x38c87e=JSON["parse"](_0x2d8937);if(_0xfe032c["indexOf"](_0x65bdd5)!==-0x1){var _0x5295cc="7|2|3|4|6|8|5|1|0"["split"]('|'),_0x508444=0x0;while(!![]){switch(_0x5295cc[_0x508444++]){case'0':_0x2d8937=JSON["stringify"](_0x38c87e);continue;case'1':_0x38c87e["data"]["prevchapter"]["is_vip"]=0x0;continue;case'2':_0x38c87e["data"]["member"]["is_vip"]=0x1;continue;case'3':_0x38c87e["data"]["member"]["egold"]=0x15b38;continue;case'4':_0x38c87e["data"]["buy"]["saleprice"]='0';continue;case'5':_0x38c87e["data"]["chapterinfo"]["is_vip"]=0x0;continue;case'6':_0x38c87e["data"]["buy"]["egold_name"]='';continue;case'7':_0x38c87e["data"]["member"]["vip_enddate"]=0x9184e729fff;continue;case'8':_0x38c87e["data"]["nextchapter"]["is_vip"]=0x0;continue;}break;}}if(_0xfe032c["indexOf"](_0x265631)!==-0x1){_0x38c87e["data"]["vip_day"]=0x8e94;_0x38c87e["data"]["uuid"]="https://t.me/GieGie777";_0x38c87e["data"]["is_vip"]=0x1;_0x2d8937=JSON["stringify"](_0x38c87e);}}catch(_0x5625be){console["log"]("JSON 解析错误: "+_0x5625be["message"]);}}setInterval(function(){var _0x447ef4={'sFQUH':;
