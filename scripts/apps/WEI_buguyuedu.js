/*
 *
 *
脚本功能：布咕阅读     解锁付费，会员章节书籍需要在广告模式用咕咕卷购买
软件版本：2.6.6
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：需要在广告模式用咕咕卷购买才行
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 布咕阅读
^https:\/\/app.api.bgwxc.com\/app\/user\/getUserGold url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/buguyuedu.js
^https?:\/\/app.api.bgwxc.com\/app\/novel\/(contentV2|sub) url script-request-body https://raw.githubusercontent.com/WeiGiegie/666/main/bgydtoken.js
[mitm] 
hostname = app.api.bgwxc.com
*
*
*/

"use strict";

const _0x2e522f=$request["url"]||'';if(_0x2e522f["includes"]("/user/getUserGold1Num")){try{const _0x2dc7e2=JSON["parse"](_0x585731);_0x2dc7e2["data"]["goldnum"]=0xf41c8;_0x585731=JSON["stringify"](_0x2dc7e2);}catch(_0x415a27){}}if(_0x2e522f["includes"]("/user/getUserGold2Num")){try{const _0x31d350=JSON["parse"](_0x585731);_0x31d350["data"]["goldnum"]=-0xf41c8;_0x585731=JSON["stringify"](_0x31d350);}catch(_0x4a8991){}}$done({'body':_0x585731});
