/*
 *
 *
脚本功能：哈梨冥想-heartly lab冥想减压安眠白噪音
软件版本：1.3.9
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >哈梨冥想-heartly lab冥想减压安眠白噪音
^https?:\/\/svc.heartlylab.com\/api\/v1\/(app\/user\/apple_login|user\/vip\/info) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/hlmx.js


[mitm]
hostname = svc.heartlylab.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/api/v1/app/user/apple_login")){let _0x2be9aa=JSON["parse"]($response["body"]);Object["assign"](_0x2be9aa["data"],{'level':0x1,'vip_expire_date':"2999-09-09会员到期",'avatar':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'nick_name':"t.me/GieGie777"});$done({'body':JSON["stringify"](_0x2be9aa)});}else if($request["url"]["includes"]("/api/v1/user/vip/info")){let _0x83e225=JSON["parse"]($response["body"]);Object["assign"](_0x83e225["data"],{'level':0x1,'vip_expire_date':"2999-09-09"});$done({'body':JSON["stringify"](_0x83e225)});}
