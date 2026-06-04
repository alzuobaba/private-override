/*
 *
 *
脚本功能：舞蹈生 
软件版本：1.3
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >舞蹈生
^https?:\/\/apidance.ctwh77.com\/api\/(newitem\/detail|user4app\/myinfo) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/wudaosheng.js
^https://apidance\.ctwh77\.com/api/appsplash/detail url reject

[mitm]
hostname = apidance.ctwh77.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/api/user4app/myinfo")){let _0x484696=JSON["parse"]($response["body"]);Object["assign"](_0x484696["result"],{'VipType':0x5,'IsVip':0x1,'Money':0xf41c8,'ExpTime':"/Date(32493834549000)/",'Avatar':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'NickName':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x484696)});}else if($request["url"]["includes"]("/api/newitem/detail")){let _0x322e68=JSON["parse"]($response["body"]);Object["assign"](_0x322e68["result"],{'Price':0x0});$done({'body':JSON["stringify"](_0x322e68)});}
