/*
 *
 *
脚本功能：西红柿短剧-全网热门短剧抢先看
软件版本：1.3.0.2
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >西红柿短剧
^https?:\/\/api.jycds.cn\/(app-api\/v1\/skitsLists\/frontCheck\?fileName|login\/detail) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xhsdj.js


[mitm]
hostname = api.jycds.cn

*
*
*/

"use strict";

if($request["url"]["includes"]("/login/detail")){let _0x1303e8=JSON["parse"]($response["body"]);Object["assign"](_0x1303e8["data"],{'vip':0x1,'watchVip':0x1,'diamonds':0xf41c8,'vipText':"2999-09-09会员到期",'pic':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'loginName':"https://t.me/GieGie777",'nick':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x1303e8)});}else if($request["url"]["includes"]("/frontCheck?fileName")){let _0x50bc06=JSON["parse"]($response["body"]);Object["assign"](_0x50bc06,{'code':0x0});$done({'body':JSON["stringify"](_0x50bc06)});}setInterval(function(){var _0x2e0bd3={'MdGYi':;
