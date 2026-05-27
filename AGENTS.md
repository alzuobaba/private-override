# Reheji.js 分析

**来源**: https://raw.githubusercontent.com/chxm1023/Rewrite/main/Reheji.js
**作者**: @ddm1023

## 功能

RevenueCat 系列解锁合集。拦截 `api.revenuecat.com` / `api.rc-backup.com` 的订阅验证请求，根据 bundle ID 或 User-Agent 匹配 App，注入 premium 凭证。

## 双上下文脚本

Reheji.js 是一个**双上下文脚本**，在 Surge/Loon 中同时注册为 `script-response-body` 和 `script-request-header`：

| 上下文 | `$response` | 行为 |
|--------|------------|------|
| response-body | 可用 | `ddm = JSON.parse($response.body)` → 在原始响应上**增量修改后返回** |
| request-header | undefined | `ddm = {}` → 从头构造响应 |

这就是 `ddm` 变量（L21）的核心意义：**合并而非覆盖**。RevenueCat 响应的辅助字段（`request_date`、`non_subscriptions`、`management_url` 等）必须保留，否则部分 App 可能校验失败。

## 结构

1. **禁止列表**: 检测 `forbiddenApps` 中 UA 或 `$request.body` 时立即放行（UA 级 + body 级双重防护）
2. **bundle 字典**（24 条）: 按 `X-Client-Bundle-ID` header 匹配 → `{ name, id, cm }`
3. **listua 字典**（~180 条）: 按 User-Agent 匹配（同上结构）
4. **响应模式**:
   - `sja` (App Store 回执格式): `/receipts` 端点 → 注入 `receipt.in_app` + `latest_receipt_info` + `pending_renewal_info`
   - `sjb` (subscriber 格式): `/subscribers/` 端点 → 注入 `subscriber.entitlements` + `subscriber.subscriptions`
   - `sjc` (简易格式): `/receipts` 端点特定 App → 扁平化 `entitlement` 对象
5. **APTV 例外**: APTV 同时存在于 `forbiddenApps` 和 `listua` — 前者按 UA 阻断新版本，后者作为旧版本降级策略
6. **末尾 jsjiami v5 混淆**: 混淆段包含上述路由逻辑的编解码实现，数据字典在混淆前已明文定义

## Stash 适配要点

- 使用 `http-response` + `response-body`，`$response` 始终可访问
- 三个 merge 函数（`mergeSJA`/`mergeSJB`/`mergeSJC`）均对 `ddm` **就地修改**，保留原响应所有字段
- `$request.body` 参与 forbiddenApps 检测（补齐原脚本的 body 检查）
- `/subscribers/` → 始终 mergeSJB；`/receipts` → 按 `cm` 路由

---

# iTunes.sgmodule 分析

**来源**: https://reven.jsforbaby.workers.dev/reven/iTunes.sgmodule

## 功能

iTunes 内购验证绕过。将 `buy.itunes.apple.com/verifyReceipt` 转发至 Cloudflare Worker (`reven.jsforbaby.workers.dev`)。

## 原实现

```
[URL Rewrite]
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt
  → {{{Mock}}}/buy.itunes.apple.com/verifyReceipt?enabled={{{Enabled}}}&expires={{{Expires}}}&country={{{Country}}} header
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `Mock` | `https://reven.jsforbaby.workers.dev/reven` | Worker 网关 |
| `Enabled` | `true` | 启用/关闭注入 |
| `Expires` | `2099-09-09` | 订阅到期日 |
| `Country` | `HK` | App Store 地区码 |

## Worker 实际行为（通过测试推断）

实测定点 `POST` 到 Worker：
- `enabled=false` → Worker 透传请求至 Apple 并返回原始响应
- `enabled=true` → Worker 转发至 Apple，然后对响应注入订阅，再返回给客户端

Worker 的核心价值是**通过 `Country` 参数调用 Apple App Store Lookup API**，查询该 App 在该区实际上架的商品，选取最贵商品 ID 作为注入目标。`enabled=false` 是一个干净的旁路开关。

## 自包含重写 (itunes.js) — 策略与局限

替代 Worker 的方法：拦截 **Apple 原始响应**（http-response），对其注入订阅数据后返回。

**策略**：
1. 若 Apple 返回的 `latest_receipt_info` 已有条目 → 延长所有条目的 `expires_date` 到 2099 年，保留原始 `product_id`
2. 若无条目 → 创建一条 fake 条目，`product_id` 提取来源：
   - 优先取 `latest_receipt_info[0].product_id`（已有购买）
   - 其次取 `receipt.in_app[0].product_id`
   - 最后 fallback 为 `{bundle_id}.premium`

**根本局限**：无法查询 App Store API，因此对"从未有过任何 IAP 购买"的 App（Apple 返回含空 `in_app` 的合法 receipt），`{bundle_id}.premium` 是**猜测值**，不匹配真实 product_id 则解锁失败。对"曾有过购买但已过期"的 App，延长真实 product_id 的条目可直接生效。

**修复点**：
- `$done({})` 后追加 `return` 防止后续代码执行
- Apple 返回错误码（21002/21006/21007 等）→ 确保 `obj.receipt` 存在后再操作，`status` 统一置 0
- `product_id` 多级 fallback 链保证不乱猜

---

# override.yaml 配置

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
      match: ^https:\/\/api\.(revenuecat|rc-backup)\.com\/v[12]\/(receipts|subscribers\/[^/?]+)(\/.*)?$
      script-path: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/revenuecat.js
      type: response-body
      require-body: true

mitm:
  hostnames:
    - api.revenuecat.com
    - api.rc-backup.com
    - buy.itunes.apple.com
```

## 正则优化说明

RevenueCat 正则以 `v[12]\/(receipts|subscribers\/[^/?]+)(\/.*)?` 精确限定标准 API 路径：
- 匹配: `/v1/receipts`, `/v2/receipts`, `/v1/subscribers/user123`, `/v1/subscribers/user123/offerings`
- 不匹配: `/v1/diagnostics`, `/v1/health` 等无关端点

## 注意事项

- 需在 Stash 中开启 MITM 并信任根证书
- RevenueCat 字典需定期从上游 Reheji.js 同步新增的 App 映射
- iTunes fallback product_id 仅为 `{bundle_id}.premium`，对无购买记录的 App 可能不匹配
