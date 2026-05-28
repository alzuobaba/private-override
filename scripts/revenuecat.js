/**
 * RevenueCat 订阅解锁脚本（适配 Stash）— 数据分离版
 * ===================================================
 * 拦截 api.revenuecat.com / api.rc-backup.com 的订阅验证请求。
 * App 字典数据从 revenuecat-data.json 独立加载并通过 $persistentStore 缓存，
 * 脚本逻辑与数据各自独立更新。
 *
 * 字典字段说明：参见 revenuecat-data.json 文件内注释
 *
 * 来源：https://raw.githubusercontent.com/chxm1023/Rewrite/main/Reheji.js
 * 作者：@ddm1023 / Stash 适配：alzuobaba
 */

(function() {
var CACHE_KEY = 'rc_data_v1';
var DATA_URL = 'https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/revenuecat-data.json';
var EXCLUDE_CACHE = 'exclude_v1';
var EXCLUDE_URL = 'https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/exclude.json';

var headers = $request.headers;
var ua = headers['User-Agent'] || headers['user-agent'] || '';
var bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'] || '';
var reqBody = $request.body || '';

/*
 * 禁止列表：这些 App 检测到 MITM 会拒绝工作。
 * 同时检查 UA 和请求体，双重防护防止绕过。
 * APTV 特殊：同时存在于 forbiddenApps 和 listua。
 *   - UA 包含 APTV → 被 forbiddenApps 阻断（新版 APTV 会检测）
 *   - UA 不含 APTV → 可通过 listua 匹配（旧版 APTV 不检测）
 */
var forbiddenApps = [
  'PicSeedClient', 'ReflixiOS', 'Pomodoro', 'MyHabit',
  'Rond', 'Filebar', 'Fileball', 'APTV'
];
if (forbiddenApps.some(function(app) {
  return ua.includes(app) || reqBody.includes(app);
})) {
  $done({});
  return;
}

/*
 * 时间常量：预计算以避免重复 new Date()
 *   now     = 当前 Unix 秒
 *   future  = 10 年后
 */
var now = Math.floor(Date.now() / 1000);
var future = now + 315360000;
var FUTURE_ISO = (new Date(future * 1000)).toISOString();
var NOW_ISO = (new Date(now * 1000)).toISOString();
var NOW_PST = (new Date(now * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
var FUTURE_PST = (new Date(future * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
var FUTURE_MS = (future * 1000).toString();
var NOW_MS = (now * 1000).toString();

function makeTID() {
  return '200000' + Math.random().toString().slice(2, 17);
}

/*
 * mergeSJA: Apple verifyReceipt 回执格式
 * 用于 RevenueCat POST /receipts 端点，模拟 Apple 的成功验证响应。
 * receipt_type: "ProductionSandbox" 覆盖生产+沙箱两种环境。
 * is_in_intro_offer_period: "false" → 非新客优惠期
 * auto_renew_status: "1" → 下一周期自动续费
 */
function mergeSJA(base, data, bid) {
  var tid = makeTID();
  base.status = 0;
  base.environment = base.environment || 'Production';
  if (!base.receipt) base.receipt = {};
  var r = base.receipt;
  r.receipt_type = r.receipt_type || 'ProductionSandbox';
  r.bundle_id = r.bundle_id || bid || 'com.example.app';
  r.application_version = r.application_version || '1';
  r.original_application_version = r.original_application_version || '1';
  r.creation_date = r.creation_date || NOW_ISO;
  r.expiration_date = FUTURE_ISO;

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
  };
  r.in_app = [entry];
  base.latest_receipt_info = [entry];
  base.latest_receipt = base.latest_receipt || 'base64encodedreceiptdata';
  base.pending_renewal_info = [{
    auto_renew_product_id: data.id || 'com.rc.unlock',
    original_transaction_id: makeTID(),
    product_id: data.id || 'com.rc.unlock',
    auto_renew_status: '1'
  }];
}

/*
 * mergeSJB: RevenueCat subscriber 格式
 * 用于 RevenueCat GET /subscribers/{id} 端点。
 * ownership_type: "PURCHASED" → 直接购买
 * store: "app_store" → Apple App Store
 * is_sandbox: false → 生产环境
 * nameb/idb → 双权限 App（如 Spark 同时有 premium + tokens）
 */
function mergeSJB(base, data) {
  if (!base.subscriber) base.subscriber = {};
  var sub = base.subscriber;
  if (!sub.entitlements) sub.entitlements = {};
  if (!sub.subscriptions) sub.subscriptions = {};

  var key = data.name || 'premium';
  sub.entitlements[key] = {
    expires_date: FUTURE_ISO,
    product_identifier: data.id || 'com.rc.unlock',
    purchase_date: NOW_ISO
  };
  if (data.nameb && data.idb) {
    sub.entitlements[data.nameb] = {
      expires_date: FUTURE_ISO,
      product_identifier: data.idb,
      purchase_date: NOW_ISO
    };
  }

  var subKey = data.id || 'com.rc.unlock';
  sub.subscriptions[subKey] = {
    expires_date: FUTURE_ISO,
    original_purchase_date: NOW_ISO,
    purchase_date: NOW_ISO,
    is_sandbox: false,
    ownership_type: 'PURCHASED',
    store: 'app_store'
  };

  sub.first_seen = sub.first_seen || NOW_ISO;
  sub.original_application_version = sub.original_application_version || '1';
  sub.original_purchase_date = sub.original_purchase_date || NOW_ISO;
  if (sub.management_url === undefined) sub.management_url = null;
  if (!sub.non_subscriptions) sub.non_subscriptions = {};

  base.request_date = base.request_date || (new Date()).toISOString();
  base.request_date_ms = base.request_date_ms || now * 1000;
}

/*
 * mergeSJC: 扁平化 entitlement 格式
 * 少数 App 使用简化版 RevenueCat 响应，不需要完整 subscriber 对象。
 */
function mergeSJC(base, data) {
  if (!base.entitlement) base.entitlement = {};
  if (!base.entitlements) base.entitlements = {};
  base.entitlement.product_identifier = data.id || 'com.rc.unlock';
  base.entitlement.expires_date = FUTURE_ISO;
  var key = data.name || 'premium';
  base.entitlements[key] = {
    expires_date: FUTURE_ISO,
    product_identifier: data.id || 'com.rc.unlock'
  };
}

/*
 * run(): 接收已加载的 { bundle, listua } 字典，执行核心解锁逻辑。
 * 只有 run() 会调用 $done()——确保无论走缓存还是网络加载都统一出口。
 */
function run(data) {
  var bundle = data.bundle || {};
  var listua = data.listua || {};

  // App 匹配：先查 UA（listua），后查 bundle ID（bundle），都不命中则默认 sjb
  var appData = null;
  var matchedKey = null;
  var uaKeys = Object.keys(listua);
  for (var i = 0; i < uaKeys.length; i++) {
    if (ua.includes(uaKeys[i])) {
      appData = listua[uaKeys[i]];
      matchedKey = uaKeys[i];
      break;
    }
  }
  if (!appData && bundle_id && bundle[bundle_id]) {
    appData = bundle[bundle_id];
    matchedKey = bundle_id;
  }
  if (!appData) {
    appData = { cm: 'sjb' };
  }

  console.log('[' + $script.name + '] ' + (matchedKey || 'unknown') + ' | URL: ' + $request.url + ' | UA: ' + ua);

  // 检查黑名单（匹配 UA 关键字 或 bundle ID 任一命中即放行）
  var excludeCached = $persistentStore.read(EXCLUDE_CACHE);
  if (excludeCached && matchedKey) {
    try {
      var excludes = JSON.parse(excludeCached);
      var list = excludes.exclude || (Array.isArray(excludes) ? excludes : []);
      if (list.indexOf(matchedKey) !== -1 || list.indexOf(bundle_id) !== -1) {
        $done({});
        return;
      }
    } catch (e) {}
  }

  /*
   * ddm (data from $response): 解析原始响应体，在 ddm 上就地合并假数据后返回。
   * 关键：保留 RevenueCat 原始响应的辅助字段（request_date、non_subscriptions 等）。
   */
  var ddm = {};
  try {
    if (typeof $response !== 'undefined' && $response.body) {
      ddm = JSON.parse($response.body);
    }
  } catch (e) {}

  /*
   * 路由：根据 URL 端点选择合并策略
   *   /subscribers/ → 始终 mergeSJB
   *   /receipts      → 按 cm 字段路由 sja/sjc/sjb
   */
  var isSubscriber = $request.url.indexOf('/subscribers/') !== -1;
  if (isSubscriber) {
    console.log('[' + $script.name + '] 模式: SJB /subscribers');
    mergeSJB(ddm, appData);
  } else if (appData.cm === 'sja') {
    console.log('[' + $script.name + '] 模式: SJA');
    mergeSJA(ddm, appData, bundle_id);
  } else if (appData.cm === 'sjc') {
    console.log('[' + $script.name + '] 模式: SJC');
    mergeSJC(ddm, appData);
  } else {
    console.log('[' + $script.name + '] 模式: SJB (default)');
    mergeSJB(ddm, appData);
  }

  $done({ body: JSON.stringify(ddm) });
}

/*
 * 数据加载：检查 persistentStore 缓存 → 命中直接 run，未命中则网络加载再 run
 */
var cached = $persistentStore.read(CACHE_KEY);
if (cached) {
  try {
    run(JSON.parse(cached));
    return;
  } catch (e) {
    // 缓存损坏，清除并走网络加载分支
    $persistentStore.write('', CACHE_KEY);
  }
}

$httpClient.get(
  { url: DATA_URL, timeout: 5 },
  function(err, resp, body) {
    if (!err && body) {
      try {
        var parsed = JSON.parse(body);
        $persistentStore.write(JSON.stringify(parsed), CACHE_KEY);
        run(parsed);

        // 顺带缓存一份黑名单（异步，不影响当前请求）
        loadExclude();
        return;
      } catch (e) {}
    }
    $done({});
  }
);

function loadExclude() {
  var exc = $persistentStore.read(EXCLUDE_CACHE);
  if (!exc) {
    $httpClient.get(
      { url: EXCLUDE_URL, timeout: 5 },
      function(err2, resp2, body2) {
        if (!err2 && body2) {
          try {
            JSON.parse(body2); // validate
            $persistentStore.write(body2, EXCLUDE_CACHE);
          } catch (e) {}
        }
      }
    );
  }
}

loadExclude();
})();
