/*************************************

项目名称：书旗小说
脚本作者：alzuobaba
- 超级会员特权 解锁任意付费及会员章节
- 去除阅读页广告
- 跳过看广告解锁章节

*************************************/
"use strict"

var url = $request.url;

// ===== type: request - 替换 userinfo 请求体 =====
if (url.indexOf('userinfo/info') !== -1) {
  console.log($script.name + ": userinfo - 替换加密请求体");
  $done({
    body: "data=uBs0e8ncfJxiL34cGbc6iLS305aVuItcjz6oOzuFirg4uUbPMaRhN4z4C1I2iYZdiujQKCKdV5hQ4zJVuYsQP5k0gtdHIM6SlqmyZUsZRAmIM8XAvFhnHSEF0iby80dQ9F2RjaoxHEso4wicmHdoewNokHJFuFx5LOKZ5SdV3EBtWglsUulC8dNEDdH1v/JZYBtYO7MHOMp/mDpmO7JQ8LR0ZUeDy6p9H%2BoUzDzG8sISKIYlVAM0gMA5XMk6ghmBmtJV35a5w3JXYYILzZmr31e9HS7TYyggWCpUZEWXJC/YPwoOE%2Bmyj94mvOfZTFGYczJxbcIor8D1KR0rMgNLMhq7jmNTOB/CWlv6g4lp8ZJD73LGug/5WTQJrSCHwoY8vK/KPPJ1UMPT8gRsNyZhjyLAJ4zhVzKUYcjUyt6fORoDspZ06lAMMNCgyuzo3RB1C16MX0V0rGJYwyohEXOa/Hjc7sMWEJwLwu%2BsLYf%2B0Aqfn0zfF1tvWKnJPhsV5duu5flmrPdloQgqZtl/HhOg5T1EJhIn85ocOTRJmtFHPKNzNC3jU5MnFM00PG%2BPcRnlQ4HS4lRwB0JG4dSHyDhmK9MYqYm/xmBJuFd18AEV0ut2skfgL829JBlNyFj640i/0XbICSQC/XHGKHInmx7tg66g1J2MlvThkHareELTl%2BcYCTFSL%2BFzWNr3mEf3s56nGwOkLZn3OqEDQcvERcJBlnwrO%2BL/yV2JPptL%2BnGHjnw3ffcm70DqjGc5q8ccIOBvYMnwntVOchd81lTU%2BptPpyMyQBBd5Iq/H%2BUzAo4bDGLQmOG2zpS0J4xwWIoaPPUxRghMktG8DqgZNdUANq9wvmJJaH0VVUv%2BaYVfnrlVgKvGmdq4xkXxVaRlJ56HPyz9rtvSFZTwxBR0hG8h98lnFK%2BbQ0LPAyDt0pcOdQXf1Ip72VgJIeS/S2ZKgtx7XX/nh5QG8IGJiyuFVulguoRr14JT/VYgxv3m0mpqxzUWelPaFnR0ikTe4ofsKtQ1MOOxcw9IA7kVw8HvzBQXObC8L1lPZbiwGe0gi8bTs3RrRLOzgGJdT6tmxIS3U31Sfa6rCyeyBLJMsOPVGESo1lK%2BnLhTSaSh55dgGNo/9LQmqCiA4%2B%2B8GhieK%2BVPVmTo1mXiTZe9DH16daUQjXnY8Sm/n7g62CnacIOoWQtot0dfBK6tyFtrznAZPNdCj7kBgazBbAQ%2Bzz9gi0H1FzmzJ6ZB9TatIThDlSkCburhwUvwutRgcOFzXTBa5S1Xdn5jrBJX%2Bf1vwvenp8h1vAtCpm1y4MlntiAQmjLa0L1chmk9ARvL8hHdW5qIFGDILOV7kEwCYkU1U4BtLPRSVPFOGa7eKWn0%2BM1ROcMtfsOq4usz%2BIH6FXqBBbU6QTzSCFhKphrguQC%2BPMBNqgszWwxWSYxQ3Ac2JG1NAT7fT46E%2BbRzBzJCCx3KqyWlHN9Tt7sDWUNTSTCy78Nz48rtQRGbiuU9P%2B7OtCv4PVA9nvzyElmsJmL5QdHP0z5vEPaMlswiGBfqOByTx78BM0PzrCR4gW99N3IJLqqvH4SqBhN06PJeqkHpg91geYTI0aG/fHPVTyBhZ4Y0vrCiXEMNgqmHg3tLaSnQVRBlVQlsx1UPXQKujdsdVTrnBeWOaZ3260HiHBiOrjVCl7d34Jsnk6TBY6HpcqZriK4f6Hs4kHCUpJa4fXWm%2B9m7xHkYa8bFBQRbok7qWPN15LhR3iWNSN1hoY0YUUi42Azj8FOx/g56L521e%2BnhWZogZU6eZjmLpNS/b51eUF0Y08tf7oYDUfzUUcHNMIGC7mil15GlrKCGtoA4gTvysHYcanfxKrmNkJZAinZdkYZ6vCaffop%2BYJ/wcwQjlEC4DvSJHUAD0pHeetcBsWPgbVBNFAg8HnXuPcPWePt7Vx/BhkZJ%2BUCE4kZ3E0gPaYKrcglxyxLrwq3B8Gmmq5MsCzB71fZ%2B%2B5B2m2sLSk4edmO4pjAWEBxPDXaUqXhdNIiGq3w4UXNWNzP2Icdqp9MbwDeuwObc5UL%2BtdSWNE39432nszsybC9WMzP%2BxHXKGka7bgnNjHKF1v4W32GY%2BwwOJ4%2BXazuYqxj8Aa/T1OQo73z/y9KeUUT9WI0phXpyP8G9gxQ%3D"
  });
  return;
}

