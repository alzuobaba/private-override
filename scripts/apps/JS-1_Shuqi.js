
"use strict"

console.log($script.name);
var url = $request.url;

if (url.indexOf('userinfo/info') !== -1) {
  $done({
    body: "data=uBs0e8ncfJxiL34cGbc6iLS305aVuItcjz6oOzuFirg4uUbPMaRhN4z4C1I2iYZdiujQKCKdV5hQ4zJVuYsQP5k0gtdHIM6SlqmyZUsZRAmIM8XAvFhnHSEF0iby80dQ9F2RjaoxHEso4wicmHdoewNokHJFuFx5LOKZ5SdV3EBtWglsUulC8dNEDdH1v/JZYBt" +
    "YO7MHOMp/mDpmO7JQ8LR0ZUeDy6p9H%2BoUzDzG8sISKIYlVAM0gMA5XMk6ghmBmtJV35a5w3JXYYILzZmr31e9HS7TYyggWCpUZEWXJC/YPwoOE%2Bmyj94mvOfZTFGYczJxbcIor8D1KR0rMgNLMhq7jmNTOB/CWlv6g4lp8ZJD73LGug/5WTQJrSCHwoY8vK/KPPJ" +
    "1UMPT8gRsNyZhjyLAJ4zhVzKUYcjUyt6fORoDspZ06lAMMNCgyuzo3RB1C16MX0V0rGJYwyohEXOa/Hjc7sMWEJwLwu%2BsLYf%2B0Aqfn0zfF1tvWKnJPhsV5duu5flmrPdloQgqZtl/HhOg5T1EJhIn85ocOTRJmtFHPKNzNC3jU5MnFM00PG%2BPcRnlQ4HS4lRwB" +
    "0JG4dSHyDhmK9MYqYm/xmBJuFd18AEV0ut2skfgL829JBlNyFj640i/0XbICSQC/XHGKHInmx7tg66g1J2MlvThkHareELTl%2BcYCTFSL%2BFzWNr3mEf3s56nGwOkLZn3OqEDQcvERcJBlnwrO%2BL/yV2JPptL%2BnGHjnw3ffcm70DqjGc5q8ccIOBvYMnwntVOc" +
    "hd81lTU%2BptPpyMyQBBd5Iq/H%2BUzAo4bDGLQmOG2zpS0J4xwWIoaPPUxRghMktG8DqgZNdUANq9wvmJJaH0VVUv%2BaYVfnrlVgKvGmdq4xkXxVaRlJ56HPyz9rtvSFZTwxBR0hG8h98lnFK%2BbQ0LPAyDt0pcOdQXf1Ip72VgJIeS/S2ZKgtx7XX/nh5QG8IGJi" +
    "yuFVulguoRr14JT/VYgxv3m0mpqxzUWelPaFnR0ikTe4ofsKtQ1MOOxcw9IA7kVw8HvzBQXObC8L1lPZbiwGe0gi8bTs3RrRLOzgGJdT6tmxIS3U31Sfa6rCyeyBLJMsOPVGESo1lK%2BnLhTSaSh55dgGNo/9LQmqCiA4%2B%2B8GhieK%2BVPVmTo1mXiTZe9DH16d" +
    "aUQjXnY8Sm/n7g62CnacIOoWQtot0dfBK6tyFtrznAZPNdCj7kBgazBbAQ%2Bzz9gi0H1FzmzJ6ZB9TatIThDlSkCburhwUvwutRgcOFzXTBa5S1Xdn5jrBJX%2Bf1vwvenp8h1vAtCpm1y4MlntiAQmjLa0L1chmk9ARvL8hHdW5qIFGDILOV7kEwCYkU1U4BtLPRSV" +
    "PFOGa7eKWn0%2BM1ROcMtfsOq4usz%2BIH6FXqBBbU6QTzSCFhKphrguQC%2BPMBNqgszWwxWSYxQ3Ac2JG1NAT7fT46E%2BbRzBzJCCx3KqyWlHN9Tt7sDWUNTSTCy78Nz48rtQRGbiuU9P%2B7OtCv4PVA9nvzyElmsJmL5QdHP0z5vEPaMlswiGBfqOByTx78BM0P" +
    "zrCR4gW99N3IJLqqvH4SqBhN06PJeqkHpg91geYTI0aG/fHPVTyBhZ4Y0vrCiXEMNgqmHg3tLaSnQVRBlVQlsx1UPXQKujdsdVTrnBeWOaZ3260HiHBiOrjVCl7d34Jsnk6TBY6HpcqZriK4f6Hs4kHCUpJa4fXWm%2B9m7xHkYa8bFBQRbok7qWPN15LhR3iWNSN1ho" +
    "Y0YUUi42Azj8FOx/g56L521e%2BnhWZogZU6eZjmLpNS/b51eUF0Y08tf7oYDUfzUUcHNMIGC7mil15GlrKCGtoA4gTvysHYcanfxKrmNkJZAinZdkYZ6vCaffop%2BYJ/wcwQjlEC4DvSJHUAD0pHeetcBsWPgbVBNFAg8HnXuPcPWePt7Vx/BhkZJ%2BUCE4kZ3E0g" +
    "PaYKrcglxyxLrwq3B8Gmmq5MsCzB71fZ%2B%2B5B2m2sLSk4edmO4pjAWEBxPDXaUqXhdNIiGq3w4UXNWNzP2Icdqp9MbwDeuwObc5UL%2BtdSWNE39432nszsybC9WMzP%2BxHXKGka7bgnNjHKF1v4W32GY%2BwwOJ4%2BXazuYqxj8Aa/T1OQo73z/y9KeUUT9WI0" +
    "phXpyP8G9gxQ%3D"
  });
  return;
}

