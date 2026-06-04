/*
 *
 *
脚本功能：拿捏驾考-新生代绝绝子驾考（解锁会员）
软件版本：1.1.7
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >拿捏驾考（解锁会员）
^https?:\/\/nanie.flyingeffect.com\/api\/me\/info url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/nnjk.js

[mitm] 
hostname = nanie.flyingeffect.com

*
*
*/

"use strict";

var _0x207924=$response["body"];var _0x52b267=$request["url"];const _0x3d3e0b="/api/me/info";var _0x4249b4;try{_0x4249b4=JSON["parse"](_0x207924);if(_0x52b267["indexOf"](_0x3d3e0b)!==-0x1){var _0x57877a="4|6|5|3|7|1|0|2"["split"]('|'),_0x210921=0x0;while(!![]){switch(_0x57877a[_0x210921++]){case'0':_0x4249b4["data"]["nickname"]="https://t.me/GieGie777";continue;case'1':_0x4249b4["data"]["avatar"]="https://zdimg.lifeweek.com.cn/app/20230410/16811146599505136.jpg";continue;case'2':_0x207924=JSON["stringify"](_0x4249b4);continue;case'3':_0x4249b4["data"]["is_permanent_vip"]=0x1;continue;case'4':_0x4249b4["data"]["vip_type"]=0x1;continue;case'5':_0x4249b4["data"]["vip_end_time"]="2999-09-09 02:08:40";continue;case'6':_0x4249b4["data"]["experience_vip_end_time"]=0x1d8d8f773708;continue;case'7':_0x4249b4["data"]["is_vip"]=!![];continue;}break;}}}catch(_0x3fc3cd){console["log"]("JSON 解析错误: "+_0x3fc3cd["message"]);}$done({'body':_0x207924});
