/*
 *
 *
脚本功能：泰剧迷-泰剧tv大全爱泰剧部落
软件版本：1.0.7
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >泰剧迷-泰剧tv (去广告)
^https?:\/\/api.dingcy.top\/HJ_Video\/HJ_Config.php url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/taijumi.js



[mitm]
hostname = api.dingcy.top
*
*
*/

"use strict";

var _0x507517=$response["body"];let _0x30a4da=JSON["parse"]($response["body"]);_0x30a4da["data"]["openAd"]='0';_0x30a4da["data"]["duration"]='0';_0x30a4da["data"]["timerduration"]='0';
