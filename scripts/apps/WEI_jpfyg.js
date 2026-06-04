/*
 *
 *
脚本功能：金牌翻译官 
软件版本：1.3.0
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >金牌翻译官 恢复购买
^https?:\/\/mv-ps.xdplt.com\/api\/v1\/(user|payment\/apple\/pay\/verify)\/info url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/jpfyg.js


[mitm]
hostname = mv-ps.xdplt.com

*
*
*/

"use strict";

var _0x41e328=$response["body"];var _0x1dc459=$request["url"];const _0x2f6cb5="/api/v1/user/info?";const _0x3d8af7="/api/v1/short/play";const _0x41457e="/api/v1/payment/apple/pay/verify/info?";if(typeof _0x41e328==="string"){if(_0x1dc459["indexOf"](_0x3d8af7)!==-0x1){_0x41e328=_0x41e328["replace"](/locked":\d/g,"locked\" :0");}var _0x12edeb;try{_0x12edeb=JSON["parse"](_0x41e328);if(_0x1dc459["indexOf"](_0x2f6cb5)!==-0x1){_0x12edeb["result"]["isVip"]=0x1,_0x12edeb["result"]["isForeverVip"]=0x1,_0x12edeb["result"]["vipExpireTime"]=0x1d8d8f773708,_0x12edeb["result"]["bizId"]=0x76adf1,_0x41e328=JSON["stringify"](_0x12edeb);}if(_0x1dc459["indexOf"](_0x41457e)!==-0x1){_0x12edeb={'message':{'messageInfo':"H20000",'serverTime':0x193b5f719cd,'code':0xc8},'result':{'unsign':0x1,'agreementNo':"000001899416154",'isTrialPeriod':![],'eventToken':null,'expiresDate':0x1d8d8f773708,'isVip':0x1,'skuType':null}};_0x41e328=JSON["stringify"](_0x12edeb);}}catch(_0x4a9e56){console["log"]("JSON 解析错误: "+_0x4a9e56["message"]);}}$done({'body':_0x41e328});
