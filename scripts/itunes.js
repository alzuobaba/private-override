"use strict"

console.log($script.name + ' iTunes 验证绕过启动')
console.log($script.name + ' 监听: buy/inappcheck verifyReceipt')

var EXCLUDE_CACHE = 'exclude_v1'
var url = $request.url
var called = false

console.log($script.name + ' REQ: ' + url)

if (url.indexOf('/verifyReceipt') !== -1) {
  console.log($script.name + ' 命中 verifyReceipt')
  var headers = $request.headers
  var body = $response.body

  if (!body) {
    console.log($script.name + ' 无响应体，跳过')
  } else {
    var obj
    try { obj = JSON.parse(body) } catch (e) {
      console.log($script.name + ' JSON解析失败: ' + e)
    }

    if (obj) {
      console.log($script.name + ' 开始注入回执...')

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

      var bundleId =
        (obj.receipt && obj.receipt.bundle_id) ||
        headers['X-Client-Bundle-ID'] ||
        headers['x-client-bundle-id'] ||
        'com.example.app'

      console.log($script.name + ' Bundle: ' + bundleId)

      var productId = null
      if (obj.latest_receipt_info && obj.latest_receipt_info.length > 0) {
        productId = obj.latest_receipt_info[0].product_id
        console.log($script.name + ' 已有产品ID: ' + productId + ' (延续)')
      }
      if (!productId && obj.receipt && obj.receipt.in_app && obj.receipt.in_app.length > 0) {
        productId = obj.receipt.in_app[0].product_id
        console.log($script.name + ' 收据产品ID: ' + productId)
      }
      if (!productId) {
        productId = bundleId + '.premium'
        console.log($script.name + ' Fallback产品ID: ' + productId)
      }

      obj.status = 0
      delete obj.error

      if (!obj.receipt) {
        obj.receipt = {}
      }
      var r = obj.receipt
      r.bundle_id = r.bundle_id || bundleId
      r.receipt_type = r.receipt_type || 'ProductionSandbox'
      r.application_version = r.application_version || '1'
      r.original_application_version = r.original_application_version || '1'
      r.creation_date = r.creation_date || NOW_ISO
      r.expiration_date = FUTURE_ISO

      function makeEntry(pId) {
        var tid = makeTID()
        return {
          quantity: '1',
          product_id: pId,
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
      }

      function extendEntry(e) {
        return {
          quantity: e.quantity || '1',
          product_id: e.product_id || productId,
          transaction_id: e.transaction_id || makeTID(),
          original_transaction_id: e.original_transaction_id || e.transaction_id || makeTID(),
          purchase_date: e.purchase_date || NOW_ISO,
          purchase_date_ms: e.purchase_date_ms || NOW_MS,
          purchase_date_pst: e.purchase_date_pst || NOW_PST,
          original_purchase_date: e.original_purchase_date || NOW_ISO,
          original_purchase_date_pst: e.original_purchase_date_pst || NOW_PST,
          expires_date: FUTURE_ISO,
          expires_date_ms: FUTURE_MS,
          expires_date_pst: FUTURE_PST,
          is_in_intro_offer_period: 'false',
          is_trial_period: 'false'
        }
      }

      if (!obj.latest_receipt_info || obj.latest_receipt_info.length === 0) {
        obj.latest_receipt_info = [makeEntry(productId)]
        r.in_app = obj.latest_receipt_info
      } else {
        obj.latest_receipt_info = obj.latest_receipt_info.map(extendEntry)
        if (r.in_app && r.in_app.length > 0) {
          r.in_app = r.in_app.map(extendEntry)
        } else {
          r.in_app = obj.latest_receipt_info
        }
      }

      if (!obj.pending_renewal_info || obj.pending_renewal_info.length === 0) {
        obj.pending_renewal_info = [{
          auto_renew_product_id: productId,
          original_transaction_id: makeTID(),
          product_id: productId,
          auto_renew_status: '1'
        }]
      }

      obj.environment = obj.environment || 'Production'

      console.log($script.name + ' 注入完成: ' + productId + ' expires=' + FUTURE_ISO)

      $done({ body: JSON.stringify(obj) })
      called = true
    } else {
      console.log($script.name + ' JSON解析后为null')
    }
  }
} else {
  console.log($script.name + ' 跳过（非verifyReceipt）')
}

if (!called) {
  $done({})
}
