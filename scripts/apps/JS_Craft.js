"use strict"

console.log($script.name)
console.log($script.name + ' Craft 订阅解锁')

var url = $request.url
var body = $response.body

if (!body) { $done({}) }

try {
  var obj = JSON.parse(body)
  console.log($script.name + ' ' + url)

  var future = 4092599349000

  // GET /auth/v3/profile — 用户信息 + spaces tier
  if (/auth.*profile/.test(url)) {
    if (obj.spaces && Array.isArray(obj.spaces)) {
      obj.spaces.forEach(function (s) {
        s.tier = 'V2_Team'
      })
    }
    obj.tier = 'V2_Team'
  }

  // GET /subscription/teams/get-subscriptions — 订阅状态
  if (/get-subscriptions/.test(url)) {
    obj.tier = 'V2_Team'
    obj.subscriptions = [{
      isPrimary: true,
      provider: 'AppStore',
      subscriptionId: '55555555-8888-1023-8888-999999999999',
      renewPeriod: 'Yearly',
      rawType: 'AppStore',
      tier: 'V2_Team',
      expirationTime: future,
      isActive: true
    }]
  }

  // GET /teams/v1/{id}/details — 团队详情
  if (/teams.*details/.test(url)) {
    if (obj.team) {
      obj.team.tier = 'V2_Team'
    }
  }

  // 兜底：任何免费 tier 都改为 Team
  if (obj.tier === 'V2_Free') {
    obj.tier = 'V2_Team'
  }

  $done({ body: JSON.stringify(obj) })
} catch (e) {
  console.log($script.name + ' error: ' + e)
  $done({})
}
