/*
 *
 *
脚本功能：墨摘-金句摘抄阅读 永久会员
软件版本：1.2.7
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >墨摘-金句摘抄阅读 永久会员
^https?:\/\/api.juzikong.com\/mobi\/mooz\/am\/me\/meInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/mozhai.js
^https?:\/\/api.juzikong.com\/mobi\/mooz\/am\/(explore\/getTagCateConfig|music\/getBgmList) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/mozhaitk.js

[mitm]
hostname = api.juzikong.com

*
*
*/

"use strict";

if($request["url"]['indexOf']('/mobi/mooz/am/explore/getTagCateConfig')!=-0x1){var requestHeaders=$request["headers"];requestHeaders["Authorization"]="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExNDMyNiwidXVpZCI6IjVhZDc2MTc4LTcxOWMtNDcyMC1iYTI5LWNhN2EwODFjZGFkZSIsInVzZXJuYW1lIjoiZXBCaGdSZzZ6bSIsIm5iZiI6MTc0ODIyODg3OSwiaWF0IjoxNzQ4MjI4ODc5LCJleHAiOjE3Nzk3NjQ4NzksImlzcyI6Imp1emlrb25nLW1pY3JvLXNlcnZpY2VzIn0.2ABWFxfVnvgBZhNel6fIWiIVBl2fr0lgxwl4po1ZNuQ";requestHeaders['n2token']='Bearer\x20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExNDMyNiwidXVpZCI6IjVhZDc2MTc4LTcxOWMtNDcyMC1iYTI5LWNhN2EwODFjZGFkZSIsInVzZXJuYW1lIjoiZXBCaGdSZzZ6bSIsIm5iZiI6MTc0ODIyODg3OSwiaWF0IjoxNzQ4MjI4ODc5LCJleHAiOjE3Nzk3NjQ4NzksImlzcyI6Imp1emlrb25nLW1pY3JvLXNlcnZpY2VzIn0.2ABWFxfVnvgBZhNel6fIWiIVBl2fr0lgxwl4po1ZNuQ';$done({'headers':requestHeaders});}if($request["url"]["indexOf"]("/mobi/mooz/am/music/getBgmList")!=-0x1){var requestHeaders=$request["headers"];requestHeaders["Authorization"]='Bearer\x20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExNDMyNiwidXVpZCI6IjVhZDc2MTc4LTcxOWMtNDcyMC1iYTI5LWNhN2EwODFjZGFkZSIsInVzZXJuYW1lIjoiZXBCaGdSZzZ6bSIsIm5iZiI6MTc0ODIyODg3OSwiaWF0IjoxNzQ4MjI4ODc5LCJleHAiOjE3Nzk3NjQ4NzksImlzcyI6Imp1emlrb25nLW1pY3JvLXNlcnZpY2VzIn0.2ABWFxfVnvgBZhNel6fIWiIVBl2fr0lgxwl4po1ZNuQ';requestHeaders['n2token']='Bearer\x20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExNDMyNiwidXVpZCI6IjVhZDc2MTc4LTcxOWMtNDcyMC1iYTI5LWNhN2EwODFjZGFkZSIsInVzZXJuYW1lIjoiZXBCaGdSZzZ6bSIsIm5iZiI6MTc0ODIyODg3OSwiaWF0IjoxNzQ4MjI4ODc5LCJleHAiOjE3Nzk3NjQ4NzksImlzcyI6Imp1emlrb25nLW1pY3JvLXNlcnZpY2VzIn0.2ABWFxfVnvgBZhNel6fIWiIVBl2fr0lgxwl4po1ZNuQ';$done({'headers':requestHeaders});}else{$done({});}
