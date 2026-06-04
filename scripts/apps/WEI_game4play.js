/*
 *
 *
脚本功能：解锁会员
软件版本：++
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]

# >玛卡相机-ai照片视频写真一键秒出潮流大片
# >玛卡写真馆-一键生成热门写真、换发型、海量潮流变装
# >蜜桃小剧场-海量热门短剧无限看
# >简易翻译-实时拍照语音文字翻译神器
^https?:\/\/.+xdplt.com\/api\/v1\/(user\/info|payment\/apple\/pay\/verify) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/game4play.js

[mitm] 
hostname = *xdplt.com

*
*
*/

"use strict";

var _0x4be5dc=$response["body"];var _0x2713fd=$request["url"];const _0x26219e="/api/v1/user/info?";const _0x4e1b60="/v1/payment/apple/pay/verify";if(typeof _0x4be5dc==="string"){if(_0x2713fd["indexOf"](_0x4e1b60)!==-0x1){_0x4be5dc=_0x4be5dc["replace"](/.+/g,"{\"message\":{\"messageInfo\":\"H20000\",\"serverTime\":1727128287864,\"code\":200},\"result\":{\"unsign\":1,\"agreementNo\":\"710001798105612\",\"isTrialPeriod\":true,\"eventToken\":null,\"expiresDate\":32493834549000,\"isVip\":1,\"skuType\":null}}");}var _0x6a2db7;try{_0x6a2db7=JSON["parse"](_0x4be5dc);if(_0x2713fd["indexOf"](_0x26219e)!==-0x1){var _0x510c49="5|2|1|3|6|0|4"["split"]('|'),_0x34274b=0x0;while(!![]){switch(_0x510c49[_0x34274b++]){case'0':_0x6a2db7["result"]["bizId"]="https://t.me/GieGie777";continue;case'1':_0x6a2db7["result"]["diamond"]=0xf41c8;continue;case'2':_0x6a2db7["result"]["vipExpireTime"]=0x1d8d8f773708;continue;case'3':_0x6a2db7["result"]["avatar"]="https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg";continue;case'4':_0x4be5dc=JSON["stringify"](_0x6a2db7);continue;case'5':_0x6a2db7["result"]["isVip"]=0x1;continue;case'6':_0x6a2db7["result"]["nickname"]="https://t.me/GieGie777";continue;}break;}}}catch(_0x8b6b2d){console["log"]("JSON 解析错误: "+_0x8b6b2d["message"]);}}$done({'body':_0x4be5dc});
