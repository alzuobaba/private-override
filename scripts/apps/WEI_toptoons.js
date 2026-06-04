/*
 *
 *
脚本功能：TopToons顶通韩漫网 金币解锁🔓
软件版本：
下载地址：
脚本作者：
更新时间：2025年 
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >TopToons顶通韩漫网 金币付费购买章节即可，无需登录！
^https?:\/\/toptoons.(online|click)\/(buychapter|comic\/\d+) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/toptoons.js

[mitm]
hostname = toptoons.click,toptoons.online

*
*
*/

"use strict";

const _0x35db23=$request["url"]["indexOf"]("/comic/")!==-0x1;const _0x1efaf1=$request["url"]["indexOf"]("/buychapter")!==-0x1;
