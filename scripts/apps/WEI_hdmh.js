/*
 *
 *
脚本功能：画眈漫画VIP
软件版本：1.1.2
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >画眈漫画
^https?:\/\/www.shutiaomh.com\/api\/\/getSysUserInfo url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/hdmh.js
^https?:\/\/www.shutiaomh.com\/api\/\/(novel|cartoon)Chapter\/info\/size\/ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/hdmh.js
# >去广告
^https?://mobads.baidu.com url reject-dict
^https?://bgg.baidu.com url reject-dict
^https?://sf3-fe-tos.pglstatp-toutiao.com url reject-dict
^https?://cmyd-10-88.getui.com url reject-dict
^https?://open.e.kuaishou.com url reject-dict
^https?://api-access.pangolin-sdk-toutiao.com url reject-dict
^https?://toblog.ctobsnssdk.com url reject-dict
^https?://log-api.pangolin-sdk-toutiao.com url reject-dict
^https?://api-access.pangolin-sdk-toutiao1.com url reject-dict
^https?://log-api.pangolin-sdk-toutiao-b.com url reject-dict
^https?://api-access.pangolin-sdk-toutiao1.com url reject-dict
^https?://log-api.pangolin-sdk-toutiao.com url reject-dict
^https?://api-access.pangolin-sdk-toutiao1.com url reject-dict
^https?://log-api.pangolin-sdk-toutiao-b.com url reject-dict
^https?://api-access.pangolin-sdk-toutiao-b.com url reject-dict
^https?://b-gy.getui.net url reject-dict
^https?://gy.gepush.com url reject-dict
^https?://mssdk.volces.com url reject-dict
^https?://sdk.open.talk.getui.net url reject-dict
^https?://gromore.pangolin-sdk-toutiao.com url reject-dict
^https?://sdk.open.talk.gepush.com url reject-dict
^https?://adservice.sigmob.cn url reject-dict
^https?://sdk.open.talk.getui.com url reject-dict
^https?://yun.tuitiger.com url reject-dict
^https?://mobads-pre-config.cdn.bcebos.com url reject-dict
^https?://mobads-logs.baidu.com url reject-dict



[mitm]
hostname = www.shutiaomh.com,mobads.baidu.com,bgg.baidu.com,sf3-fe-tos.pglstatp-toutiao.com,cmyd-10-88.getui.com,open.e.kuaishou.com,api-access.pangolin-sdk-toutiao.com,toblog.ctobsnssdk.com,log-api.pangolin-sdk-toutiao.com,api-access.pangolin-sdk-toutiao1.com,log-api.pangolin-sdk-toutiao-b.com,api-access.pangolin-sdk-toutiao-b.com,b-gy.getui.net,gy.gepush.com,mssdk.volces.com,sdk.open.talk.getui.net,gromore.pangolin-sdk-toutiao.com,sdk.open.talk.gepush.com,adservice.sigmob.cn,sdk.open.talk.getui.com,yun.tuitiger.com,mobads-pre-config.cdn.bcebos.com,mobads-logs.baidu.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("Chapter/info/size/")!=-0x1){var _0x10742a=$request["headers"];_0x10742a["Authorization"]="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ0bnRfdG9rZW4iLCJzYWx0IjoiZGJhNjU1ZTZhNGEzMGE1NDQyYTcwZWM3ZjRlMWNhNmVlZDQ4YzVkMDNiNjlmMTM4OGI5MzZkMmFkOTJjMThjMCIsImlzcyI6IlJlYWQiLCJ1c2VydHlwZSI6ImdlbmVyYWwiLCJleHAiOjE3NDkyNzI4MjEsInVzZXJJZCI6IjEwMjE1MjI2IiwiaWF0IjoxNzQzMjI0ODIxLCJqdGkiOiI3YmQ5ODI2MjY0MzQ0OGQ3YmEyNjFlZmFiN2YyZDBmMyIsInVzZXJuYW1lIjoiNzdCMjFGMEU1NUUwOUI4Q0EzRjhDRUZFRUIzRTQxODMifQ.p3Ox5hMIrzGawJ2IRp6e0yumixjuqefkxZ5RZiepzwA";$done({'headers':_0x10742a});}else if($request["url"]["indexOf"]("/getSysUserInfo")!=-0x1){var _0x5f5338="5|4|1|7|2|3|8|6|0"["split"]('|'),_0x485cea=0x0;while(!![]){switch(_0x5f5338[_0x485cea++]){case'0':$done({'body':_0x47810e});continue;case'1':_0xa3c88b["data"]["vipDays"]=0x1;continue;case'2':_0xa3c88b["data"]["nickname"]="https://t.me/GieGie777";continue;case'3':_0xa3c88b["data"]["headImg"]="https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";continue;case'4':_0xa3c88b["data"]["coins"]=0xf41c8;continue;case'5':var _0xa3c88b=JSON["parse"]($response["body"]);continue;case'6':var _0x47810e=JSON["stringify"](_0xa3c88b);continue;case'7':_0xa3c88b["data"]["level"]=0x3e7;continue;case'8':_0xa3c88b["data"]["expireDays"]="2999-09-09 09:09:09";continue;}break;}}else{$done({});}
