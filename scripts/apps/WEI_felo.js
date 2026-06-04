/*
 *
 *
脚本功能：felo实时翻译-同传与语音字幕 解锁免费时长++
软件版本：3.2.1
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >felo实时翻译-同传与语音字幕
^https?:\/\/(translator|accounts).felo.me\/api\/user.*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/felo.js
^https?:\/\/translator.felo.me\/api\/translation\/thirdToken\?token_channel url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/felotk.js
[mitm] 
hostname = accounts.felo.me,translator.felo.me,52.78.154.178

*
*
*/

"use strict";

var _0x1c092d=$response["body"];var _0x4f7a12=$request["url"];
