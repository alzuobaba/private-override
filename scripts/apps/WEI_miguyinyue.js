/*
 *
 *
脚本功能：咪咕音乐
软件版本：7.44.8
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 咪咕音乐vip、音质、下载
^https?:\/\/(u|c|app).(musicapp|c.nf).migu.cn.*(user\/(queryUserInfo.do|member\/center))|(column\/(startup-pic-with-ad|marketing\/advertising)|\/resource\/skin\/list\/).*$ url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/miguyinyue.js
^https?:\/\/app.(c|pd).nf.migu.cn\/.*\/(listen-url|music\/batchQueryMusicPolicy|download-url).*$ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/miguyinyue.js
^https://app\.c\.nf\.migu\.cn/member/api/marketing/text url reject
^https://app\.c.nf\.migu\.cn/payment/watch-ad url reject-200
[mitm] 
hostname = *.migu.cn
ce
*
*
*/

"use strict";

if($request["url"]["indexOf"]("/strategy/listen-url/")!=-0x1){var _0xb4bde2="2|5|0|3|4|1"["split"]('|'),_0x1191fa=0x0;while(!![]){switch(_0xb4bde2[_0x1191fa++]){case'0':_0x261e3b["Cookie"]='';continue;case'1':$done({'headers':_0x261e3b});continue;case'2':var _0x261e3b=$request["headers"];continue;case'3':_0x261e3b['ce']='';continue;case'4':_0x261e3b["bversionid"]='';continue;case'5':_0x261e3b["uid"]="91414537623";continue;}break;}}if($request["url"]["indexOf"]("/music/batchQueryMusicPolicy.do")!=-0x1){var _0x64ad9d="3|5|4|2|0|1"["split"]('|'),_0x545775=0x0;while(!![]){switch(_0x64ad9d[_0x545775++]){case'0':_0x39f72b["bversionid"]='';continue;case'1':$done({'headers':_0x39f72b});continue;case'2':_0x39f72b['ce']='';continue;case'3':var _0x39f72b=$request["headers"];continue;case'4':_0x39f72b["Cookie"]='';continue;case'5':_0x39f72b["uid"]="91414537623";continue;}break;}}if($request["url"]["indexOf"]("/strategy/download-url/")!=-0x1){var _0x1d54f2="4|2|0|3|1|5"["split"]('|'),_0x327fcd=0x0;while(!![]){switch(_0x1d54f2[_0x327fcd++]){case'0':_0x4dd9af["Cookie"]='';continue;case'1':_0x4dd9af["bversionid"]='';continue;case'2':_0x4dd9af["uid"]="15659432583520401615740";continue;case'3':_0x4dd9af['ce']='';continue;case'4':var _0x4dd9af=$request["headers"];continue;case'5':$done({'headers':_0x4dd9af});continue;}break;}}else if($request["url"]["indexOf"]("/column/marketing/advertising")!=-0x1){var _0x4dcda8="0|2|5|1|3|4"["split"]('|'),_0x175c78=0x0;while(!![]){switch(_0x4dcda8[_0x175c78++]){case'0':var _0x335884=JSON["parse"]($response["body"]);continue;case'1':_0x335884["data"][0x0]["desc"]="Telegram";continue;case'2':_0x335884["data"][0x0]["title"]="2999-09-09会员到期,ヵ";continue;case'3':var _0x1c7659=JSON["stringify"](_0x335884);continue;case'4':$done({'body':_0x1c7659});continue;case'5':_0x335884["data"][0x0]["actionUrl"]="https://t.me/GieGie777";continue;}break;}}else if($request["url"]["indexOf"]("/user/member/center/")!=-0x1){var _0x2486df="1|3|0|6|4|5|2"["split"]('|'),_0x4751b1=0x0;while(!![]){switch(_0x2486df[_0x4751b1++]){case'0':_0x31df5d["data"]["memberIdentityRightsItem"]["identityFullPinYin"]="baijinhuiyuan";continue;case'1':var _0x31df5d=JSON["parse"]($response["body"]);continue;case'2':$done({'body':_0x543560});continue;case'3':_0x31df5d["data"]["memberIdentityRightsItem"]["identityName"]="白金会员";continue;case'4':_0x31df5d["data"]["displayModuleInfos"]=[];continue;case'5':var _0x543560=JSON["stringify"](_0x31df5d);continue;case'6':_0x31df5d["data"]["memberRights"]=[];continue;}break;}}else if($request["url"]["indexOf"]("/user/queryUserInfo.do")!=-0x1){var _0x487472="2|5|0|1|4|3"["split"]('|'),_0x1d6d13=0x0;while(!![]){switch(_0x487472[_0x1d6d13++]){case'0':_0x4e968a["userInfoItem"]["nickName"]="https://t.me/GieGie777";continue;case'1':_0x4e968a["userInfoItem"]["smallIcon"]="http://ykhp-user-imges.yikaobang.com.cn/Uploads/Avatar/2024/08/18/66c188e2d4fab.jpg";continue;case'2':var _0x4e968a=JSON["parse"]($response["body"]);continue;case'3':$done({'body':_0x4b5e35});continue;case'4':var _0x4b5e35=JSON["stringify"](_0x4e968a);continue;case'5':_0x4e968a["userInfoItem"]["userType"]='01';continue;}break;}}else if($request["url"]["indexOf"]("/column/startup-pic-with-ad")!=-0x1){var _0x16024c=JSON["parse"]($response["body"]);delete _0x16024c["data"];var _0xe555b4=JSON["stringify"](_0x16024c);$done({'body':_0xe555b4});}else if($request["url"]["indexOf"]("resource/skin/list")!=-0x1){var _0x16024c=JSON["parse"]($response["body"]);_0x16024c["data"][0x0]["isVip"]='0';var _0xe555b4=JSON["stringify"](_0x16024c);$done({'body':_0xe555b4});}else{$done({});}
