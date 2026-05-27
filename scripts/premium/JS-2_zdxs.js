/******************************
脚本功能：追读小说-解锁会员
脚本作者：afengye
脚本频道：https://t.me/afengye
注意事项：需登录
使用声明：️仅供学习交流
*******************************
[rewrite_local]
# > 追读小说-解锁会员
^https:\/\/dj\.palmestore\.com\/zyuc\/api\/user\/accountInfo(.?)+ url script-response-body https://raw.githubusercontent.com/afengye/QX/main/zdxs.js

[mitm]
hostname = dj.palmestore.com
*******************************/

let obj = JSON.parse($response.body);

obj.body.userInfo.vipInfo = {
    ...obj.body.userInfo.vipInfo,
    "vipType" : 1,
    "vipExpire" : 32472115200,
    "expireDate" : "2999-01-01"
}

$done({body: JSON.stringify(obj)});
