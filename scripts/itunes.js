const url = $request.url;
const headers = $request.headers;
const body = $response.body;

if (!url.includes('/verifyReceipt')) {
  $done({});
}

let obj;
try {
  obj = JSON.parse(body);
} catch {
  $done({});
}

const now = Math.floor(Date.now() / 1000);
const future = now + 315360000;

function fmtDate(ts) {
  return new Date(ts * 1000).toISOString();
}

function fmtPST(ts) {
  return new Date(ts * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
}

function makeEntry(productId) {
  const tid = '200000' + Math.random().toString().slice(2, 17);
  return {
    quantity: '1',
    product_id: productId,
    transaction_id: tid,
    original_transaction_id: tid,
    purchase_date: fmtDate(now),
    purchase_date_ms: (now * 1000).toString(),
    purchase_date_pst: fmtPST(now),
    original_purchase_date: fmtDate(now),
    original_purchase_date_pst: fmtPST(now),
    expires_date: fmtDate(future),
    expires_date_ms: (future * 1000).toString(),
    expires_date_pst: fmtPST(future),
    is_in_intro_offer_period: 'false',
    is_trial_period: 'false'
  };
}

obj.status = 0;

const bundleId = obj.receipt && obj.receipt.bundle_id || headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'] || 'com.example.app';

const productId = (() => {
  if (obj.latest_receipt_info && obj.latest_receipt_info.length > 0) {
    return obj.latest_receipt_info[0].product_id;
  }
  if (obj.receipt && obj.receipt.in_app && obj.receipt.in_app.length > 0) {
    return obj.receipt.in_app[0].product_id;
  }
  return bundleId + '.premium';
})();

if (!obj.latest_receipt_info || obj.latest_receipt_info.length === 0) {
  obj.latest_receipt_info = [makeEntry(productId)];
  if (obj.receipt && obj.receipt.in_app) {
    obj.receipt.in_app = obj.latest_receipt_info;
  } else if (obj.receipt) {
    obj.receipt.in_app = obj.latest_receipt_info;
  }
} else {
  obj.latest_receipt_info = obj.latest_receipt_info.map(e => ({
    ...e,
    expires_date: fmtDate(future),
    expires_date_ms: (future * 1000).toString(),
    expires_date_pst: fmtPST(future),
    is_in_intro_offer_period: 'false',
    is_trial_period: 'false'
  }));
  if (obj.receipt && obj.receipt.in_app) {
    obj.receipt.in_app = obj.receipt.in_app.map(e => ({
      ...e,
      expires_date: fmtDate(future),
      expires_date_ms: (future * 1000).toString(),
      expires_date_pst: fmtPST(future),
      is_in_intro_offer_period: 'false',
      is_trial_period: 'false'
    }));
  }
}

if (!obj.pending_renewal_info || obj.pending_renewal_info.length === 0) {
  obj.pending_renewal_info = [{
    auto_renew_product_id: productId,
    original_transaction_id: '200000' + Math.random().toString().slice(2, 17),
    product_id: productId,
    auto_renew_status: '1'
  }];
}

$done({ body: JSON.stringify(obj) });
