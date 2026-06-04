/*
 *
 *
脚本功能：实时翻译-同传与语音字幕 解锁免费时长++
软件版本：3.2.6
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >实时翻译-同传与语音字幕
^https?:\/\/(translator|accounts).felo.me\/api\/user.*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/felossfy.js
^https?:\/\/translator.felo.me\/api\/translation\/thirdToken\?token_channel url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/felossfy.js
[mitm] 
hostname = accounts.felo.me,translator.felo.me,52.78.154.178

*
*
*/

"use strict";

if($request["url"]["indexOf"]("translation/thirdToken")!=-0x1){var _0x29b227=$request["headers"];_0x29b227["authorization"]="fo_6db4ce63011c48cab48ef764d05cd285__";_0x29b227["deviceId"]="492059D5-AEE2-4C72-AA0A-88E2262B96F8";$done({'headers':_0x29b227});}else if($request["url"]["indexOf"]("/api/user/plan")!=-0x1){var _0x5c5d78="3|4|1|0|2"["split"]('|'),_0x3502f9=0x0;while(!![]){switch(_0x5c5d78[_0x3502f9++]){case'0':var _0x575260=JSON["stringify"](_0x5a6029);continue;case'1':_0x5a6029["data"]["user_product_total"][0x0]["balance"]=0x165a0bb9b;continue;case'2':$done({'body':_0x575260});continue;case'3':var _0x5a6029=JSON["parse"]($response["body"]);continue;case'4':_0x5a6029["data"]["user_product_total"][0x0]["total"]=0x165a0bb9b;continue;}break;}}else if($request["url"]["indexOf"]("/api/user")!=-0x1){var _0x2e55ba=JSON["parse"]($response["body"]);_0x2e55ba["data"]["name"]="t.me/GieGie777";var _0x1aa7a1=JSON["stringify"](_0x2e55ba);$done({'body':_0x1aa7a1});}else{$done({});}
