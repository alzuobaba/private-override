/*
 *
 *
脚本功能：小旋风收音机
软件版本：4.5
下载地址：苹果商店下载
脚本作者：
更新时间：2024年10月27日
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 小旋风恢复购买
^https?:\/\/49.232.234.212:80\/user\/fixUserPayData url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/xxf.js

[mitm] 
hostname = 49.232.234.212
*
*
*/

"use strict";

if($request["url"]["includes"]("/user/fixUserPayData")){let _0x109335=JSON["parse"]($response["body"]);Object["assign"](_0x109335,{'msg':'成功','data':"RiknZxzJCYk4mwbSAcrJTCN0RmIcVUxTk4KQjYHviQAYRgI9C8gSyY/NLEcooXJv",'code':0xc8});$notify("关闭软件后会员会掉、需要重新恢复购买");$done({'body':JSON["stringify"](_0x109335)});}setInterval(function(){var _0x1601eb={'CLhJS':;
