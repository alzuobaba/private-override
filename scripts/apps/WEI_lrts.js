/*
 *
 *
脚本功能：懒人听书 解锁vip
软件版本：8.6.02
下载地址：苹果商店下载
脚本作者：
更新时间：2025年0310
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 懒人听书vip
^https?:\/\/(shapi|gzapi).(mting.info|lanrentingshu.com)\/(yyting\/userclient\/ClientGetUserInfo|lrts\/cgi\/login\/accountLogin) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/lrts.js

[mitm] 
hostname = shapi.mting.info,shapi.lanrentingshu.com,gzapi.lanrentingshu.com,shapi.mting.info:443
*
*
*/

"use strict";

const _0x2900c3=$request["url"]||'';if(_0x2900c3["includes"]("/login/accountLogin")){_0x172c71=JSON["stringify"]({'status':0x0,'data':{'accountStatus':0x1,'loginStatus':0x0,'userId':0x0,'token':"pXuvu3E58VTP1SZKF6GjFg**_l9-Cx2x-tHgWNPuWjY2nsg**",'authToken':"iP-JEamtulpyrlqrqDYl8chi56olc1GZE4I6MFKhHudsMb5Lb0UvGMVgMgMCiTWzMtnFjRGxBg8wJVSugrChyw=="},'msg':'','apiStatus':0x0});}if(_0x2900c3["includes"]("userclient/ClientGetUserInfo")){try{const _0x47f3d4=JSON["parse"](_0x172c71);_0x47f3d4["description"]="此脚本仅供学习与交流，下载后请24小时内删除！";_0x47f3d4["nickname"]="https://t.me/GieGie777";_0x47f3d4["cover"]="https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";_0x47f3d4["timeRemaining"]=0xf41c8;_0x172c71=JSON["stringify"](_0x47f3d4);}catch(_0x383572){}}$done({'body':_0x172c71});
