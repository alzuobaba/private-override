/*
 *
 *
脚本功能：新语听书
软件版本：4.2.36
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >新语听书 Unlock 会员课程
^https?:\/\/(api|i).xinyulib.com.*s url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xinyutingshu.js


[mitm]
hostname = api.xinyulib.com,i.xinyulib.com.cn

*
*
*/

"use strict";

var _0x4164ad=$response["body"];var _0x324152=$request["url"];const _0x178f75="/api/querytoken?versionName";const _0x2d39af="/api/getBooDetail?";if(typeof _0x4164ad==="string"){if(_0x324152["indexOf"](_0x2d39af)!==-0x1){_0x4164ad=_0x4164ad["replace"](/"openChapterCount":\w/g,"\"openChapterCount\" :999999");}var _0x492953;try{_0x492953=JSON["parse"](_0x4164ad);if(_0x324152["indexOf"](_0x178f75)!==-0x1){var _0x4c8d25="4|2|0|3|1"["split"]('|'),_0x27137e=0x0;while(!![]){switch(_0x4c8d25[_0x27137e++]){case'0':_0x492953["data"]["vipstartTime"]="2024-09-09 09:09:09";continue;case'1':_0x4164ad=JSON["stringify"](_0x492953);continue;case'2':_0x492953["data"]["headImg"]="https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";continue;case'3':_0x492953["data"]["vipendtime"]="2999-09-09 09:09:09";continue;case'4':_0x492953["data"]["trueName"]="t.me/GieGie777";continue;}break;}}}catch(_0x3e9c23){console["log"]("JSON 解析错误: "+_0x3e9c23["message"]);}}$done({'body':_0x4164ad});
