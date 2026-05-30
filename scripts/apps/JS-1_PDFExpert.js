/*************************************

项目名称：PDF Expert
脚本作者：alzuobaba

*************************************/
"use strict"

console.log($script.name + ": PDF Expert script triggered");
console.log($script.name + ": URL = " + $request.url);
console.log($script.name + ": method = " + $request.method);

var body = JSON.parse($response.body);

console.log($script.name + ": original inAppStates count = " + (body.inAppStates ? body.inAppStates.length : 0));
if (body.inAppStates && body.inAppStates.length > 0) {
  console.log($script.name + ": original entitlements = " + JSON.stringify(body.inAppStates[0].entitlements));
  console.log($script.name + ": original productId = " + body.inAppStates[0].productId);
  console.log($script.name + ": original type = " + body.inAppStates[0].type);
  console.log($script.name + ": original state = " + body.inAppStates[0].state);
}

body.inAppStates[0].entitlements = [
  "ios.pe.ai-features",
  "ios.pe.subscription.pdf-features"
];

console.log($script.name + ": modified entitlements = " + JSON.stringify(body.inAppStates[0].entitlements));
console.log($script.name + ": modified productId = " + body.inAppStates[0].productId);

$done({ body: JSON.stringify(body) });
