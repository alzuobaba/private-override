/**
 * RevenueCat 订阅解锁脚本（适配 Stash）— 数据分离版
 * ===================================================
 * 拦截 api.revenuecat.com / api.rc-backup.com 的订阅验证请求。
 */

"use strict"

console.log($script.name)
console.log('RevenueCat: 订阅解锁')

var CACHE_KEY = 'rc_data_v1'
var DATA_URL = 'https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/revenuecat-data.json'
var EXCLUDE_CACHE = 'exclude_v1'
var EXCLUDE_URL = 'https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/exclude.json'

var headers = $request.headers
var ua = headers['User-Agent'] || headers['user-agent'] || ''
var bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'] || ''
var reqBody = $request.body || ''
var doneCalled = false

var forbiddenApps = [
  'PicSeedClient', 'ReflixiOS', 'Pomodoro', 'MyHabit',
  'Rond', 'Filebar', 'Fileball', 'APTV'
]

if (forbiddenApps.some(function (app) {
  return ua.includes(app) || reqBody.includes(app)
})) {
  $done({})
  doneCalled = true
}

if (!doneCalled) {
  var now = Math.floor(Date.now() / 1000)
  var future = now + 315360000
  var FUTURE_ISO = (new Date(future * 1000)).toISOString()
  var NOW_ISO = (new Date(now * 1000)).toISOString()
  var NOW_PST = (new Date(now * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  var FUTURE_PST = (new Date(future * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
  var FUTURE_MS = (future * 1000).toString()
  var NOW_MS = (now * 1000).toString()

  function makeTID() {
    return '200000' + Math.random().toString().slice(2, 17)
  }

  function mergeSJA(base, data, bid) {
    var tid = makeTID()
    base.status = 0
    base.environment = base.environment || 'Production'
    if (!base.receipt) base.receipt = {}
    var r = base.receipt
    r.receipt_type = r.receipt_type || 'ProductionSandbox'
    r.bundle_id = r.bundle_id || bid || 'com.example.app'
    r.application_version = r.application_version || '1'
    r.original_application_version = r.original_application_version || '1'
    r.creation_date = r.creation_date || NOW_ISO
    r.expiration_date = FUTURE_ISO

    var entry = {
      quantity: '1',
      product_id: data.id || 'com.rc.unlock',
      transaction_id: tid,
      original_transaction_id: tid,
      purchase_date: NOW_ISO,
      purchase_date_ms: NOW_MS,
      purchase_date_pst: NOW_PST,
      original_purchase_date: NOW_ISO,
      original_purchase_date_pst: NOW_PST,
      expires_date: FUTURE_ISO,
      expires_date_ms: FUTURE_MS,
      expires_date_pst: FUTURE_PST,
      is_in_intro_offer_period: 'false',
      is_trial_period: 'false'
    }
    r.in_app = [entry]
    base.latest_receipt_info = [entry]
    base.latest_receipt = base.latest_receipt || 'base64encodedreceiptdata'
    base.pending_renewal_info = [{
      auto_renew_product_id: data.id || 'com.rc.unlock',
      original_transaction_id: makeTID(),
      product_id: data.id || 'com.rc.unlock',
      auto_renew_status: '1'
    }]
  }

  function mergeSJB(base, data) {
    if (!base.subscriber) base.subscriber = {}
    var sub = base.subscriber
    if (!sub.entitlements) sub.entitlements = {}
    if (!sub.subscriptions) sub.subscriptions = {}

    var key = data.name || 'premium'
    sub.entitlements[key] = {
      expires_date: FUTURE_ISO,
      product_identifier: data.id || 'com.rc.unlock',
      purchase_date: NOW_ISO
    }
    if (data.nameb && data.idb) {
      sub.entitlements[data.nameb] = {
        expires_date: FUTURE_ISO,
        product_identifier: data.idb,
        purchase_date: NOW_ISO
      }
    }

    var subKey = data.id || 'com.rc.unlock'
    sub.subscriptions[subKey] = {
      expires_date: FUTURE_ISO,
      original_purchase_date: NOW_ISO,
      purchase_date: NOW_ISO,
      is_sandbox: false,
      ownership_type: 'PURCHASED',
      store: 'app_store'
    }

    sub.first_seen = sub.first_seen || NOW_ISO
    sub.original_application_version = sub.original_application_version || '1'
    sub.original_purchase_date = sub.original_purchase_date || NOW_ISO
    if (sub.management_url === undefined) sub.management_url = null
    if (!sub.non_subscriptions) sub.non_subscriptions = {}

    base.request_date = base.request_date || (new Date()).toISOString()
    base.request_date_ms = base.request_date_ms || now * 1000
  }

  function mergeSJC(base, data) {
    if (!base.entitlement) base.entitlement = {}
    if (!base.entitlements) base.entitlements = {}
    base.entitlement.product_identifier = data.id || 'com.rc.unlock'
    base.entitlement.expires_date = FUTURE_ISO
    var key = data.name || 'premium'
    base.entitlements[key] = {
      expires_date: FUTURE_ISO,
      product_identifier: data.id || 'com.rc.unlock'
    }
  }

  function run(data) {
    var bundle = data.bundle || {}
    var listua = data.listua || {}

    var appData = null
    var matchedKey = null
    var uaKeys = Object.keys(listua)
    for (var i = 0; i < uaKeys.length; i++) {
      if (ua.includes(uaKeys[i])) {
        appData = listua[uaKeys[i]]
        matchedKey = uaKeys[i]
        break
      }
    }
    if (!appData && bundle_id && bundle[bundle_id]) {
      appData = bundle[bundle_id]
      matchedKey = bundle_id
    }
    if (!appData) {
      appData = { cm: 'sjb' }
    }

    console.log($script.name + ' ' + (matchedKey || 'unknown') + ' ' + $request.url)

    var excludeCached = $persistentStore.read(EXCLUDE_CACHE)
    if (excludeCached && matchedKey) {
      try {
        var excludes = JSON.parse(excludeCached)
        var list = excludes.exclude || (Array.isArray(excludes) ? excludes : [])
        if (list.indexOf(matchedKey) !== -1 || list.indexOf(bundle_id) !== -1) {
          $done({})
        }
      } catch (e) {}
    }

    var ddm = {}
    try {
      if (typeof $response !== 'undefined' && $response.body) {
        ddm = JSON.parse($response.body)
      }
    } catch (e) {}

    var isSubscriber = $request.url.indexOf('/subscribers/') !== -1
    if (isSubscriber) {
      mergeSJB(ddm, appData)
    } else if (appData.cm === 'sja') {
      mergeSJA(ddm, appData, bundle_id)
    } else if (appData.cm === 'sjc') {
      mergeSJC(ddm, appData)
    } else {
      mergeSJB(ddm, appData)
    }

    $done({ body: JSON.stringify(ddm) })
  }

  var cached = $persistentStore.read(CACHE_KEY)
  var ran = false

  if (cached) {
    try {
      run(JSON.parse(cached))
      ran = true
    } catch (e) {
      $persistentStore.write('', CACHE_KEY)
    }
  }

  if (!ran) {
    $httpClient.get(
      { url: DATA_URL, timeout: 5 },
      function (err, resp, body) {
        if (!err && body) {
          try {
            var parsed = JSON.parse(body)
            $persistentStore.write(JSON.stringify(parsed), CACHE_KEY)
            run(parsed)
            loadExclude()
          } catch (e) {
            $done({})
          }
        } else {
          $done({})
        }
      }
    )
  }
}

function loadExclude() {
  var exc = $persistentStore.read(EXCLUDE_CACHE)
  if (!exc) {
    $httpClient.get(
      { url: EXCLUDE_URL, timeout: 5 },
      function (err2, resp2, body2) {
        if (!err2 && body2) {
          try {
            JSON.parse(body2)
            $persistentStore.write(body2, EXCLUDE_CACHE)
          } catch (e) {}
        }
      }
    )
  }
}

loadExclude()
