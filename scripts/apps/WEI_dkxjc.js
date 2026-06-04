/*
 *
 *
脚本功能：抖看小剧场-海量精彩短剧抢先看
软件版本：2.1.0
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >抖看小剧场-海量精彩短剧抢先看
^https?:\/\/(videohub.xdplt|mv-ps.xdplt).com\/api\/v1\/(short\/play|payment\/apple\/pay\/verify\/info|user\/info) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/dkxjc.js


[mitm]
hostname = mv-ps.xdplt.com,videohub.xdplt.com

*
*
*/

"use strict";

var _0x4fe830=$response["body"];var _0x597205=$request["url"];const _0x512a15="/api/v1/user/info?";const _0x4a21c2="/v1/short/play";const _0x4c2e68="/api/v1/payment/apple/pay/verify/info?";if(typeof _0x4fe830==="string"){if(_0x597205["indexOf"](_0x4a21c2)!==-0x1){_0x4fe830=_0x4fe830["replace"](/locked":\d/g,"locked\" :0");}var _0xb56a75;try{_0xb56a75=JSON["parse"](_0x4fe830);if(_0x597205["indexOf"](_0x512a15)!==-0x1){_0xb56a75["result"]["isVip"]=0x1,_0xb56a75["result"]["isForeverVip"]=0x1,_0xb56a75["result"]["vipExpireTime"]=0x1d8d8f773708,_0xb56a75["result"]["bizId"]=0x76adf1,_0x4fe830=JSON["stringify"](_0xb56a75);}if(_0x597205["indexOf"](_0x4c2e68)!==-0x1){_0xb56a75={'message':{'messageInfo':"H20000",'serverTime':0x193b5f719cd,'code':0xc8},'result':{'unsign':0x1,'agreementNo':"000001899416154",'isTrialPeriod':![],'eventToken':null,'expiresDate':0x1d8d8f773708,'isVip':0x1,'skuType':null}};_0x4fe830=JSON["stringify"](_0xb56a75);}}catch(_0xc28ae){console["log"]("JSON 解析错误: "+_0xc28ae["message"]);}}$done({'body':_0x4fe830});
