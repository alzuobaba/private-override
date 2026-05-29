"use strict"

console.log($script.name + ' KCallme: 城市编码修改')

var url = $request.url
var body = $request.body
var obj

if (body && /\/welfare-movie\/app-api\/k\/cinema\/list/.test(url)) {
  try {
    obj = JSON.parse(body)
    if (obj.cityCode) {
      obj.cityCode = '469000'
      console.log($script.name + ' cityCode -> 469000')
    }
  } catch (e) {
    console.log($script.name + ' error: ' + e)
  }
}

try {
  $configuration.sendMessage({ action: 'get_policy_state' }).then(function (resolve) {
    var state = resolve.ret, target = null
    for (var g in state) {
      if (/kcallme|KCallme|KCALLME/i.test(g)) { target = g; break }
    }
    if (!target) {
      for (var g in state) {
        if (state[g] !== 'direct') { target = g; break }
      }
    }
    if (target) {
      return $configuration.sendMessage({
        action: 'set_policy_state',
        content: Object.assign({}, { [target]: 'direct' })
      })
    }
  }).then(function () {}, function () {})
} catch (e) {
  console.log($script.name + ' policy error: ' + e)
}

$done(body ? { body: JSON.stringify(obj) } : {})
