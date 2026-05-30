"use strict"

console.log($script.name)
console.log($script.name + ' Craft 订阅解锁')

var url = $request.url
var body = $response.body

if (!body) { $done({}); }

try {
  var obj = JSON.parse(body)
  console.log($script.name + ' ' + url)

  var future = 4092599349000

  // Profile / Me endpoint - inject Pro subscription info
  if (/profile|account|me/.test(url) && !/receipt|subscription/.test(url)) {
    obj.tier = "V2_Team"
    obj.subscriptionActive = true
    obj.expirationTime = future
    obj.autoRenewStatus = true
    obj.provider = "AppStore"
    obj.subscriptionType = "appStoreV2TeamYearly"

    obj.teams = obj.teams || [{}]
    obj.spaces = obj.spaces || [{}]
    obj.teams.forEach(function (t) {
      t.tier = "V2_Team"
      t.subscriptionInfo = {
        autoRenewStatus: true,
        provider: "AppStore",
        rawType: "AppStore",
        subscriptionId: "55555555-8888-1023-8888-999999999999",
        expirationTime: future,
        renewPeriod: "Yearly"
      }
    })
    obj.spaces.forEach(function (s) {
      s.tier = "V2_Team"
    })
  }

  // Subscription receipt endpoint
  if (/receipt/.test(url)) {
    obj.subscription = {
      expirationDate: future,
      subscriptionActive: true,
      subscriptionId: "55555555-8888-1023-8888-999999999999",
      productId: "com.lukilabs.lukiapp.v2_team_2.sub.yearly_test",
      tier: "Pro",
      subscriptionType: "appStoreV2TeamYearly",
      rawSubscriptionType: "AppStore",
      autoRenewStatus: true
    }
  }

  // Teams / subscriptions list endpoint
  if (/subscription.*team|team.*subscription|get-subscriptions/.test(url)) {
    obj.subscriptions = obj.subscriptions || [{}]
    obj.tier = "V2_Team"
    obj.subscriptions.push({
      isPrimary: true,
      provider: "AppStore",
      subscriptionId: "55555555-8888-1023-8888-999999999999",
      renewPeriod: "Yearly",
      rawType: "AppStore",
      tier: "V2_Team",
      expirationTime: future,
      isActive: true
    })
  }

  // Generic - add entitlement fields if they don't exist yet
  if (!obj.tier && !obj.subscription) {
    obj.subscriptionActive = true
    obj.tier = "Pro"
    obj.expirationDate = future
    obj.autoRenewStatus = true
  }

  $done({ body: JSON.stringify(obj) })
} catch (e) {
  console.log($script.name + ' error: ' + e)
  $done({})
}
