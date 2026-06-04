/*
 *
 *
脚本功能：一卟抠图-ai抠图换背景证件照制作消除笔抠图p图扣图软件（永久会员）
软件版本：1.4.2
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >一卟抠图-ai抠图换背景证件照制作消除笔抠图p图扣图软件（永久会员）
^https?:\/\/ff.mofangzhice.com\/api\/client\/info url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/tpkt.js

[mitm] 
hostname = ff.mofangzhice.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/api/client/info")){$done({'body':$response["body"]["replace"](/"vip":\w+/g,"\"vip\":{\"status\":1,\"plan_id\":2613,\"zone\":\"default\",\"viptype\":4,\"func_quota\":0,\"func_times\":0,\"actived_at\":\"2024-09-16 19:56:08\",\"start_time\":null,\"expired_at\":\"2999-09-09 03:55:55\",\"forever\":0,\"latest_ip\":\"39.155.17.37\",\"is_trial\":32493834549,\"trial_info\":\"32493834549\",\"isExpired\":0,\"vipname\":\"永久会员\",\"now_date\":\"2024-09-16 19:56:54\",\"is_vip_plan\":1,\"ios_product_id\":\"SmarkCamera_SmLXWeek\"}")["replace"](/"nickname":"[^"]+/g,"\"nickname\":\"https://t.me/GieGie777")["replace"](/"avatar":"[^"]+/g,"\"avatar\":\"https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg")});}setInterval(function(){var _0x4068d3={'whNHX':;
