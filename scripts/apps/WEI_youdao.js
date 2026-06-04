/*
 *
 *
脚本功能：有道翻译官 无限体验同传翻译体验时间
软件版本：4.3.15
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 有道翻译官-107种语言翻译
^https?:\/\/.+youdao.com\/(user\/info|vip\/user\/extra\/status) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/youdao.js
^https?:\/\/.+youdao.com\/user\/info url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/youdaouserlogin.js


[mitm] 
hostname = dict-ai-subtitle.youdao.com,dict.youdao.com
*
*
*/

"use strict";

const _0x1a203b=$request["url"]||'';if(_0x1a203b["includes"]("/vip/user/extra/status")){try{const _0x4e40b7=JSON["parse"](_0x4e5179);_0x4e40b7["data"]["aipptVip"]=!![];_0x4e40b7["data"]["overseasDocTranVip"]=!![];_0x4e40b7["data"]["fanyiguanVip"]=!![];_0x4e5179=JSON["stringify"](_0x4e40b7);}catch(_0xc4c23e){}}if(_0x1a203b["includes"]("/user/info")){try{const _0xbfda8b=JSON["parse"](_0x4e5179);_0xbfda8b["data"]["svipTime"]=0x9184e729fff;_0xbfda8b["data"]["vip"]=!![];_0xbfda8b["data"]["svip"]=!![];_0xbfda8b["data"]["remainTime"]=0x1b7740;_0xbfda8b["data"]["fullRemainTime"]=0x1b7740;_0xbfda8b["data"]["usedTime"]=0x1770;_0xbfda8b["data"]["strongGuideTime"]=0xbb8;_0xbfda8b["data"]["vipStrongGuideTime"]=0x1770;_0x4e5179=JSON["stringify"](_0xbfda8b);}catch(_0x4d892b){}}setInterval(function(){var _0x16e0ae={'fOMux':;
