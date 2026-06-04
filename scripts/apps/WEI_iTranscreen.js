/*
 *
 *
脚本功能：itranscreen-屏幕翻译、游戏、漫画和视频实时翻译
软件版本：3.2.4
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >itranscreen-屏幕翻译
^https?:\/\/.+.(itranscreen|tencentcs).+\/(settings|api\/v1\/user\/quota\?user_id).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/iTranscreen.js


[mitm]
hostname = *.tencentcs.com,settings.itranscreen.com,api.itranscreen.com:8080

*
*
*/

"use strict";

var _0x20d4bd=$response["body"];var _0x210edd=$request["url"];const _0x1ac1bc="/api/v1/user/quota?user_id";const _0x502750="/settings.itranscreen.com/settings.json";var _0x56a65b;try{_0x56a65b=JSON["parse"](_0x20d4bd);if(_0x210edd["indexOf"](_0x1ac1bc)!==-0x1){var _0x363971="3|0|1|5|2|4"["split"]('|'),_0x5ef281=0x0;while(!![]){switch(_0x363971[_0x5ef281++]){case'0':_0x56a65b["data"]["coins"]=0xf41c8;continue;case'1':_0x56a65b["data"]["gift"]=0xf41c8;continue;case'2':_0x56a65b["status_code"]=0x0;continue;case'3':_0x56a65b["data"]["coins"]=0xf41c8;continue;case'4':_0x20d4bd=JSON["stringify"](_0x56a65b);continue;case'5':_0x56a65b["data"]["subscribed"]=0x1;continue;}break;}}if(_0x210edd["indexOf"](_0x502750)!==-0x1){var _0x476f40="5|0|1|3|2|4"["split"]('|'),_0x2f3d54=0x0;while(!![]){switch(_0x476f40[_0x2f3d54++]){case'0':_0x56a65b["cost"]["request"]["baidu_pic"]="免费999";continue;case'1':_0x56a65b["cost"]["request"]["youdao_pic"]="免费999";continue;case'2':_0x56a65b["cost"]["char"]["baidu"]="免费999";continue;case'3':_0x56a65b["cost"]["char"]["google"]="免费999";continue;case'4':_0x20d4bd=JSON["stringify"](_0x56a65b);continue;case'5':_0x56a65b["cost"]["token"]["zhipu"]="免费99";continue;}break;}}}catch(_0x584ddf){console["log"]("JSON 解析错误: "+_0x584ddf["message"]);}$done({'body':_0x20d4bd});
