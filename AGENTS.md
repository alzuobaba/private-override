# Reheji.js 分析

**来源**: https://raw.githubusercontent.com/chxm1023/Rewrite/main/Reheji.js
**作者**: @ddm1023

## 功能

RevenueCat 系列解锁合集。拦截 `api.revenuecat.com` / `api.rc-backup.com` 的订阅验证请求，根据 bundle ID 或 User-Agent 匹配 App，注入 premium 凭证。

## 结构

1. **禁止列表**: 检测到 `forbiddenApps` 中的 UA 时立即放行（防止 MITM 检测）
2. **bundle 字典**: 按 `X-Client-Bundle-ID` header 匹配 → { name, id, cm }
   - `name`:  entitlements 键名
   - `id`:    product_identifier
   - `cm`:    响应模式（sja/sjb/sjc）
3. **listua 字典**: 按 User-Agent 匹配（同上结构）
4. **响应模式**:
   - `sja` (App Store 回执格式): 返回 `receipt` + `latest_receipt_info` + `pending_renewal_info`，供客户端自行验证
   - `sjb` (subscriber 格式): 返回 `subscriber.entitlements` + `subscriber.subscriptions`，RevenueCat SDK 标准格式
   - `sjc` (简易格式): 返回扁平化 `entitlement` 对象
5. **双重匹配**: ⚡️ /receipts 端点走 sja/sjc；/subscribers/ 端点始终走 sjb
6. **末尾 jsjiami 混淆**: 实际数据字典在混淆前已定义，混淆段不影响核心功能

## 关键请求头

| Header | 用途 |
|--------|------|
| `X-Client-Bundle-ID` | 匹配 bundle 字典 |
| `User-Agent` | 匹配 listua 字典 |

---

# iTunes.sgmodule 分析

**来源**: https://reven.jsforbaby.workers.dev/reven/iTunes.sgmodule

## 功能

iTunes 内购验证绕过。将 `buy.itunes.apple.com/verifyReceipt` 请求转发至 Reven Worker，由 Worker 注入订阅凭证。

## 原实现

```
[URL Rewrite]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt
  → {{{Mock}}}/buy.itunes.apple.com/verifyReceipt?enabled=true&expires=2099-09-09&country=HK  header
```

- `Mock` 参数: Worker 网关地址（默认 `https://reven.jsforbaby.workers.dev/reven`）
- `Enabled`: 是否启用解锁（true/false）
- `Expires`: 订阅到期日期（默认 2099-09-09）
- `Country`: App Store 地区码，用于 Worker 查询该区上架的商品 ID

## Worker 推断行为

1. 接收 App 发往 Apple 的 `verifyReceipt` POST 请求（含 `receipt-data`）
2. 将 `receipt-data` 转发至 Apple 生产/沙箱环境解码
3. 从解码结果中提取 `bundle_id`
4. 根据 `country` 参数请求 App Store API，查询该 bundle_id 下所有商品
5. 选取最贵/最高等级的商品 ID，在 `latest_receipt_info` 中创建一条订阅记录
6. 返回修改后的凭证给客户端

## 自包含重写 (itunes.js)

不依赖外部 Worker，直接拦截 Apple 的响应并修改：

1. **有已有订阅**: 遍历 `in_app` / `latest_receipt_info`，将所有 `expires_date` 延长至 2099 年
2. **无订阅记录**: 从响应中的 `bundle_id` 或请求头提取 bundle ID，生成 `{bundle_id}.premium` 作为 product_id，创建一条 fake 订阅
3. **状态修正**: 始终将 `status` 置为 0（成功），补充 `pending_renewal_info`

---

# Stash 适配

## override.yaml

```yaml
scripts:
  - http-response:
      name: itunes-verify
      match: ^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt
      script-path: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/itunes.js
      type: response-body
      require-body: true

  - http-response:
      name: revenuecat
      match: ^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$)
      script-path: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/revenuecat.js
      type: response-body
      require-body: true

mitm:
  hostnames:
    - api.revenuecat.com
    - api.rc-backup.com
    - buy.itunes.apple.com
```

## 注意事项

- 需在 Stash 中开启 MITM 并信任根证书
- RevenueCat 字典中的数据会持续过时，需要定期从上游 Reheji.js 同步新增的 App 映射
- iTunes 脚本依赖 Apple 响应中已有的 bundle_id，若 Apple 返回空收据则采用 fallback product_id
