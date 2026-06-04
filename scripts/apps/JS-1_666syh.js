"use strict"

console.log($script.name)
console.log($script.name + ' 666书友会 会员+在线课/视频课解锁')

var url = $request.url
var body = $response.body

if (!body) { $done({}) }

var obj
try { obj = JSON.parse(body) } catch (e) {
  console.log($script.name + ' parse error: ' + e)
  $done({})
}

if (!obj || !obj.data) { $done({}) }

var data = obj.data

var MEMBER_DETAIL   = /\/member\/user\/memberDetail/
var ONLINE_LEARN    = /\/book\/online\/getOnlineLearnDel/
var VIDEO_DEL       = /\/book\/book\/getVideoDel/

if (MEMBER_DETAIL.test(url) || ONLINE_LEARN.test(url)) {
  data.isVip      = true
  data.level      = 5
  data.endTime    = 9999999999999
  data.auto_renew = true
  console.log($script.name + ' VIP 注入完成,expire=2287')
} else if (VIDEO_DEL.test(url)) {
  data.payStatus = '1'
  data.isPay     = true
  if (data.read && data.read.length > 0) {
    data.read[0].status = 1
  }
  console.log($script.name + ' 视频课解锁完成')
} else {
  $done({})
}

$done({ body: JSON.stringify(obj) })
