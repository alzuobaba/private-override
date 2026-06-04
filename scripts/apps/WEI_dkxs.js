/*
 *
 *
脚本功能：抖看小说-看海量小说电子书的阅读器
软件版本：1.8.3
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >抖看小说-看海量小说电子书的阅读器 解锁VIP
^https?:\/\/(videohub.xdplt|mv-ps.xdplt).com\/api\/v1\/(short\/play|payment\/apple\/pay\/verify\/info|user\/info) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/dkxs.js


[mitm]
hostname = mv-ps.xdplt.com,videohub.xdplt.com

*
*
*/

"use strict";

var body=$response["body"];var url=$request['url'];const p1="/api/v1/user/info?";const p2='/v1/short/play';const p3="/api/v1/payment/apple/pay/verify/info?";if(typeof body==='string'){if(url["indexOf"](p2)!==-0x1){body=body['replace'](/locked":\d/g,"locked\" :0");}var obj;try{obj=JSON["parse"](body);if(url["indexOf"](p1)!==-0x1){obj["result"]["isVip"]=0x1,obj["result"]["isForeverVip"]=0x1,obj['result']["vipExpireTime"]=0x1d8d8f773708,obj["result"]["bizId"]=0x4e20,body=JSON["stringify"](obj);}if(url['indexOf'](p3)!==-0x1){obj={'message':{'messageInfo':'H20000','serverTime':0x193b5f719cd,'code':0xc8},'result':{'unsign':0x1,'agreementNo':'000001899416154','isTrialPeriod':![],'eventToken':null,'expiresDate':0x1d8d8f773708,'isVip':0x1,'skuType':null}};body=JSON["stringify"](obj);}}catch(_0x37d1d6){console['log']("JSON 解析错误: "+_0x37d1d6['message']);}}$done({'body':body});
