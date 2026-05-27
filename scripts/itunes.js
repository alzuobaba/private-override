/**
 * iTunes verifyReceipt 验证绕过脚本（适配 Stash）
 * =================================================
 * 拦截 buy.itunes.apple.com/verifyReceipt 的响应，
 * 在 Apple 原始回执上注入带有永久到期日（2099年）的订阅记录。
 *
 * 工作原理：
 *   1. 请求正常发往 Apple（不拦截请求，只拦截响应）
 *   2. Apple 返回原始收据数据（status + receipt + latest_receipt_info）
 *   3. 本脚本在 Apple 响应体上就地修改，注入活跃订阅
 *   4. 返回修改后的响应给 App
 *
 * 局限性：
 *   无法查询 App Store API 获取真实 product_id。
 *   对于从未有过任何 IAP 购买记录的 App（收据中无 in_app 条目），
 *   fallback product_id 为 "{bundle_id}.premium"，可能与真实 product_id 不匹配。
 *
 * 来源思路：https://reven.jsforbaby.workers.dev/reven/iTunes.sgmodule
 */

var EXCLUDE_CACHE = 'exclude_v1';

const url = $request.url;
if (url.indexOf('/verifyReceipt') === -1) {
  $done({});
  return;
}

const headers = $request.headers;

/*
 * $response.body 是 Apple 返回的原始 JSON 响应体。
 * 只有 override.yaml 中设置了 require-body: true 才可用。
 * 可能的内容：
 *   - status=0 + receipt + latest_receipt_info（合法收据，有/无订阅）
 *   - status=21002（receipt-data 损坏）
 *   - status=21006（收据合法但订阅已过期）
 *   - status=21007（沙箱收据发到生产环境，或相反）
 *   - status=21008（生产收据发到沙箱环境）
 */
const body = $response.body;

let obj;
try {
  obj = JSON.parse(body);
} catch (e) {
  $done({});
  return;
}

/*
 * 时间常量：预计算以避免在函数内重复 new Date()
 *   - ISO 格式：Apple 标准日期格式 (2026-05-27T12:00:00.000Z)
 *   - PST 格式：Apple 回执专用，美国太平洋时区
 *   - MS 格式：timeIntervalSince1970 * 1000 的字符串形式
 */
