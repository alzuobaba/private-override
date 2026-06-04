/*
 *
 *
脚本功能：每天读点故事-原生、奇崛、动人（解锁音频节目）
软件版本：6.8.4
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >每天读点故事（解锁音频节目）
^https?:\/\/apipc01.gushi.cn\/(v9\/articles|audio|collection\/audios|v3\/app\/config\/check|users\/vipinfos|v6\/chapters) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/mtddgs.js
^https?:\/\/apipc01.gushi.cn\/v5\/advertisements\? url reject-dict
[mitm] 
hostname = apipc01.gushi.cn

*
*
*/

"use strict";

var _0x8b597a=$response["body"];var _0x467987=$request["url"];const _0x323e03="/v3/app/config/check";const _0x279430="apipc01.gushi.cn";
