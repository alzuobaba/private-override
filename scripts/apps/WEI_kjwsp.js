/*
 *
 *
脚本功能：看鉴微视频-纪录片和短视频社区 
软件版本：9.4.9
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >看鉴微视频-纪录片和短视频社区
^https?:\/\/api.wokanjian.com.cn\/ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/kjwsp.js

[mitm]
hostname = api.wokanjian.com.cn
*
*
*/

"use strict";

var _0x108076=$response["body"];var _0x6e8a19=$request["url"];const _0x53d87c="api.wokanjian.com.cn/";const _0x1fdc5c="/au/findIWUserInfoById.do";if(typeof _0x108076==="string"){if(_0x6e8a19["indexOf"](_0x53d87c)!==-0x1){_0x108076=_0x108076["replace"](/viptype":\d/g,"viptype\":1")["replace"](/isVIP":\d/g,"isVIP\":1")["replace"](/vipStatus":\d/g,"vipStatus\":1")["replace"](/isBuy":\d/g,"isBuy\":1");}var _0x450b06;try{_0x450b06=JSON["parse"](_0x108076);if(_0x6e8a19["indexOf"](_0x1fdc5c)!==-0x1){var _0x42c3a9="0|1|4|3|2"["split"]('|'),_0x2ef5c8=0x0;while(!![]){switch(_0x42c3a9[_0x2ef5c8++]){case'0':_0x450b06["iwUserInfo"]["viptype"]=0x1;continue;case'1':_0x450b06["iwUserInfo"]["isVIP"]=0x1;continue;case'2':_0x108076=JSON["stringify"](_0x450b06);continue;case'3':_0x450b06["iwUserInfo"]["username"]="https://t.me/GieGie777";continue;case'4':_0x450b06["iwUserInfo"]["vipStatus"]=0x1;continue;}break;}}}catch(_0x2dc0de){console["log"]("JSON 解析错误: "+_0x2dc0de["message"]);}}$done({'body':_0x108076});
