# Stash 覆写脚本仓库

存放 Stash 覆写脚本，用于修改和增强 Stash 代理工具的规则与策略。

## 功能

- **RevenueCat 解锁** — 拦截 `api.revenuecat.com` / `api.rc-backup.com` 的订阅验证请求，注入 premium 凭证
- **iTunes 验证绕过** — 将 `buy.itunes.apple.com/verifyReceipt` 请求转发至 Reven 网关，注入订阅凭证

## 使用方法

1. 在 Stash 中导入 `override.yaml`
2. 启用覆写
3. 确保已开启 MITM 并信任证书
