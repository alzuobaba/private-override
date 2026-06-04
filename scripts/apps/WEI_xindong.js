/*
 *
 *
脚本功能：心动短剧-全网热门短剧海量小视频app
软件版本：1.4.17
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >心动短剧-全网热门短剧海量小视频app
^https?:\/\/dj.vjread.com\/m2\/(video\/episodesV2\?episodeId|user\/register) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xindong.js
[mitm] 

hostname = dj.vjread.com

*
*
*/

"use strict";

var _0x2d16e8=$response["body"];var _0x1cb3ba=$request["url"];const _0x274085="/m2/user/register";const _0x4ecd49="/m2/video/episodesV2?episodeId";if(typeof _0x2d16e8==="string"){if(_0x1cb3ba["indexOf"](_0x4ecd49)!==-0x1){_0x2d16e8=_0x2d16e8["replace"](/"lock":\d/g,"\"lock\":0");}var _0x3ccce0;try{_0x3ccce0=JSON["parse"](_0x2d16e8);if(_0x1cb3ba["indexOf"](_0x274085)!==-0x1){var _0x5150c7="3|1|2|0|4"["split"]('|'),_0x150f0b=0x0;while(!![]){switch(_0x5150c7[_0x150f0b++]){case'0':_0x3ccce0["data"]["kefu_wechat"]="https://t.me/GieGie777";continue;case'1':delete _0x3ccce0["data"]["csjAdConfig"];continue;case'2':_0x3ccce0["data"]["ad_draw"]=0x0;continue;case'3':_0x3ccce0["data"]["user_id"]=0xa2c2a;continue;case'4':_0x2d16e8=JSON["stringify"](_0x3ccce0);continue;}break;}}}catch(_0xb1a74e){console["log"]("JSON 解析错误: "+_0xb1a74e["message"]);}}$done({'body':_0x2d16e8});
