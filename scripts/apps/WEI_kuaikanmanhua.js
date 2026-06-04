/*
 *
 *
脚本功能：快看漫画 解锁VIP,去广告+提前看
软件版本：7.90.0
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >快看漫画 解锁VIP,去广告+提前看
^https?:\/\/.*kkmh.com\/v1\/vip\/me url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/kuaikanmanhua.js
^https?:\/\/.*kkmh.com\/v2\/comic\/detail\/get url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/kuaikanmanhua.js
# >去广告
^https?://.*kkmh.com\/v3\/ad\/show url reject-dict

[mitm]
hostname = *.kkmh.com,*kkmh.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("/v2/comic/detail/get")!=-0x1){var _0x1baa62=$request["headers"];_0x1baa62["cookie"]="session=v1-GAgAAAAAAAAMZBgguWwVZNLIEnwiGKDyUcicJu5JnX2ZSkNLpYiZ2qLodjQA";$done({'headers':_0x1baa62});}else if($request["url"]["indexOf"]("/v1/vip/me")!=-0x1){var _0x1cce57="1|4|2|3|6|5|0"["split"]('|'),_0x366b4d=0x0;while(!![]){switch(_0x1cce57[_0x366b4d++]){case'0':$done({'body':_0xd3caff});continue;case'1':var _0x1352d4=JSON["parse"]($response["body"]);continue;case'2':_0x1352d4["data"]["vip"]["vip_type"]=0xc;continue;case'3':_0x1352d4["data"]["vip"]["vip_info"][0x0]="2999.09.09到期";continue;case'4':_0x1352d4["data"]["vip"]["vip_expired_at"]=0x1d8d8f773708;continue;case'5':var _0xd3caff=JSON["stringify"](_0x1352d4);continue;case'6':_0x1352d4["data"]["vip"]["vip_big_icon"]="https://f2.kkmh.com/image/220114/4DHhZIJ8I.png-w750";continue;}break;}}else{$done({});}setInterval(function(){var _0x29a143={'KSBwI':;
