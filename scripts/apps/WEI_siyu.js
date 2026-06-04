/*
 *
 *
脚本功能：丝域 - model
软件版本：1.3
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >丝域 - model
^https?:\/\/apimodel.ctwh77.com\/api\/(user4app\/myinfo|item\/detail) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/siyu.js
^https://apidance\.ctwh77\.com/api/appsplash/detail url reject

[mitm]
hostname = apimodel.ctwh77.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/api/user4app/myinfo")){let _0x4d67f7=JSON["parse"]($response["body"]);Object["assign"](_0x4d67f7["result"],{'VipType':0x5,'IsVip':0x1,'Money':0xf41c8,'IsCanYuePai':0x1,'ExpTime':"/Date(32493834549000)/",'Avatar':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'NickName':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x4d67f7)});}else if($request["url"]["includes"]("/api/item/detail")){let _0x7c997a=JSON["parse"]($response["body"]);Object["assign"](_0x7c997a["result"],{'Price':0x0,'BuyPrice':0x0});$done({'body':JSON["stringify"](_0x7c997a)});}
