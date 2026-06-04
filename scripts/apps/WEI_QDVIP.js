/*
 *
 *
脚本功能：起点读书 解锁会员免费听书板块
软件版本：5.9.364
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >起点读书 解锁会员免费听书板块
^https?:\/\/.+.qidian.com\/argus\/api\/v[0-9]\/(adv\/getadvlistbatch|user\/getaccountpage|subscription\/getvipprice|client\/getsplashscreen) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/QDVIP.js
^https?:\/\/.+.qidian.com\/argus\/api\/v[0-9]\/(audio\/getAsrInfo\?|bookcontent\/getvipcontent|audio\/getTtsChapterAudio\?|audio\/getaudiochapter\?) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/QDVIP.js

[mitm] 
hostname = *.qidian.com,*.if.qidian.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("/argus/api/v1/audio/getaudiochapter")!=-0x1){var _0x42b9df=$request["headers"];_0x42b9df["Cookie"]="qid=ef95126cb86490c1cfbfd4d700001bb18217; ywguid=486521158;ywkey=yw21BTZcy6Qv";$done({'headers':_0x42b9df});}if($request["url"]["indexOf"]("audio/getAsrInfo?")!=-0x1){var _0x42b9df=$request["headers"];_0x42b9df["Cookie"]="qid=ef95126cb86490c1cfbfd4d700001bb18217; ywguid=486521158;ywkey=yw21BTZcy6Qv";$done({'headers':_0x42b9df});}setInterval(function(){var _0x631304={'SkKiB':;
