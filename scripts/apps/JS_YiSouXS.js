var body = JSON.parse($response.body);

body.vipInfo.vip = true;
body.vipInfo.vipStatus = 1;
body.vipInfo.expireTime = 4092610661000;
body.vipInfo.autoTime = 4092610661000;

body.svipInfo.svip = true;
body.svipInfo.expireTime = 4092610661000;

body.freeInfo.freePrivilege = true;
body.freeInfo.expired = false;
body.freeInfo.expireTime = 4092610661000;

body.adCount = 0;
body.bookcaseAdCnt = 0;
body.extChargeAdCnt = 0;

body.adStatus.daysNum = 365;
body.adStatus.remainingTime = 99999999;
body.adStatus.begin = 0;
body.adStatus.end = 4102415999;

body.charge = true;
body.balance = 999999;

$done({ body: JSON.stringify(body) });
