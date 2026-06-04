/*
 *
 *
脚本功能：起伏-睡眠、冥想与白噪音
软件版本：4.1
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >起伏-睡眠、冥想与白噪音
^https?:\/\/api.risingfalling.com\/api\/(vip\/detail|memberInfo\/myInfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/qifu.js


[mitm]
hostname = api.risingfalling.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/api/memberInfo/myInfo")){let _0x1b5751=JSON["parse"]($response["body"]);Object["assign"](_0x1b5751["body"],{'vipType':"PAY",'phone':"t.me/GieGie777",'nickName':"t.me/GieGie777"});$done({'body':JSON["stringify"](_0x1b5751)});}else if($request["url"]["includes"]("/api/vip/detail")){let _0x343a4d=JSON["parse"]($response["body"]);Object["assign"](_0x343a4d["body"],{'isVip':!![],'vipType':"PAY"});$done({'body':JSON["stringify"](_0x343a4d)});}
