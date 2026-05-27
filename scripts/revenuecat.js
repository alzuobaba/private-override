const url = $request.url;
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'] || '';
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'] || '';

const forbiddenApps = ['PicSeedClient', 'ReflixiOS', 'Pomodoro', 'MyHabit', 'Rond', 'Filebar', 'Fileball', 'APTV'];
if (forbiddenApps.some(app => ua.includes(app))) {
  $done({});
}

const bundle = {
  'com.zhang333.dd': { name: 'premium', id: 'com.zhang3.plus', cm: 'sjb' },
  'io.fadel.TeleprompterX': { name: 'io.fadel.teleprompterx.pro', id: 'io.fadel.TeleprompterX.pro.lifetime', cm: 'sjb' },
  'com.flexicalc.app': { name: 'pro', id: 'pro_product', cm: 'sja' },
  'com.trainfitness.Train': { name: 'Pro', id: 'TrainAnnualSubscription', cm: 'sja' },
  'com.OfflineMusic.www': { name: 'premium', id: 'com.OfflineMusic.www.lifetime298', cm: 'sjb' },
  'com.ausoco.umai': { name: 'umai_pro', id: 'umai_pro_yearly', cm: 'sja' },
  'camp.user.penbook': { name: 'pro', id: 'penbook.lifetime01', cm: 'sjb' },
  'design.yugen.Flow': { name: 'pro', id: 'design.yugen.Flow.Lifetime', cm: 'sja' },
  'com.runbuddy.prod': { name: 'premium', id: 'rb_9999_1y_1y7999', cm: 'sja' },
  'TeleprompterX': { name: 'Pro Upgrade', id: 'TPXOTP', cm: 'sjb' },
  'com.exoplanet.chatme': { name: 'premium', id: 'chatme_premium_year_trial', cm: 'sja' },
  'com.reku.Counter': { name: 'plus', id: 'com.reku.counter.plus.lifetime', cm: 'sjb' },
  'moonbox.co.il.grow': { name: 'pro', id: 'moonbox.co.il.grow.lifetime.offer', cm: 'sjb' },
  'tech.miidii.MDClock': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },
  'com.voicedream.Voic': { name: 'standard', id: 'vd_annual_79_3daytrial', cm: 'sja' },
  'com.laser-focused.focus-ios': { name: 'subscribed', id: 'iap.io.masterbuilders.focus.pro_one_year', cm: 'sja' },
  'com.roehl': { name: 'Pro', id: 'habitkit_3499_lt', cm: 'sjb' },
  'net.tengl.powertimer': { name: 'plus', id: 'powertimer.plus', cm: 'sjb' },
  'com.reader.book': { name: 'pro', id: 'reader.lifetimeFamily.pro', cm: 'sja' },
  'app.imone.OneWidget': { name: 'pro', id: 'app.imone.OneWidget.Lifetime', cm: 'sjb' },
  'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },
  'com.valo.reader': { name: 'com.valo.reader.vip1.forever', id: 'com.valo.reader.vip1.forever', cm: 'sjb' },
  'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }
};

const listua = {
  'QuietCam': { name: 'QuietCam Pro', id: 'pawelchmiel.quietcam.yearly', cm: 'sja' },
  'Mojo': { name: 'pro_ai', id: 'video.mojo.pro.ai.yearly', cm: 'sja' },
  'PicLoom': { id: 'com.efsoft.picloom_nc_lifetime', cm: 'sjc' },
  'PixImagine': { id: 'com.efsoft.piximagine_nc_lifetime', cm: 'sjc' },
  'VSCO': { name: 'pro', id: 'vscopro_global_5999_annual_7D_free', cm: 'sja' },
  '1Blocker': { name: 'premium', id: 'blocker.ios.iap.lifetime', cm: 'sjb' },
  'Anybox': { name: 'pro', id: 'cc.anybox.Anybox.annual', cm: 'sja' },
  'APTV': { name: 'Pro', id: 'com.kimen.aptvpro.lifetime', cm: 'sjb' },
  'Pillow': { name: 'premium', id: 'com.neybox.pillow.premium.year.v2', cm: 'sja' },
  'ScannerPro': { name: 'plus', id: 'com.ddm1024.premium.yearly', cm: 'sja' }
};

let appData;
const uaKey = Object.keys(listua).find(k => ua.includes(k));
if (uaKey) {
  appData = listua[uaKey];
}
if (!appData && bundle_id && bundle[bundle_id]) {
  appData = bundle[bundle_id];
}
if (!appData) {
  appData = { cm: 'sjb' };
}

