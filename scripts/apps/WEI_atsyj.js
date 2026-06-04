/*
 *
 *
脚本功能：收音机-fm广播电台-爱听收音机 vip
软件版本：2.3
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >收音机-fm广播电台-爱听收音机
^https?:\/\/tuoba.dida110.com\/(LRGetVipItem|LRGetMeCount).ashx url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/atsyj.js


[mitm]
hostname = tuoba.dida110.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/LRGetVipItem.ashx")){let _0x57884a=JSON["parse"]($response["body"]);Object["assign"](_0x57884a["result"],{'ButtonDes':"https://t.me/GieGie777",'BannerPicNew':"https://zhongdu.oss-cn-beijing.aliyuncs.com/app/20250329/17432577303308433.jpg",'BannerPic':"https://zhongdu.oss-cn-beijing.aliyuncs.com/app/20250329/17432577303308433.jpg"});$done({'body':JSON["stringify"](_0x57884a)});}else if($request["url"]["includes"]("/LRGetMeCount.ashx")){let _0x2a4f27=JSON["parse"]($response["body"]);Object["assign"](_0x2a4f27["result"],{'UserVip':0x1});$done({'body':JSON["stringify"](_0x2a4f27)});}
