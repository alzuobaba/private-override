/**
 * 夸克浏览器去广告脚本（适配 Stash）
 * ==================================
 * 拦截夸克浏览器各接口响应，过滤广告内容。
 *
 * 处理端点：
 *   - 首页信息流广告
 *   - 搜索结果广告
 *   - 小说阅读页广告
 *   - 个人中心推广
 */

const url = $request.url;
const body = $response.body;

if (!body) { $done({}); return; }

var obj;
try { obj = JSON.parse(body); } catch (e) { $done({}); return; }

// ============================================================
// 首页信息流 —— 过滤广告卡片
// ENDPOINT: /api/feed 或 /api/recommend
// ============================================================
if (/\/api\/(feed|recommend|homev2)/.test(url)) {
  try {
    if (obj.data && obj.data.items) {
      obj.data.items = obj.data.items.filter(function(item) {
        if (item.ad_flag) return false;
        if (item.is_ad) return false;
        if (item.ad_info) return false;
        if (item.style === 'ad' || item.card_style === 'ad') return false;
        if (item.content_type === 'ad') return false;
        return true;
      });
    }
    if (obj.data && obj.data.list) {
      obj.data.list = obj.data.list.filter(function(item) {
        if (item.ad_flag || item.is_ad || item.ad_info) return false;
        return true;
      });
    }
    // 移除整个广告模块
    if (obj.data && obj.data.modules) {
      obj.data.modules = obj.data.modules.filter(function(mod) {
        if (mod.type === 'ad') return false;
        if (mod.style === 'ad') return false;
        return true;
      });
    }
  } catch (e) { console.log('Quark feed:' + e); }
}

// ============================================================
// 搜索结果 —— 过滤推广位
// ENDPOINT: /api/search
// ============================================================
else if (/\/api\/(search|query)/.test(url)) {
  try {
    if (obj.data && obj.data.items) {
      obj.data.items = obj.data.items.filter(function(item) {
        if (item.is_ad) return false;
        if (item.ad_flag) return false;
        if (item.pos === 'ad') return false;
        return true;
      });
    }
    if (obj.data && obj.data.ads) {
      obj.data.ads = [];
    }
    if (obj.data && obj.data.recommend_ads) {
      obj.data.recommend_ads = [];
    }
  } catch (e) { console.log('Quark search:' + e); }
}

// ============================================================
// 小说阅读 —— 过滤章节间广告
// ENDPOINT: /api/novel 或 /api/reader
// ============================================================
else if (/\/api\/(novel|reader|book)/.test(url)) {
  try {
    if (obj.data && obj.data.ads) {
      obj.data.ads = [];
    }
    if (obj.data && obj.data.interstitial) {
      obj.data.interstitial = null;
    }
    if (obj.data && obj.data.ad_chapter) {
      delete obj.data.ad_chapter;
    }
    // 过滤章节列表中的广告章节
    if (obj.data && obj.data.chapters) {
      obj.data.chapters = obj.data.chapters.filter(function(ch) {
        if (ch.is_ad) return false;
        if (ch.type === 'ad') return false;
        return true;
      });
    }
  } catch (e) { console.log('Quark novel:' + e); }
}

// ============================================================
// 个人中心 —— 移除推广入口
// ENDPOINT: /api/user 或 /api/mine
// ============================================================
else if (/\/api\/(user|mine|profile)/.test(url)) {
  try {
    if (obj.data && obj.data.banners) {
      obj.data.banners = obj.data.banners.filter(function(b) {
        if (b.is_ad) return false;
        return true;
      });
    }
    if (obj.data && obj.data.promotions) {
      obj.data.promotions = [];
    }
    if (obj.data && obj.data.ads) {
      obj.data.ads = [];
    }
  } catch (e) { console.log('Quark profile:' + e); }
}

// ============================================================
// 开屏广告 —— 过期时间设为过去
// ENDPOINT: /api/splash
// ============================================================
else if (/\/api\/(splash|welcome|launch)/.test(url)) {
  try {
    if (obj.data) {
      obj.data.show = false;
      if (obj.data.duration) obj.data.duration = 0;
      if (obj.data.list) obj.data.list = [];
      if (obj.data.splash_list) obj.data.splash_list = [];
    }
  } catch (e) { console.log('Quark splash:' + e); }
}

$done({ body: JSON.stringify(obj) });
