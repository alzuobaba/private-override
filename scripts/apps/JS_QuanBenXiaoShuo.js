/*******************************

脚本功能：话本小说——淘小说——解锁VIP
下载地址：全本小说-https://is.gd/wO7hwg;淘小说-https://apps.apple.com/app/id1228995359
软件版本：2.5.2
脚本作者：彭于晏💞
更新时间：2024-10—8
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]
^https?:\/\/t(f|y)book.taoyuewenhua.net\/(auth\/account\?adid|auth\/task_account_ios.do\?|wx_register.do\?|auth\/try_wx_bind\?).*$ url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/qbxs.js

[mitm]
hostname = tfbook.taoyuewenhua.net, tybook.taoyuewenhua.net

********************************/
"use strict"
console.log($script.name)




var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const p1 = '/task_account_ios.do?';
const p2 = '/auth/account?adid';
const p3 = 'wx_';

//cion
if (url.indexOf(p1) != -1) {
    obj.data.money = 999999;
    obj.data.coins = 999999;
    body = JSON.stringify(obj);
}
//vip
if (url.indexOf(p2) != -1) {
    obj.data.paymentUser = true;
    obj.data.isVip = true;
    body = JSON.stringify(obj);
}
//Login
if (url.indexOf(p3) != -1) {
    obj.data.nickname = "https://t.me/py996";
    body = JSON.stringify(obj);
}


$done({
    body
});