const now = Math.floor(Date.now() / 1000);
const future = now + 315360000;

function generateSJA() {
  return {
    "receipt": {
      "receipt_type": "ProductionSandbox",
      "in_app": [{
        "quantity": "1",
        "purchase_date_ms": (now * 1000).toString(),
        "expires_date": new Date(future * 1000).toISOString(),
        "expires_date_pst": new Date(future * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
        "expires_date_ms": (future * 1000).toString(),
        "is_in_intro_offer_period": "false",
        "transaction_id": "200000" + Math.random().toString().slice(2, 17),
        "original_transaction_id": "200000" + Math.random().toString().slice(2, 17),
        "product_id": appData.id || "com.rc.unlock",
        "original_purchase_date": new Date(now * 1000).toISOString(),
        "original_purchase_date_pst": new Date(now * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
        "purchase_date": new Date(now * 1000).toISOString(),
        "purchase_date_pst": new Date(now * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
        "is_trial_period": "false"
      }],
      "bundle_id": bundle_id || "com.example.app",
      "application_version": "1",
      "original_application_version": "1",
      "creation_date": new Date(now * 1000).toISOString(),
      "expiration_date": new Date(future * 1000).toISOString()
    },
    "status": 0,
    "environment": "Production",
    "latest_receipt_info": [{
      "quantity": "1",
      "purchase_date_ms": (now * 1000).toString(),
      "expires_date": new Date(future * 1000).toISOString(),
      "expires_date_pst": new Date(future * 1000).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
      "expires_date_ms": (future * 1000).toString(),
      "is_in_intro_offer_period": "false",
      "transaction_id": "200000" + Math.random().toString().slice(2, 17),
      "original_transaction_id": "200000" + Math.random().toString().slice(2, 17),
      "product_id": appData.id || "com.rc.unlock",
      "original_purchase_date": new Date(now * 1000).toISOString(),
      "purchase_date": new Date(now * 1000).toISOString(),
      "is_trial_period": "false"
    }],
    "latest_receipt": "base64encodedreceiptdata",
    "pending_renewal_info": [{
      "auto_renew_product_id": appData.id || "com.rc.unlock",
      "original_transaction_id": "200000" + Math.random().toString().slice(2, 17),
      "product_id": appData.id || "com.rc.unlock",
      "auto_renew_status": "1"
    }]
  };
}

function generateSJB() {
  const entitlements = {};
  const entitlementKey = appData.name || 'premium';
  entitlements[entitlementKey] = {
    "expires_date": new Date(future * 1000).toISOString(),
    "product_identifier": appData.id || "com.rc.unlock",
    "purchase_date": new Date(now * 1000).toISOString()
  };
  if (appData.nameb && appData.idb) {
    entitlements[appData.nameb] = {
      "expires_date": new Date(future * 1000).toISOString(),
      "product_identifier": appData.idb,
      "purchase_date": new Date(now * 1000).toISOString()
    };
  }

  const subscriptions = {};
  const subKey = appData.id || "com.rc.unlock";
  subscriptions[subKey] = {
    "expires_date": new Date(future * 1000).toISOString(),
    "original_purchase_date": new Date(now * 1000).toISOString(),
    "purchase_date": new Date(now * 1000).toISOString(),
    "is_sandbox": false,
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  return {
    "request_date": new Date().toISOString(),
    "request_date_ms": now * 1000,
    "subscriber": {
      "entitlements": entitlements,
      "subscriptions": subscriptions,
      "first_seen": new Date(now * 1000).toISOString(),
      "original_application_version": "1",
      "original_purchase_date": new Date(now * 1000).toISOString(),
      "management_url": null,
      "non_subscriptions": {}
    }
  };
}

function generateSJC() {
  return {
    "entitlement": {
      "product_identifier": appData.id || "com.rc.unlock",
      "expires_date": new Date(future * 1000).toISOString()
    },
    "entitlements": {
      (appData.name || 'premium'): {
        "expires_date": new Date(future * 1000).toISOString(),
        "product_identifier": appData.id || "com.rc.unlock"
      }
    }
  };
}

const isSubscriber = url.includes('/subscribers/');
const isReceipt = url.includes('/receipts');

let result;
if (isSubscriber) {
  result = generateSJB();
} else if (appData.cm === 'sja') {
  result = generateSJA();
} else if (appData.cm === 'sjc') {
  result = generateSJC();
} else {
  result = generateSJB();
}

$done({ body: JSON.stringify(result) });
