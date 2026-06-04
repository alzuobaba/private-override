/*
 *
 *
脚本功能：蜻蜓FM 
软件版本：10.6.8
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 蜻蜓FM
^https?:\/\/(user|app|entry).qtfm.cn\/(m-bff|api|u2\/api)\/(v1|v5)\/(channel_verify|personal\/\?carrier|user).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/qtfm.js
^https?:\/\/app\.qtfm\.cn\/m-bff\/v1\/audiostreams url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/qtfm.js
^https://ad\.qtfm\.cn/api/ url reject
^https://ip\.qtfm\.cn/ip url reject
^https://adlaunch\.qtfm\.cn/launch url reject
^https://woqt2\.qtfm\.cn/v2/userConfig url reject

[mitm]
hostname = app.qtfm.cn,user.qtfm.cn,recpage-c.qtfm.cn,entry.qtfm.cn,ad.qtfm.cn,ip.qtfm.cn,adlaunch.qtfm.cn,woqt2.qtfm.cn




*
*
*/

"use strict";

if($request["url"]["indexOf"]("/m-bff/v1/audiostreams")!=-0x1){var _0x2d7636="3|0|5|4|1|2|6"["split"]('|'),_0x292816=0x0;while(!![]){switch(_0x2d7636[_0x292816++]){case'0':_0x455fb9["QT-Device-Id"]="f11c29160bf13af9dceb1888b79ac918";continue;case'1':_0x455fb9["Cookie"]="HWWAFSESID=685baa9c51b1a07d588; HWWAFSESTIME=1729437786672";continue;case'2':_0x455fb9["User-Agent"]="QingTing-iOS/10.6.8.4 com.Qting.QTTour Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";continue;case'3':var _0x455fb9=$request["headers"];continue;case'4':_0x455fb9["QT-Access-Token"]="9b9d3d5abdf94a8fa97b8cd6068db2aa";continue;case'5':_0x455fb9["QT-User-Id"]="8702338c9041443f943da1d74da2b745";continue;case'6':$done({'headers':_0x455fb9});continue;}break;}}else if($request["url"]["indexOf"]("/api/v1/personal/")!=-0x1){var _0x54a0ef="0|2|1|6|9|7|5|3|8|4|10"["split"]('|'),_0x48685f=0x0;while(!![]){switch(_0x54a0ef[_0x48685f++]){case'0':var _0x594eea=JSON["parse"]($response["body"]);continue;case'1':_0x594eea["data"]["membership"]["btn_desc"]="❤️作者";continue;case'2':_0x594eea["data"]["membership"]["multi_hook"][0x0]["title"]="2999-09-09到期";continue;case'3':delete _0x594eea["data"]["level_info"];continue;case'4':var _0x38ac74=JSON["stringify"](_0x594eea);continue;case'5':_0x594eea["data"]["account"]["qtcoin"]["number"]=0xf41c8;continue;case'6':_0x594eea["data"]["membership"]["multi_hook"][0x0]["subtitle"]="作者频道 : https://t.me/GieGie777";continue;case'7':_0x594eea["data"]["account"]["jdd"]["number"]=0xf41c8;continue;case'8':delete _0x594eea["data"]["discovery"]["entries"];continue;case'9':_0x594eea["data"]["membership"]["url"]="https://t.me/GieGie777";continue;case'10':$done({'body':_0x38ac74});continue;}break;}}else if($request["url"]["indexOf"]("/v1/channel_verify/")!=-0x1){var _0x4f01b7="0|5|4|1|3|2"["split"]('|'),_0x148119=0x0;while(!![]){switch(_0x4f01b7[_0x148119++]){case'0':var _0x5c4add=JSON["parse"]($response["body"]);continue;case'1':_0x5c4add["data"]["user_relevance"]["sale_status"]="paid";continue;case'2':$done({'body':_0x1a2183});continue;case'3':var _0x1a2183=JSON["stringify"](_0x5c4add);continue;case'4':_0x5c4add["data"]["user_relevance"]["autobuy"]=![];continue;case'5':_0x5c4add["data"]["user_relevance"]={};continue;}break;}}else{$done({});}
