/*
 *
 *
脚本功能：sleep cycle: 睡眠监测梦话鼾声记录及智能闹钟
软件版本：6.24.25
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >sleep cycle: 睡眠监测梦话鼾声记录及智能闹钟（永久会员）
^https?:\/\/ch.sleepcycle.com\/api\/v1\/subscription/get$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/sleepcycle.js

[mitm] 
hostname = ch.sleepcycle.com
*
*
*/

"use strict";

var _0x4b123e=$response["body"];var _0x2dfc8a=$request["url"];var _0x4b123e=$response["body"]["replace"](/"subscription":[\s\S]+/g,"\"subscription\":{\"product_id\":\"onlinebackup_h_1y\",\"transaction_id\":null,\"campaign\":null,\"features_rich\":[{\"source\":\"subscription\",\"name\":\"online-backup\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"smart-alarm\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"sleep-aid\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"analysis\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"snore\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"sleep-notes\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"premium-sounds\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"user-sounds\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"wake-up-mood\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"heart-rate\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"weather\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"health-kit\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"google-fit\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"statistics\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"philips-hue\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"home-kit\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"weekly-report\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"auto-sleep-tracking\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"sleep-training\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"ambient-light\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"sound-volume\",\"source_value\":\"premium\",\"expire_date\":32493881823},{\"source\":\"subscription\",\"name\":\"syndicate\",\"source_value\":\"premium\",\"expire_date\":32493881823}],\"campaigns\":[],\"package_id\":\"premium\",\"features\":[\"online-backup\",\"smart-alarm\",\"sleep-aid\",\"analysis\",\"snore\",\"sleep-notes\",\"premium-sounds\",\"user-sounds\",\"wake-up-mood\",\"heart-rate\",\"weather\",\"health-kit\",\"google-fit\",\"statistics\",\"philips-hue\",\"home-kit\",\"weekly-report\",\"auto-sleep-tracking\",\"sleep-training\",\"ambient-light\",\"sound-volume\",\"syndicate\"],\"trial\":null,\"expire_date\":32493881823}}");$done({'body':_0x4b123e});
