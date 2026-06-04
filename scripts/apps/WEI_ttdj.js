/*
 *
 *
脚本功能：天天短剧-热门短剧追不停
软件版本：1.1.4.6
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >天天短剧
^https?:\/\/api.maibiq.top\/center-(admin|biz)\/(app-api\/v1\/users\/me|app-api\/v1\/skitsLists\/check) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/ttdj.js
^https?://api\.maibiq\.top/center-system/app-api/v1/banner/list url reject-dict

[mitm]
hostname = api.maibiq.top

*
*
*/

"use strict";

if($request["url"]["includes"]("/app-api/v1/users/me")){let _0x1135ae=JSON["parse"]($response["body"]);Object["assign"](_0x1135ae["data"],{'blnVip':0x1,'balance':0xf41c8,'dropletNum':0xf41c8,'blnVipText':"2999-09-09",'avatar':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'nickname':"https://t.me/GieGie777",'id':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x1135ae)});}else if($request["url"]["includes"]("/app-api/v1/skitsLists/check")){let _0x27fe12=JSON["parse"]($response["body"]);Object["assign"](_0x27fe12,{'code':"00000"});$done({'body':JSON["stringify"](_0x27fe12)});}