var body = JSON.parse($response.body);

if (url.indexOf("/page/bookstore") !== -1) {
  body.data.moduleInfos[0] = {
    "description": "2099-09-09 到期",
    "vipIcon": "https://img-tailor.11222.cn/cms/upload/img/1657626220526bac15a40063500b21fc513a85e947cd1.png",
    "template": "SqVipChannelUserInfo",
    "vipExpireInfo": "2099-09-09 到期",
    "vipChannelEntries": [
      { "name": "欢迎", "icon": "https://img-tailor.11222.cn/cms/upload/img/1657626220526bac15a40063500b21fc513a85e947cd1.png", "jumpUrl": "https://t.me/chxm1023" },
      { "name": "加入", "icon": "https://img-tailor.11222.cn/cms/upload/img/1661320717929918eaecd796da38e82d27de64df6d0c2.png", "jumpUrl": "https://t.me/chxm1023" }
    ],
    "buttonText": "频道",
    "moduleName": "ios-vip",
    "source": "passthrough",
    "avatar": "http://img-tailor.11222.cn/account/avatar/4627c0ff831973e513bc8b4f4e3c3aee@120w_120h",
    "templateVersion": "latest",
    "buttonUrl": "https://t.me/chxm1023",
    "displayTemplate": "SqVipChannelUserInfo",
    "nickName": "VIP User",
    "moduleId": 9,
    "vipType": 1,
    "x-moduleOrd": 4
  };
}

if (url.indexOf("/adV2") !== -1) {
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
}

if (url.indexOf("/adTurnChapter") !== -1) {
  if (body.data) {
    body.data.adFreeVideo = {
      "status": 1,
      "freeChapterNum": 999,
      "freeTime": 999999
    };
  }
}

if (url.indexOf("/commodityInfoV3") !== -1) {
  if (body.data && body.data.play && body.data.play.monthlyInfo) {
    body.data.play.monthlyInfo.forEach(function(item) {
      item.money = 0;
      item.sdou = 0;
      item.lowestPrice = 0;
    });
  }
}

$done({ body: JSON.stringify(body) });
