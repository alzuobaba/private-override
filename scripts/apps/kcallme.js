"use strict"

console.log($script.name + ' KCallme: 城市编码修改')

var url = $request.url
var body = $request.body

if (body && /\/welfare-movie\/app-api\/k\/cinema\/list/.test(url)) {
  try {
    var obj = JSON.parse(body)
    if (obj.cityCode) {
      obj.cityCode = '469000'
      console.log($script.name + ' cityCode -> 469000')
    }
    $done({ body: JSON.stringify(obj) })
  } catch (e) {
    console.log($script.name + ' error: ' + e)
    $done({})
  }
} else {
  $done({})
}
