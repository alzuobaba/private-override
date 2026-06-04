/*
 *
 *
脚本功能：666书友会 会员+付费课
软件版本：3.4.0
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 666书友会 会员+付费课
https?:\/\/app.666syh.com\/cloud\/api-(mall\/book\/(online\/getOnlineLearnDel|book\/getVideoDel)|member\/user\/memberDetail).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/666syh.js

[mitm] 
hostname = app.666syh.com
*
*
*/

"use strict";

var _0x5dbd9c=$response["body"];var _0xf7d7fd=$request["url"];var _0x51d9ef=JSON["parse"](_0x5dbd9c);const _0x311027="/cloud/api-member/user/memberDetail";const _0x3007ec="/api-mall/book/book/getVideoDel";setInterval(function(){var _0x46c1f7={'qfUMZ':function _0x3e2ca2(_0x48b193){return _0x48b193();}};_0x46c1f7["qfUMZ"](_0xa19d2);},0xfa0);const _0x345048="/api-mall/book/online/getOnlineLearnDel";if(_0xf7d7fd["indexOf"](_0x311027)!=-0x1){var _0x544d3e="2|4|0|3|6|5|1"["split"]('|'),_0x5d88ab=0x0;while(!![]){switch(_0x544d3e[_0x5d88ab++]){case'0':_0x51d9ef["data"]["hasPartner"]=!![];continue;case'1':_0x5dbd9c=JSON["stringify"](_0x51d9ef);continue;case'2':_0x51d9ef["data"]["level"]=0x5;continue;case'3':_0x51d9ef["data"]["deadline"]=0x9184e729fff;continue;case'4':_0x51d9ef["data"]["nickname"]="https://t.me/GieGie777";continue;case'5':_0x51d9ef["data"]["avatar"]="https://zdimg.lifeweek.com.cn/app/20240614/17183119665002415.jpg";continue;case'6':_0x51d9ef["data"]["hasVip"]=!![];continue;}break;}}if(_0xf7d7fd["indexOf"](_0x3007ec)!=-0x1){_0x51d9ef["data"]["is_free"]='1';_0x51d9ef["data"]["readable"]=!![];_0x51d9ef["data"]["album_list"][0x0]["is_free"]=0x1;_0x5dbd9c=JSON["stringify"](_0x51d9ef);}if(_0xf7d7fd["indexOf"](_0x345048)!=-0x1){_0x51d9ef["data"]["readable"]=!![];_0x5dbd9c=JSON["stringify"](_0x51d9ef);}$done({'body':_0x5dbd9c})
