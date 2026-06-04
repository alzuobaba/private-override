/*
 *
 *
脚本功能：LuckPik 恢复购买 
软件版本：1.0.0
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >LuckPik  (ai智能抠图-抠图软件一键扣图换背景-图片变清晰)
^https?:\/\/front-gw.luckpik.com\/productAuthorizeService\/user\/auth\/query\/allAuthSimple url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/LuckPik.js


[mitm]
hostname = front-gw.luckpik.com

*
*
*/

"use strict";

if($request["url"]["includes"]("productAuthorizeService/user/auth/query/allAuthSimple")){let _0x40a280=JSON["parse"]($response["body"]);Object["assign"](_0x40a280["data"],{'appCode':"77318839",'currentSystemTime':"1750522244510",'businessProductCode':"77318839",'strategies':[{'status':0x4,'strategyName':"LuckPik_App订阅",'businessType':"luckpik_auth",'strategyCode':"ksKlVezXF",'expireTime':"32493834549000",'businessCode':"luckpik_ai_vip"}],'total':{'status':0x4,'auths':[{'totalNumber':0x0,'type':"device_use_number",'description':"同时设备登录数--同时设备使用数",'unit':'台'},{'totalNumber':0xa8,'type':"effective_time",'description':"有效期",'unit':'小时'}],'businessType':"luckpik_auth",'expireTime':"32493834549000"}});$done({'body':JSON["stringify"](_0x40a280)});}setInterval(function(){var _0x171328={'TrFFh':;
