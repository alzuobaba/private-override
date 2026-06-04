/*
 *
 *
脚本功能：知识脱口秀
软件版本：1.5.2
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >知识脱口秀
^https:\/\/talkshow.wfkids.net\/wfcm-api\/(vip\/queryVipInfo|talkshow\/chapter|course\/courseInfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/zstkx.js


[mitm]
hostname = talkshow.wfkids.net

*
*
*/

"use strict";

var _0x3d5dd2=$response["body"];var _0x4c12df=$request["url"];
