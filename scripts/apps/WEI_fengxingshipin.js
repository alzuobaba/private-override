/*
 *
 *
脚本功能：风行视频 解锁影视会员
软件版本：4.3.6.9
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 风行视频 解锁影视会员
^http:\/\/pvip.funshion.com\/v1\/vip\/userinfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/fengxingshipin.js
^http:\/\/.+funshion.com\/.+\/(media\/play|vip\/playauth) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/fengxingshipintk.js

[mitm] 
hostname = pvip.funshion.com,pm.funshion.com,*.funshion.com
*
*
*/

"use strict";

const _0x3c6ed9=$request["url"]||'';if(_0x3c6ed9["includes"]("/v1/vip/userinfo")){try{const _0x10ddc2=JSON["parse"](_0x165fdc);_0x10ddc2["data"]["is_vip"]='2';_0x10ddc2["data"]["had_vip"]=!![];_0x10ddc2["data"]["member_benefits"][0x0]["is_valid"]='1';_0x10ddc2["data"]["member_benefits"][0x1]["is_valid"]='1';_0x10ddc2["data"]["vip"]["vip_class"]='2';_0x10ddc2["data"]["vip"]["endtm"]="99999999999999";_0x10ddc2["data"]["vip"]["name"]="超级会员";_0x165fdc=JSON["stringify"](_0x10ddc2);}catch(_0x4d6303){}}$done({'body':_0x165fdc});
