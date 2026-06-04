/*
 *
 *
脚本功能：picma - ai照片修复上色，找回你我当年回忆
软件版本：2.8.8
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >picma - ai照片修复上色，找回你我当年回忆
^https?:\/\/api.magictiger.ai\/api\/v1\/uservip\/getMemberInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/picma.js

[mitm] 
hostname = api.magictiger.ai

*
*
*/

"use strict";

if($request["url"]["includes"]("https://api.magictiger.ai/api/v1/uservip/getMemberInfo")){let _0x4d8251=JSON["parse"]($response["body"]);Object["assign"](_0x4d8251["data"],{'status':0x1,'freeAdsTimes':0x9184e729fff,'endTime':0x9184e729fff,'vip':!![],'startTime':0x1,'memberType':0x1});$done({'body':JSON["stringify"](_0x4d8251)});}
