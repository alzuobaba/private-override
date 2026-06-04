/*
 *
 *
脚本功能：咪咕音乐
软件版本：7.48.0
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 去广告
^https://app\.c\.nf.migu\.cn/strategy/listen-url/v2.5 url 302 https://app.c.nf.migu.cn/strategy/listen-url/v2.4
^https://app\.c\.nf\.migu\.cn/member/api/marketing/text url reject
^https://app\.c.nf\.migu\.cn/payment/watch-ad url reject-200
# > 咪咕音乐vip、音质
^https?:\/\/(u|c|app).(musicapp|(c|u).nf).migu.cn.+(user\/api|column\/startup|resource\/skin) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/MGYY2.js
^https?:\/\/app.(c|pd).nf.migu.cn\/.*\/(listen-url|music\/batchQueryMusicPolicy|download-url).*$ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/MGYY2CK.js
[mitm] 
hostname = *.migu.cn
*
*
*/

"use strict";

if($request["url"]["indexOf"]("/strategy/listen-url/")!=-0x1){var _0x2452f6="1|5|2|0|4|3"["split"]('|'),_0x2810e2=0x0;while(!![]){switch(_0x2452f6[_0x2810e2++]){case'0':_0x27b8b4['ce']='';continue;case'1':var _0x27b8b4=$request["headers"];continue;case'2':_0x27b8b4["Cookie"]='';continue;case'3':$done({'headers':_0x27b8b4});continue;case'4':_0x27b8b4["bversionid"]='';continue;case'5':_0x27b8b4["uid"]="91414537623";continue;}break;}}if($request["url"]["indexOf"]("/music/batchQueryMusicPolicy.do")!=-0x1){var _0x5ca615="2|1|3|4|5|0"["split"]('|'),_0x5f0dce=0x0;while(!![]){switch(_0x5ca615[_0x5f0dce++]){case'0':$done({'headers':_0x5e6bfc});continue;case'1':_0x5e6bfc["uid"]="91414537623";continue;case'2':var _0x5e6bfc=$request["headers"];continue;case'3':_0x5e6bfc["Cookie"]='';continue;case'4':_0x5e6bfc['ce']='';continue;case'5':_0x5e6bfc["bversionid"]='';continue;}break;}}else if($request["url"]["indexOf"]("user/api/my-page-header/")!=-0x1){var _0x470580="7|3|4|5|2|6|8|1|0"["split"]('|'),_0x281a05=0x0;while(!![]){switch(_0x470580[_0x281a05++]){case'0':$done({'body':_0x50ab8a});continue;case'1':var _0x50ab8a=JSON["stringify"](_0x264071);continue;case'2':_0x264071["data"]["location"]="https://t.me/GieGie777";continue;case'3':_0x264071["data"]["userIdentityIconItems"][0x0]["iconUrl"]="https://d.musicapp.migu.cn/prod/file-service/file-down/bcb5ddaf77828caee4eddc172edaa105/7cd657454195aaeaea9e3c425491a0d0/74f77a7b9a47582a559762111ac8ba9b";continue;case'4':_0x264071["data"]["userIdentityIconItems"][0x0]["name"]="白金会员畅听版";continue;case'5':_0x264071["data"]["userIdentityIconItems"][0x0]["type"]="baijinhuiyuanchangtingban";continue;case'6':_0x264071["data"]["userOpNums"][0x5]["desc"]="999999";continue;case'7':var _0x264071=JSON["parse"]($response["body"]);continue;case'8':_0x264071["data"]["userOpNums"][0x5]["number"]=0xf423f;continue;}break;}}else if($request["url"]["indexOf"]("/column/startup-pic-with-ad")!=-0x1){var _0x33dad8=JSON["parse"]($response["body"]);delete _0x33dad8["data"];var _0x355684=JSON["stringify"](_0x33dad8);$done({'body':_0x355684});}else if($request["url"]["indexOf"]("resource/skin/list")!=-0x1){var _0x33dad8=JSON["parse"]($response["body"]);_0x33dad8["data"][0x0]["isVip"]='0';var _0x355684=JSON["stringify"](_0x33dad8);$done({'body':_0x355684});}else{$done({});}
