/*
 *
 *
脚本功能：mp3转换助手-视频提取音频编辑制作手机铃声
软件版本：1.7.6
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >mp3转换助手-视频提取音频编辑制作手机铃声 VIP
^https?:\/\/audio.xinmengma.com\/api\/user url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/mp3zh.js

[mitm]
hostname = audio.xinmengma.com
*
*
*/

"use strict";

var _0x20793e=$response["body"];let _0x3c9f3e=JSON["parse"]($response["body"]);_0x3c9f3e["data"]["vip_expiry_date"]="2999-09-09 09:09:09",_0x3c9f3e["data"]["vip_expiry_date_1970"]=0x1d8d8f773745,$done({'body':JSON["stringify"](_0x3c9f3e)});
