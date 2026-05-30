"use strict"

console.log($script.name)
console.log($script.name + ' APTV Pro 解锁')

var body = $response.body
if (!body) { $done({}) }

try {
  var obj = JSON.parse(body)
  console.log($script.name + ' ' + $request.url)

  var now = Math.floor(Date.now() / 1000)
  var future = now + 315360000
  var FUTURE_ISO = (new Date(future * 1000)).toISOString()
  var NOW_ISO = (new Date(now * 1000)).toISOString()

  var pid = 'com.kimen.aptvpro.lifetime'

  if (!obj.subscriber) obj.subscriber = {}
  var sub = obj.subscriber
  if (!sub.entitlements) sub.entitlements = {}
  if (!sub.subscriptions) sub.subscriptions = {}

  sub.entitlements['pro'] = {
    expires_date: FUTURE_ISO,
    product_identifier: pid,
    purchase_date: NOW_ISO,
    verified_product_id: pid
  }

  sub.subscriptions[pid] = {
    expires_date: FUTURE_ISO,
    original_purchase_date: NOW_ISO,
    purchase_date: NOW_ISO,
    is_sandbox: false,
    ownership_type: 'PURCHASED',
    store: 'app_store',
    storefront_country_code: 'USA',
    verified_product_id: pid,
    store_transaction_id: '200000' + Math.random().toString().slice(2, 17),
    verified_state: 'VERIFIED'
  }

  sub.first_seen = sub.first_seen || NOW_ISO
  sub.original_application_version = sub.original_application_version || '1'
  sub.original_purchase_date = sub.original_purchase_date || NOW_ISO
  if (sub.management_url === undefined) sub.management_url = null
  if (!sub.non_subscriptions) sub.non_subscriptions = {}

  obj.request_date = obj.request_date || (new Date()).toISOString()
  obj.request_date_ms = obj.request_date_ms || now * 1000

  $done({ body: JSON.stringify(obj) })
} catch (e) {
  console.log($script.name + ' error: ' + e)
  $done({})
}
