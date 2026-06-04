/*
 *
 *
脚本功能：
软件版本：
下载地址：
脚本作者：**
更新时间：2025
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 月亮听书 解锁付费听书购买
^https?:\/\/www.yueliangfm.com\/v5\/api\/getUserData url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/ylts.js
^https?:\/\/www.yueliangfm.com\/.+\/api\/(chapter\?bookId|getChapterUrl).*$ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/ylts1.js
^https?:\/\/www.yueliangfm.com\/v5\/api\/getCurrentChapter.*$ url script-request-body https://raw.githubusercontent.com/WeiGiegie/666/main/ylts2.js
# > 去广告
^https?://case-cdn\.oceanplayable\.com url reject
^https?://ios\.bugly\.qq\.com url reject
^https?://ulogs\.um.*\.com url reject
^https?://token\.safebrowsing\.apple url reject
^https?://toblog\.ctobsnssdk\.com url reject

[mitm] 
hostname = www.yueliangfm.com,ios.bugly.qq.com,ulogs.umeng.com,ulogs.umengcloud.com,*toutiao.com,toblog.ctobsnssdk.com,token.safebrowsing.apple,toblog.ctobsnssdk.com


*
*
*/

"use strict";

var _0x12a38a=$response["body"];let _0x558db8=JSON["parse"]($response["body"]);_0x558db8["data"]["nickname"]="https://t.me/GieGie777";_0x558db8["data"]["image"]="https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";
