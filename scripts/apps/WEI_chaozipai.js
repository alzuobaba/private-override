/*
 *
 *
脚本功能：潮自拍
软件版本：4.1.45
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >潮自拍
^https?:\/\/.+meitu.com\/(v2\/user\/vip_info_by_group|filter\/timeline|v2\/user\/info_by_entrance).json url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/chaozipai.js


[mitm]
hostname = api-sub.meitu.com,api.selfiecity.meitu.com

*
*
*/

"use strict";

var _0x2bf043=$response["body"];var _0x5788d5=$request["url"];
