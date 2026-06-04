/*
 *
 *
脚本功能：配音师-文字转语音助手
软件版本：4.1.1
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >配音师-文字转语音助手 Unlock VIP+配音课
^http:\/\/(dubbing.csweimei.cn\/course\/GetCourseInfo?|music.dreamyin.cn\/Svip\/SVIP_Existence.aspx) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/peiyinshi.js


[mitm]
hostname = 

*
*
*/

"use strict";

var _0x1e033b=$response["body"];var _0x3b8429=$request["url"];const _0x1656b="/Svip/SVIP_Existence.aspx";const _0x530257="/course/GetCourseInfo?";if(typeof _0x1e033b==="string"){if(_0x3b8429["indexOf"](_0x530257)!==-0x1){_0x1e033b=_0x1e033b["replace"](/"isprice":\d/g,"\"isprice\" :0");}var _0x2843a1;try{_0x2843a1=JSON["parse"](_0x1e033b);if(_0x3b8429["indexOf"](_0x1656b)!==-0x1){_0x2843a1["Code"]["SVIP_ID"]="One Year Vip";_0x2843a1["Code"]["Cre_Datetime"]="2024-11-11 11:11:11";_0x2843a1["Code"]["Due_Datetime"]="9999-11-11 11:11:11";_0x1e033b=JSON["stringify"](_0x2843a1);}}catch(_0x4174f9){console["log"]("JSON 解析错误: "+_0x4174f9["message"]);}}$done({'body':_0x1e033b});
