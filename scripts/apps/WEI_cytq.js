/*
 *
 *
脚本功能：彩云天气
软件版本：
下载地址：
脚本作者：
更新时间：2024年8.29
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************

====================================
[rewrite_local]
# 普通版广告
^https:\/\/ad\.cyapi\.cn\/v2\/req\?app_name=weather url reject-dict
# 赏叶赏花
^https:\/\/wrapper\.cyapi\.cn\/v1\/activity\?app_name=weather url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/cytq.js
# 解锁vip
^https:\/\/biz\.cyapi\.cn\/v2\/user url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/cytq.js
# 卫星云图 48小时预报
^https:\/\/wrapper\.cyapi\.cn\/v1\/(satellite|nafp\/origin_images) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/cytq.js

[mitm]
hostname = *.cyapi.cn
====================================
 *
 *
 */

"use strict";

let _0x530fa6=$response["body"];_0x530fa6="{\"status\":\"ok\",\"activities\":[{\"items\":[{}]}]}";_0x2e17c3["body"]=_0x530fa6;}$done(_0x2e17c3);