const now = Math.floor(Date.now() / 1000);
const future = now + 315360000; // 10 年 ≈ 315360000 秒
const FUTURE_ISO = (new Date(future * 1000)).toISOString();
const NOW_ISO = (new Date(now * 1000)).toISOString();
const NOW_PST = (new Date(now * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
const FUTURE_PST = (new Date(future * 1000)).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
const FUTURE_MS = (future * 1000).toString();
const NOW_MS = (now * 1000).toString();

/*
 * makeTID(): 生成 Apple 风格的 20 位十进制 transaction_id
 * Apple 实际 transaction_id 为纯数字字符串，前缀 200000 避开冲突
 */
function makeTID() {
  return '200000' + Math.random().toString().slice(2, 17);
}

/*
 * bundleId: 从 Apple 响应或请求头中提取 bundle ID
 * 优先级：
 *   1. Apple 响应中的 receipt.bundle_id（最可靠，Apple 直接从收据解码）
 *   2. 请求头 X-Client-Bundle-ID（部分 App 会携带）
 *   3. fallback "com.example.app"
 */
const bundleId =
  (obj.receipt && obj.receipt.bundle_id) ||
  headers['X-Client-Bundle-ID'] ||
  headers['x-client-bundle-id'] ||
  'com.example.app';

/*
 * 黑名单检查：如果 bundle_id 在 itunes 排除列表中，直接放行不修改。
 * 列表缓存在 $persistentStore 中，由 revenuecat.js 首次运行时加载并共享。
 */
var excludeCached = $persistentStore.read(EXCLUDE_CACHE);
if (excludeCached) {
  try {
    var list = (JSON.parse(excludeCached)).exclude || [];
    if (list.indexOf(bundleId) !== -1) {
      $done({});
      return;
    }
  } catch (e) {}
}

/*
 * productId: 需要注入的 IAP 商品标识符
 * 三级 fallback：
 *   1. obj.latest_receipt_info[0].product_id → 已有购买记录，延长其有效期的 product_id
 *   2. obj.receipt.in_app[0].product_id       → 从 in_app 历史中获取
 *   3. "{bundleId}.premium"                    → 完全没有购买记录时的猜测值
 *
 * 注意：fallback 为猜测值，仅在 Apple 返回的收据中包含至少一条购买记录时才可靠
 */
let productId = null;
if (obj.latest_receipt_info && obj.latest_receipt_info.length > 0) {
  productId = obj.latest_receipt_info[0].product_id;
}
if (!productId && obj.receipt && obj.receipt.in_app && obj.receipt.in_app.length > 0) {
  productId = obj.receipt.in_app[0].product_id;
}
if (!productId) {
  productId = bundleId + '.premium';
}

/*
 * 状态修正：
 *   status=0      → Apple API 表示"收据有效"（必设，覆盖任何错误码）
 *   delete error  → 移除 Apple 返回的 error 字段（如 "invalid receipt-data"）
 */
obj.status = 0;
delete obj.error;

/*
 * receipt 初始化：
 * 若 Apple 返回错误码（如 21002）时 receipt 对象缺失，
 * 需要构造一个最小 receipt 对象以避免后续代码空指针。
 * 各字段使用 obj.receipt.xxx || defaultValue 模式保留已有值。
 */
if (!obj.receipt) {
  obj.receipt = {};
}
const r = obj.receipt;
r.bundle_id = r.bundle_id || bundleId;

/*
 * receipt_type: "ProductionSandbox" → 同时被生产和沙箱环境接受
 * 若设为 "Production"，沙箱 App 会因环境不匹配而拒绝
 * 若设为 "Sandbox"，生产 App 会拒绝
 * "ProductionSandbox" 是一个同时覆盖两种环境的通用值
 */
r.receipt_type = r.receipt_type || 'ProductionSandbox';
r.application_version = r.application_version || '1';
r.original_application_version = r.original_application_version || '1';
r.creation_date = r.creation_date || NOW_ISO;
r.expiration_date = FUTURE_ISO;

/*
 * makeEntry(): 创建一条全新的 in_app 购买记录
 *   - quantity: "1" → 购买数量（IAP 总是 1）
 *   - transaction_id === original_transaction_id → 首次购买时两者相同
 *   - is_in_intro_offer_period: "false" → 表示非新客优惠期，账户为成熟订阅者
 *   - is_trial_period: "false" → 表示非免费试用，已是付费订阅
 */
function makeEntry(pId) {
  const tid = makeTID();
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
  };
}

/*
 * extendEntry(): 延长已有购买记录的有效期
 * 关键：保留原有 product_id，仅将 expires_date 及其派生字段设为 2099 年。
 * 若原条目缺少某些字段（如某些老版本 App 的收据），用预计算常量补全。
 */
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
  };
}

/*
 * 订阅注入策略：
 *   无 latest_receipt_info → 创建一条全新的 fake 购买记录
 *   有 latest_receipt_info → 遍历所有已有条目，延长到期日
 * 同时更新 receipt.in_app 以保持与 latest_receipt_info 一致。
 * Apple 要求这两个数组相互对应。
 */
if (!obj.latest_receipt_info || obj.latest_receipt_info.length === 0) {
  obj.latest_receipt_info = [makeEntry(productId)];
  r.in_app = obj.latest_receipt_info;
} else {
  obj.latest_receipt_info = obj.latest_receipt_info.map(extendEntry);
  if (r.in_app && r.in_app.length > 0) {
    r.in_app = r.in_app.map(extendEntry);
  } else {
    r.in_app = obj.latest_receipt_info;
  }
}

/*
 * pending_renewal_info: Apple 订阅自动续费状态数组
 * 必须与 latest_receipt_info 中的 product_id 匹配。
 *   auto_renew_status: "1" → 下一周期将自动续费（"0" 表示关闭）
 *   若此项缺失或为 "0"，App 会认为用户已取消订阅，即使 expires_date 在未来
 */
if (!obj.pending_renewal_info || obj.pending_renewal_info.length === 0) {
  obj.pending_renewal_info = [{
    auto_renew_product_id: productId,
    original_transaction_id: makeTID(),
    product_id: productId,
    auto_renew_status: '1'
  }];
}

/*
 * environment: Apple 验证环境
 *   "Production" → 生产环境（App Store 下载的 App 使用）
 *   "Sandbox"    → 沙箱环境（TestFlight/Xcode 安装的 App 使用）
 * 部分 App 会检查此字段，设为 Production 覆盖大多数情况
 */
obj.environment = obj.environment || 'Production';

$done({ body: JSON.stringify(obj) });