// ===== 以下为 type: response 处理 =====
var body = JSON.parse($response.body);

// 页面商店 - 注入 VIP 会员卡片
if (url.indexOf('/page/bookstore') !== -1) {
  console.log($script.name + ": bookstore - 注入VIP会员信息");
  body.data.moduleInfos[0] = {
    "description": "2099-09-09 到期",
    "vipIcon": "https://img-tailor.11222.cn/cms/upload/img/1657626220526bac15a40063500b21fc513a85e947cd1.png",
    "template": "SqVipChannelUserInfo",
    "vipExpireInfo": "2099-09-09 到期",
    "vipChannelEntries": [
      { "name": "欢迎", "icon": "https://img-tailor.11222.cn/cms/upload/img/1657626220526bac15a40063500b21fc513a85e947cd1.png", "jumpUrl": "https://t.me/chxm1023" },
      { "name": "加入", "icon": "https://img-tailor.11222.cn/cms/upload/img/1661320717929918eaecd796da38e82d27de64df6d0c2.png", "jumpUrl": "https://t.me/chxm1023" }
    ],
    "buttonText": "频道@chxm1023",
    "moduleName": "ios-黑金会员【会员】",
    "source": "passthrough",
    "avatar": "http://img-tailor.11222.cn/account/avatar/4627c0ff831973e513bc8b4f4e3c3aee@120w_120h",
    "templateVersion": "latest",
    "buttonUrl": "https://t.me/chxm1023",
    "displayTemplate": "SqVipChannelUserInfo",
    "nickName": "请勿删除书架感谢Baby",
    "moduleId": 9,
    "vipType": 1,
    "x-moduleOrd": 4
  };
  console.log($script.name + ": VIP card injected");
}

// 去除阅读页广告
if (url.indexOf("/adV2") !== -1) {
  console.log($script.name + ": 去除阅读页广告");
  if (body.data) {
    if (body.data.middle) {
      body.data.middle.isShowAd = 0;
      body.data.middle.freeAdTime = 999999;
      body.data.middle.showTailForceAd = 0;
      body.data.middle.showRule = "0";
    }
    if (body.data.userInfo) {
      body.data.userInfo.userFreeAdTime = 999999;
    }
  }
  console.log($script.name + ": ads disabled");
}

// 跳过看广告解锁章节
if (url.indexOf("/adTurnChapter") !== -1) {
  console.log($script.name + ": 跳过看广告解锁");
  if (body.data) {
    body.data.adFreeVideo = {
      "status": 1,
      "freeChapterNum": 999,
      "freeTime": 999999
    };
  }
  console.log($script.name + ": ad turn chapter bypassed");
}

// VIP 定价显示为 0
if (url.indexOf("/commodityInfoV3") !== -1) {
  console.log($script.name + ": VIP 定价修改");
  if (body.data && body.data.play && body.data.play.monthlyInfo) {
    body.data.play.monthlyInfo.forEach(function(item) {
      item.money = 0;
      item.sdou = 0;
      item.lowestPrice = 0;
    });
  }
  console.log($script.name + ": VIP pricing modified");
}

$done({ body: JSON.stringify(body) });
