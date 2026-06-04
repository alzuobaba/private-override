/*
 *
 *
脚本功能：QQ阅读 会员读书
软件版本：8.3.01
下载地址：
脚本作者：
更新时间：2025年0820
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >QQ阅读 会员读书
^https?:\/\/(detailadr|commontgw).reader.qq.com\/(book\/queryDetailPage|.+nativepage\/personal|.+vip\/viptxt) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/QQYD.js
^https?:\/\/newminerva-tgw.reader.qq.com\/ChapBatAuthWithPD url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/QQYD.js

[mitm] 
hostname = *.reader.qq.com,newminerva-tgw.reader.qq.com,detailadr.reader.qq.com,commontgw.reader.qq.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("ChapBatAuthWithPD")!=-0x1){let _0x39a195={'Accept':"*/*",'uid':"855104184376",'qrtm':"1755667041",'trustedid':"cc499a87513a7e422edb7d93fa76953c1",'ua':"iPhone 14 Pro Max-iOS16.6",'qrem':'0','Accept-Encoding':"gzip",'net_type':'1','platform':"ioswp",'rcmd':'1','youngerMode':'0','mldt':"e6adcbb59b681e6de4826a89b4937fce99b7f5e8c4e696ed",'sid':'','usid':"ykWXgTClWTNp",'text_type':'1','csigs':"$2a$04$PMpmckgTeY9sKc7rI1wg/uKaWYs4FEpkwXGqDL7acmZj/nX6AD9zK",'loginType':'50','ywtoken':"145d2e8d52880742ff2f97a67404d308",'version':"qqreader_8.3.01.0671_iphone",'QVisible':'0','Accept-Language':"zh-CN,zh-Hans;q=0.9",'User-Agent':"QQReaderUI/51517 CFNetwork/1410.0.3 Darwin/22.6.0",'Range':"bytes=0-",'qrsy':"bd3249b9f89671bdf5894910db2cd748",'ywkey':'','ttime':"1755667041768",'safkey':"59935295922cf6f7510ab2bbaaccd9b6",'sex':'0','ibex':"FCOaA2gQ_okKj4LnFS5nkxbddlBscguu80SM7WKU_6VYDLFk9TxR5nCaF3_OuKJs14XSt_mgZLeNorXHHyS-_9_UBaYSGyVja5e7H04xrVTdWyWGRxw6YiVrL4oikgreZsuoQ1t4TllZfRC0IL5XBPMpLM56tl_VQVqGMbpI1WH2OeDdvB6cfUR5TEVQGDz5EefyTcVrGdv9DML8tFkWnH8I-BCL50cU7K14DN-h0_wzNGI4MGY0YWI5OTZiYmI0NDA5ZGRkYWQ2YmMyODM5Yg==",'ssign':"7c77131ce7ac9ddc23bead8009d334c5",'osvn':"49e513e1a56c8b00",'dene':"7bb7b3e5516e8abc",'auditStatus':'1','Host':"newminerva-tgw.reader.qq.com",'ywguid':'','sift':"4bd5dc0dac2f3b56a250bd32482ff26afaaa74428bb256fd220c68d3bb6b4bdfd37e835e31bec80f5b4a906edd4938c3",'qrsn':"5f6204fb00e820b59200d985000013f19610",'server_sex':'1','dete':"47f73415b4bcc5d9e1673f41cb850b3f",'themeid':'0','Connection':"keep-alive",'stat_params':"{\"bid\":\"54568016\",\"tabtype\":\"1\",\"qaDay\":\"0\",\"userdegree\":\"0\",\"islogin\":\"1\"}",'IFDA':"MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAw",'nosid':'1','gselect':'0','qrsn_new':"5f6204fb00e820b59200d985000013f19610",'jailbreak':'0'};$done({'headers':_0x39a195});}else if($request["url"]["indexOf"]("/nativepage/personal")!=-0x1){var _0x24e533="13|2|0|7|6|8|9|4|1|11|14|12|10|3|5"["split"]('|'),_0x340c02=0x0;while(!![]){switch(_0x24e533[_0x340c02++]){case'0':_0x47be26["personal"]["monthUser"]["monthStatus"]=0x1;continue;case'1':_0x47be26["personal"]["monthUser"]["label"]="2999-09-09到期";continue;case'2':_0x47be26["personal"]["monthUser"]["paidVipStatus"]=0x2;continue;case'3':var _0x46628c=JSON["stringify"](_0x47be26);continue;case'4':_0x47be26["personal"]["monthUser"]["title"]="年卡会员";continue;case'5':$done({'body':_0x46628c});continue;case'6':_0x47be26["personal"]["monthUser"]["mVipType"]=0x1;continue;case'7':_0x47be26["personal"]["monthUser"]["smsVip"]=0x1;continue;case'8':_0x47be26["personal"]["accountInfo"]["balance"]=0xf41c8;continue;case'9':_0x47be26["personal"]["accountInfo"]["bookTicket"]=0xf41c8;continue;case'10':delete _0x47be26["personal"]["confList"];continue;case'11':_0x47be26["personal"]["userInfo"]["vipLevel"]=0x1;continue;case'12':_0x47be26["personal"]["userInfo"]["icon"]="https://zhongdu.oss-cn-beijing.aliyuncs.com/app/20250723/17532551159065978.jpg";continue;case'13':var _0x47be26=JSON["parse"]($response["body"]);continue;case'14':_0x47be26["personal"]["userInfo"]["nick"]="https://t.me/GieGie777";continue;}break;}}else if($request["url"]["indexOf"]("/book/queryDetailPage")!=-0x1){var _0x46c7bf="2|6|5|4|3|0|1"["split"]('|'),_0x519014=0x0;while(!![]){switch(_0x46c7bf[_0x519014++]){case'0':var _0x25aefe=JSON["stringify"](_0x531bbb);continue;case'1':$done({'body':_0x25aefe});continue;case'2':var _0x531bbb=JSON["parse"]($response["body"]);continue;case'3':_0x531bbb["introinfo"]["detailmsg"]["equityDisplay"]=!![];continue;case'4':_0x531bbb["introinfo"]["detailmsg"]["txtStyle"]=0x2;continue;case'5':_0x531bbb["introinfo"]["detailmsg"]["equityTxt"]="本书已解锁";continue;case'6':_0x531bbb["vipStatus"]=0x1;continue;}break;}}else if($request["url"]["indexOf"]("/vip/viptxt")!=-0x1){var _0x5bfe6f=JSON["parse"]($response["body"]);_0x5bfe6f["allowMonthlyPay"]=0x2;var _0x1e45ec=JSON["stringify"](_0x5bfe6f);$done({'body':_0x1e45ec});}else{$done({});}
