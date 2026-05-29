# Stash 覆写脚本规范（AI Agent 参考）

本文档供 AI 助手在编写/修改 Stash 覆写及脚本时遵循的规范。

---

## 1. 项目结构

```
opencode/
├── AGENTS.md                    # 本文件
├── README.md                    # 项目说明 + 订阅链接
├── *.stoverride                 # 每个 App 一个独立覆写文件
├── scripts/
│   ├── apps/*.js               # 单 App 解锁脚本
│   ├── revenuecat.js           # RevenueCat 通用解锁
│   ├── itunes.js               # iTunes 验证绕过
│   ├── revenuecat-data.json    # RC App 字典
│   └── exclude.json            # 黑名单
```

## 2. .stoverride 覆写文件格式

### 2.1 基础结构

```yaml
name: 'App名称'
desc: |-
  脚本解锁 App名称
  可多行描述原理
author: alzuobaba
homepage: https://github.com/alzuobaba/private-override
category: '解锁'                     # 可选：'解锁' / '去广告 / 净化' / '功能'
date: '2026-05-29'
version: '1.0.0'

http:
  mitm:                              # 需要 MITM 的域名
    - api.app.com
    - '*.app.com'

  url-rewrite:                       # （可选）零开销拦截
    - ^https?:\/\/api\.app\.com\/ad - reject-200

  script:                            # 脚本匹配
    - match: ^https?:\/\/api\.app\.com\/.+
      name: scriptname
      type: response                 # response | request
      require-body: true             # request 类型通常也需要
      timeout: 5                     # 简单脚本用 5s，复杂用 60s

script-providers:
  scriptname:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/scriptname.js
    interval: 86400                  # 缓存更新间隔（秒）
```

### 2.2 命名规则

- **覆写文件名**：`App名称.stoverride`（含中文，对应 APP_NAMES 字典）
- **Script 名**：`JS_AppName` 或 `JS-1_AppName`（不做硬性要求但需唯一）
- **JS 文件名**：与 script 名保持一致，如 `JS_DeezerHiFiProCrack.js`

### 2.3 MITM 域名

- MITM 域名从脚本 match URL 中提取
- 尽量使用精确域名而非通配符
- 通配符格式：`'*.domain.com'`（带引号防止 YAML 解析问题）

### 2.4 URL-Rewrite 规则

```
格式：^正则表达式 - reject-状态码
```

常见 reject 类型：
- `reject-200`：返回空 200 响应
- `reject-dict`：返回空 JSON `{}`
- `reject-array`：返回空数组 `[]`
- 重定向：`^old_url new_url 302`

### 2.5 Script 匹配规则

```yaml
- match: ^https?:\/\/domain\.com\/path
  name: ScriptName
  type: response         # response = 修改服务端响应，request = 修改客户端请求
  require-body: true     # 需要读取 body
  timeout: 5             # response 5s，复杂 request 60s
```

## 3. JavaScript 脚本规范

### 3.1 基本模版

**response 类型**（修改服务端响应，最常用）：

```javascript
"use strict"

console.log($script.name)           // 启动时输出一次，用于日志定位
console.log($script.name + ' 描述')

var url = $request.url
var body = $response.body

if (body) {
  var obj
  try { obj = JSON.parse(body) } catch (e) {}

  if (obj) {
    // 处理逻辑...
    // 修改 obj 中的字段
    obj.data.vip.status = 1
    $done({ body: JSON.stringify(obj) })
  } else {
    $done({})
  }
} else {
  $done({})
}
```

**request 类型**（修改客户端请求）：

```javascript
"use strict"

console.log($script.name + ' 描述')

var body = $request.body

if (body) {
  try {
    var obj = JSON.parse(body)
    obj.cityCode = '469000'
    $done({ body: JSON.stringify(obj) })
  } catch (e) {
    console.log($script.name + ' error: ' + e)
    $done({})
  }
} else {
  $done({})
}
```

### 3.2 严格规范

- **`"use strict"`** 必须写在文件第一行
- **平铺过程式结构**：不要用 IIFE、class、顶层 return
- **`$done` 每路径只调用一次**：每个执行路径仅尾端调用一次
- **错误捕获**：每个 `JSON.parse` 和对象操作必须包在 `try/catch` 中
- **变量声明**：用 `var`（兼容 Stash 的 JS 引擎）

