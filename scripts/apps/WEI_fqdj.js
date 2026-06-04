/*
 *
 *
脚本功能：番茄短剧
软件版本：3.0.4
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >番茄短剧
^https?:\/\/fqapi.tiantiangf.cn\/center-(biz|admin)\/app-api\/v1\/(users\/me|skitsLists\/frontCheck) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/fqdj.js
^https?://fqapi\.tiantiangf\.cn/center-system/app-api/v1/banner/list url reject-dict

[mitm]
hostname = fqapi.tiantiangf.cn

*
*
*/

"use strict";

if($request["url"]["includes"]("/app-api/v1/users/me")){let _0x44d0c5=JSON["parse"]($response["body"]);Object["assign"](_0x44d0c5["data"],{'blnVip':0x1,'balance':0xf41c8,'blnVipText':"2999-09-09",'avatar':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'nickname':"https://t.me/GieGie777",'id':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x44d0c5)});}else if($request["url"]["includes"]("/app-api/v1/skitsLists/frontCheck?fileName")){let _0x9a56c2=JSON["parse"]($response["body"]);Object["assign"](_0x9a56c2,{'code':"00000"});$done({'body':JSON["stringify"](_0x9a56c2)});}
