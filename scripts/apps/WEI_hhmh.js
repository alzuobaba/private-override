/*
 *
 *
脚本功能：嘿嘿漫画
软件版本：2.0.6
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 嘿嘿漫画 付费章节、会员章节购买
^https?:\/\/api.manxinao.com\/api\/User\/getBalance url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/hhmh.js
^https?:\/\/api.manxinao.com\/api\/Commodity\/(buychapter|chadetail) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/hhmh.js

[mitm]
hostname = api.manxinao.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("/api/Commodity/chadetail")!=-0x1){var _0x52da08=$request["headers"];_0x52da08["Authorization"]="A437C9CD198EF29A57A6EE502A976C42B3E27E046F6E61AE4F357727A6B6BCBCA3A451A5C3F64A62E0C306145A0AE9C4640069D6EA555A45C6543616E578CCBB286A43A0A0B9A2AE4C1C90C973FF99C142B3BE5109878A224792A9AECF191E6DFD1BB3C1A706ADED036E1E0B40C8F3BDD5DA109980B9E6E72B34C36F006757067312DAA6E09FDC71";$done({'headers':_0x52da08});}if($request["url"]["indexOf"]("/api/Commodity/buychapter")!=-0x1){var _0x52da08=$request["headers"];_0x52da08["Authorization"]="A437C9CD198EF29A57A6EE502A976C42B3E27E046F6E61AE4F357727A6B6BCBCA3A451A5C3F64A62E0C306145A0AE9C4640069D6EA555A45C6543616E578CCBB286A43A0A0B9A2AE4C1C90C973FF99C142B3BE5109878A224792A9AECF191E6DFD1BB3C1A706ADED036E1E0B40C8F3BDD5DA109980B9E6E72B34C36F006757067312DAA6E09FDC71";$done({'headers':_0x52da08});}else if($request["url"]["indexOf"]("/api/User/getBalance")!=-0x1){var _0x377d74="2|0|5|1|3|4"["split"]('|'),_0x2aee4e=0x0;while(!![]){switch(_0x377d74[_0x2aee4e++]){case'0':_0x54b0ce["data"]="99999";continue;case'1':_0x54b0ce["level"]='9';continue;case'2':var _0x54b0ce=JSON["parse"]($response["body"]);continue;case'3':var _0x5c4951=JSON["stringify"](_0x54b0ce);continue;case'4':$done({'body':_0x5c4951});continue;case'5':_0x54b0ce["vipexpiretime"]="32493834549000";continue;}break;}}else{$done({});}
