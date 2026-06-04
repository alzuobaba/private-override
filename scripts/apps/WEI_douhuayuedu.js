/*
 *
 *
脚本功能：豆花阅读-耽美言情百合小说大全 解锁金币章节购买
软件版本：10.11.1
下载地址：
脚本作者：
更新时间：2025年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >豆花阅读-耽美言情百合小说大全 解锁金币章节购买
^https?:\/\/api.douhuawenxue.com\/(index.php\/home\/splash_screen|new_user\/new_user\/personal_center) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/douhuayuedu.js
^https?:\/\/api.douhuawenxue.com\/index.php\/post\/(view|buy_chapter) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/douhuayuedu.js


[mitm]
hostname = api.douhuawenxue.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("/index.php/post/buy_chapter")!=-0x1){var _0x246b7f=$request["headers"];_0x246b7f["Cookie"]="uid=1832316; skey=; cskey=; clientid=; aid=3; av=10.11.1; ch=App Store; os=iOS-16.2; md=iPhone 12 Pro Max; wh=428*926; xx=0";_0x246b7f["device-id"]="0C40D163AB38438A8500959ED99CAAAA";$done({'headers':_0x246b7f});}if($request["url"]["indexOf"]("/index.php/post/view/")!=-0x1){var _0x37fdac="2|0|3|4|1"["split"]('|'),_0x4b00b0=0x0;while(!![]){switch(_0x37fdac[_0x4b00b0++]){case'0':var _0x1e387b=$request["headers"];continue;case'1':$done({'headers':_0x1e387b});continue;case'2':var _0x1e387b=$request["headers"];continue;case'3':_0x1e387b["Cookie"]="uid=1832316; skey=; cskey=; clientid=; aid=3; av=10.11.1; ch=App Store; os=iOS-16.2; md=iPhone 12 Pro Max; wh=428*926; xx=0";continue;case'4':_0x1e387b["device-id"]="0C40D163AB38438A8500959ED99CAAAA";continue;}break;}}else if($request["url"]["indexOf"]("/new_user/personal_center")!=-0x1){var _0x558fd7="2|1|8|0|3|5|6|9|7|4"["split"]('|'),_0x5631ec=0x0;while(!![]){switch(_0x558fd7[_0x5631ec++]){case'0':_0x2c722c["data"]["user"]["level"]=0x14;continue;case'1':_0x2c722c["data"]["user"]["is_vip"]=0x1;continue;case'2':var _0x2c722c=JSON["parse"]($response["body"]);continue;case'3':_0x2c722c["data"]["tints"]["my_assets"]="999880阅读券";continue;case'4':$done({'body':_0x2c5fde});continue;case'5':_0x2c722c["data"]["tints"]["my_coins"]="999880超级阅读卷";continue;case'6':_0x2c722c["data"]["user"]["nickname"]="https://t.me/GieGie777";continue;case'7':var _0x2c5fde=JSON["stringify"](_0x2c722c);continue;case'8':_0x2c722c["data"]["user"]["is_year_vip"]=0x1;continue;case'9':_0x2c722c["data"]["user"]["icon"]="https://zhongdu.oss-cn-beijing.aliyuncs.com/app/20250723/17532551159065978.jpg";continue;}break;}}else if($request["url"]["indexOf"]("/index.php/home/splash_screen")!=-0x1){var _0x221457="2|4|3|0|1"["split"]('|'),_0x5a7844=0x0;while(!![]){switch(_0x221457[_0x5a7844++]){case'0':var _0x4313e4=JSON["stringify"](_0x101d73);continue;case'1':$done({'body':_0x4313e4});continue;case'2':var _0x101d73=JSON["parse"]($response["body"]);continue;case'3':_0x101d73["data"]["img"]="http://imgold.douhuawenxue.com/diaobaoimg/C9/EF/A-kdZKDXLILQiAYxuzL1TAGFQhjMZvuAwuptdIRjNZDLIHRiRXf7t-aesD8s.jpeg";continue;case'4':delete _0x101d73["data"]['ad'];continue;}break;}}else{$done({});}setInterval(function(){var _0x21cc73={'Dnzuh':;
