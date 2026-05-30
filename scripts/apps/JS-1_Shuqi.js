var body = JSON.parse($response.body);
var url = $request.url;

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

$done({ body: JSON.stringify(body) });
