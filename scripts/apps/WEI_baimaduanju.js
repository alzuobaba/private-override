/*
 *
 *
脚本功能：白马剧场
软件版本：1.0.2
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >
^https?:\/\/theater-api.sylangyue.xyz\/api\/(playlet\/episode|user\/info) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/baimaduanju.js



[mitm]
hostname = theater-api.sylangyue.xyz
*
*
*/

"use strict";

var _0x221274=$response["body"];var _0x33046a=$request["url"];const _0x4f0bca="/api/playlet/";const _0x385f4e="/api/user/info";if(typeof _0x221274==="string"){if(_0x33046a["indexOf"](_0x4f0bca)!==-0x1){_0x221274=_0x221274["replace"](/"is_watch":false/g,"\"is_watch\":true,");}var _0x42c3a9;try{_0x42c3a9=JSON["parse"](_0x221274);if(_0x33046a["indexOf"](_0x385f4e)!==-0x1){_0x42c3a9["data"]["username"]="https://t.me/GieGie777",_0x42c3a9["data"]["vip"]["status"]=!![],_0x42c3a9["data"]["vip"]["expired_date"]="2999-09-09",_0x42c3a9["data"]["vip"]["expired_at"]=0x5af3107a3fff,_0x42c3a9["data"]["login_way"]=!![],_0x42c3a9["data"]["beans"]=0xf41c8,_0x221274=JSON["stringify"](_0x42c3a9);}}catch(_0x53e0fc){console["log"]("JSON 解析错误: "+_0x53e0fc["message"]);}}$done({'body':_0x221274});
