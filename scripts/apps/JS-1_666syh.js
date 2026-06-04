"use strict"

console.log($script.name)
console.log($script.name + ' 666书友会 会员解锁')

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

if (/\/member\/user\/memberDetail/.test(url)) {
  data.hasVip       = true
  data.level        = 5
  data.levelName    = 'VIP年卡'
  data.agent        = 5
  data.agentName    = 'VIP年卡'
  data.newPeopleVip = 1
  data.deadline     = 4092599349
  data.deadlineStr  = '2099-09-09 09:09:09'
  console.log($script.name + ' memberDetail VIP 注入完成')
} else if (/\/book\/online\/getOnlineLearnDel/.test(url)) {
  data.hasVip       = true
  data.level        = 5
  data.levelName    = 'VIP年卡'
  data.deadline     = 4092599349
  data.deadlineStr  = '2099-09-09 09:09:09'
  console.log($script.name + ' getOnlineLearnDel VIP 注入完成')
} else if (/\/book\/book\/getVideoDel/.test(url)) {
  data.payStatus = '1'
  data.isPay     = true
  if (data.read && data.read.length > 0) {
    data.read[0].status = 1
  }
  console.log($script.name + ' getVideoDel 视频课解锁完成')
} else {
  $done({})
}

$done({ body: JSON.stringify(obj) })