### 3.3 日志规范

```javascript
// 文件启动时输出 ScriptName
console.log($script.name)

// 匹配请求时输出 URL 或关键信息
console.log($script.name + ' ' + url)
console.log($script.name + ' vip updated')

// 错误日志
console.log($script.name + ' parse error: ' + e)
```

### 3.4 `$done()` 调用方式

```javascript
// 修改响应体
$done({ body: JSON.stringify(obj) })

// 不修改，原样通过
$done({})

// request 类型修改
$done({ body: JSON.stringify(obj) })
```

## 4. Stash API 参考

### 4.1 `$script.name`

Stash 内置变量，值为 `script-providers` 中定义的 provider 名。**所有日志必须用此变量**做前缀。

### 4.2 `$request`

| 属性 | response 类型 | request 类型 |
|------|---------------|--------------|
| `$request.url` | 请求 URL | 请求 URL |
| `$request.body` | 不可用 | 请求体（需 `require-body: true`） |
| `$request.headers` | - | 请求头 |

### 4.3 `$response`

| 属性 | response 类型 | request 类型 |
|------|---------------|--------------|
| `$response.body` | 响应体（需 `require-body: true`） | 不可用 |
| `$response.statusCode` | 状态码 | - |
| `$response.headers` | 响应头 | - |

### 4.4 `$configuration.sendMessage`（策略控制）

用于动态获取/设置策略组状态，解决规则模式下 MITM 不生效问题：

```javascript
// 查询所有策略组状态
$configuration.sendMessage({ action: 'get_policy_state' })
  .then(function (resolve) {
    // resolve.ret = { "Proxy": "🇭🇰 HK", "📺 番剧": "DIRECT", ... }
    var state = resolve.ret
    // 找到目标组名
    var target = null
    for (var g in state) {
      if (/番剧|bili/i.test(g)) { target = g; break }
    }
    // fallback: 取第一个非 DIRECT 组
    if (!target) {
      for (var g in state) {
        if (state[g] !== 'direct') { target = g; break }
      }
    }
    // 设置为 DIRECT
    if (target) {
      return $configuration.sendMessage({
        action: 'set_policy_state',
        content: { [target]: 'direct' }
      })
    }
  })
  .then(function () {}, function () {})
```

## 5. Script-Providers 配置

### 5.1 远程加载（默认）

```yaml
script-providers:
  ScriptName:
    url: https://raw.githubusercontent.com/alzuobaba/private-override/main/scripts/apps/ScriptName.js
    interval: 86400        # 24 小时缓存
```

### 5.2 本地加载（开发/测试）

```yaml
script-providers:
  ScriptName:
    path: scripts/apps/ScriptName.js
    interval: 0            # 不缓存
```

## 6. 单 App 与多端点模式

### 6.1 单端点（简单解锁）

一个 match 匹配一个 URL，修改响应即可（如 deezer.stoverride）。

### 6.2 多端点（复杂 App）

多个 match 共用一个脚本名，脚本内部用 `url` 判断：

```javascript
if (/\/user\/info/.test(url)) {
  // 处理用户信息
} else if (/\/subscription/.test(url)) {
  // 处理订阅信息
}
```

## 7. 安全与最佳实践

1. **所有 response 必须 try/catch** — 避免崩溃导致请求失败
2. **`$done` 不能漏调** — 不调会导致请求挂起
3. **不要用 `$done()` 只调一次** — 多个分支共用尾端 `$done`
4. **不要暴露真实 Token/Key** — 配置文件和数据文件分离（如 `revenuecat-data.json`）
5. **全局变量** — 用 `var`，不要污染全局
6. **不对 JS 加密/混淆** — 明文可读的脚本才能安全审计

## 8. Git 工作流

```bash
git add .
git commit -m "type: description"
git push origin main
```

Commit 类型前缀：
- `feat:` — 新增功能
- `fix:` — 修复
- `refactor:` — 重构
- `remove:` — 删除
- `docs:` — 文档
- `revert:` — 回退
