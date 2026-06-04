/*
 *
 *
脚本功能：盯盯水印相机-工作查岗打卡拍照实时记录上传
软件版本：
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >盯盯水印相机 VIP
^https?:\/\/camera.xinmengma.com\/api\/user url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/dingdingshuiyin.js

[mitm]
hostname = camera.xinmengma.com
*
*
*/

"use strict";

var _0x48c1ef=$response["body"];let _0x37933b=JSON["parse"]($response["body"]);_0x37933b["data"]["vip_expiry_date"]="2999-09-09 09:09:09",_0x37933b["data"]["vip_expiry_date_1970"]=0x1d8d8f773745,$done({'body':JSON["stringify"](_0x37933b)});
