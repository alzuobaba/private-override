/*******************************
#!name= ✨ Owlfiles ✨
#!desc=FTP
#!category=🔐APP
#!author=🅜ⓘ🅚ⓔ🅟ⓗ🅘ⓔ
#!icon=https://raw.githubusercontent.com/Mikephie/icons/main/icon/owlfiles.png

*******************************
[rewrite_local]
^https?:\/\/www\.skyjos\.com(?::58080)?\/ws\/(?:validate|loadaccountinfo)\b url script-response-body https://raw.githubusercontent.com/Mikephie/Script/main/qx/owlfiles-2.js


[mitm]
hostname = www.skyjos.com

*******************************/
"use strict"
console.log($script.name)



// -------- 通知（带冷却）逻辑开始 --------
// const cooldownMs = 10 * 60 * 1000;
// const notifyKey = "Owlfiles_notify_key";
// const now = Date.now();
// let lastNotifyTime = $persistentStore.read(notifyKey) ? parseInt($persistentStore.read(notifyKey)) : 0;
// if (now - lastNotifyTime > cooldownMs) {
//     $notification.post("✨Owlfiles✨", "🅜ⓘ🅚ⓔ🅟ⓗ🅘ⓔ", "永久解锁或 ⓿❽-⓿❽-❷⓿❽❽");
//     $persistentStore.write(now.toString(), notifyKey);
// }
// -------- 通知（带冷却）逻辑结束 --------

try {
  let obj = JSON.parse($response.body);
  obj.memberLevel = 3;
  obj.expireAt = 4090694888000;
  $done({ body: JSON.stringify(obj) });
} catch (err) {
  console.log("Skyjos 解锁失败: " + err.message);
  $done({});
}
