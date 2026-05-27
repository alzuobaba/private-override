# Stash 覆写脚本仓库

https://github.com/alzuobaba/private-override

## 文件结构

```
├── override.yaml                  # RC + iTunes 合一（可选）
├── rc-unlock.stoverride           # RevenueCat 独立覆写
├── itunes-unlock.stoverride       # iTunes 独立覆写
├── bilibili.stoverride            # Bilibili 净化 + 会员画质
├── quark.stoverride               # 夸克浏览器去广告
├── premium.stoverride             # Premium 合集（123 脚本）
├── AGENTS.md                      # 本文档
├── README.md
├── exclude.json                   # 统一黑名单
└── scripts/
    ├── revenuecat.js              # RC 解锁逻辑
    ├── revenuecat-data.json       # App 字典（bundle 23 + listua 345）
    ├── itunes.js                  # iTunes 验证绕过
    ├── bilibili.js                # Bilibili 多功能脚本
    ├── quark.js                   # 夸克 CMS 去广告
    └── premium/                   # 123 个 App 解锁脚本
```

## 使用方法

在 Stash 中导入对应的 `.stoverride` 文件：

| 文件 | 功能 | 来源 |
|------|------|------|
| `rc-unlock.stoverride` | RevenueCat 内购解锁（200+ App） | 基于 Reheji.js @ddm1023 |
| `itunes-unlock.stoverride` | iTunes verifyReceipt 验证绕过 | 基于 iTunes.sgmodule |
| `override.yaml` | RC + iTunes 合一 | 上述两者合并 |
| `bilibili.stoverride` | 1080P+4K画质 / 去广告 / 页面净化 | 基于 Moli-X Bilibili |
| `quark.stoverride` | 夸克浏览器去广告（703 CMS key） | 基于 kelee.one 可莉 |
| `premium.stoverride` | 100+ App 解锁合集 | 基于 BOBOLAOSHIV587/Rules |

**推荐组合**：导入 `rc-unlock.stoverride` + `itunes-unlock.stoverride`，再按需导入 `bilibili`、`quark`、`premium`。

---

# 各脚本原理

## revenuecat.js — RevenueCat 解锁

拦截 `api.revenuecat.com` / `api.rc-backup.com` 的验证请求。数据与逻辑分离：

- `revenuecat-data.json`：App 字典（bundle ID → 商品 ID + 响应模式），通过 `$persistentStore` 缓存
- `revenuecat.js`：纯逻辑，加载字典后在原始响应上增量合并（ddm 策略）

三种响应模式：

| 模式 | 端点 | 格式 |
|------|------|------|
| SJA | `/receipts` | 模拟 Apple 回执（receipt + latest_receipt_info + pending_renewal_info） |
| SJB | `/subscribers/` | RevenueCat subscriber 格式（entitlements + subscriptions） |
| SJC | `/receipts`（特定 App） | 扁平化 entitlement 对象 |

## itunes.js — iTunes 验证绕过

拦截 `buy.itunes.apple.com/verifyReceipt` 的响应（http-response），在 Apple 原始回执上注入 2099 年到期的订阅记录。

- 已有购买 → 延长 `expires_date`
- 无购买 → fallback `{bundle_id}.premium`（局限：无法查询 App Store API）

## bilibili.js — Bilibili 多功能

15 个端点统一处理：
- VIP 画质：`/x/v2/account/myinfo` 注入 `vip.type=2, status=1`
- 去广告：feed/dynamic/live/splash 过滤广告卡片
- 页面净化：mine/tab/search/bangumi 移除推广入口
- url-rewrite 层直接拦截 8 个广告请求（零开销）

## quark.js — 夸克去广告

**唯一策略**：拦截 `open-cms-api.quark.cn/open-cms`，删除响应中 703 条 CMS 配置 key。夸克的所有广告/弹窗/VIP推广均由这些远程配置开关控制，删除 key 等同于关闭所有广告功能。

## premium/ — Premium 合集

源自 BOBOLAOSHIV587/Rules 的 126 个解锁脚本，已全部本地化到 `scripts/premium/`。覆盖：阿里云盘、百度网盘、ChatGPT、Spotify、WPS、剪映、迅雷、美图秀秀、GoodNotes、Notability、Picsart 等 100+ App。

RevenueCat 重叠部分（Reheji.js/crack.js/Revenuecat.js 共 6 条规则）已移除，统一由 `rc-unlock.stoverride` 覆盖。

---

# 黑名单

编辑 `scripts/exclude.json` 可关闭指定 App 的解锁：

```json
{
  "exclude": ["APTV", "com.example.app"]
}
```

- RC 脚本检查 UA 关键字 + bundle ID 双重匹配
- iTunes 脚本检查 bundle_id
- 修改后推送即可，脚本通过 `$persistentStore` 缓存

---

# 数据更新

**RevenueCat 字典**：编辑 `scripts/revenuecat-data.json`，推送后脚本自动缓存加载。

**Premium 脚本**：上游 `BOBOLAOSHIV587/Rules` 更新时，重新下载对应 JS 文件到 `scripts/premium/`。

---

# Stash 兼容性

- 覆写格式：`http.script` + `script-providers`，符合 [Stash Wiki](https://stash.wiki/configuration/override) 标准
- 脚本类型：`response` 或 `request`，按需 `require-body: true`
- 脚本缓存：`interval: 86400`（每日检查更新）
- 需开启 MITM 并信任根证书
