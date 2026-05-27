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

**RevenueCat 字典**：编辑 `scripts/revenuecat-data.json`，推送后脚本通过 `$persistentStore` 自动缓存加载。

**Premium 脚本**：已全部本地化至 `scripts/premium/`，运行时无任何外部依赖。如需跟踪上游更新，手动对比 [BOBOLAOSHIV587/Rules](https://github.com/BOBOLAOSHIV587/Rules) 后替换对应文件。

---

# Stash 兼容性

- 覆写格式：`http.script` + `script-providers`，符合 [Stash Wiki](https://stash.wiki/configuration/override) 标准
- 脚本类型：`response` 或 `request`，按需 `require-body: true`
- 脚本缓存：`interval: 86400`（每日检查更新）
- 需开启 MITM 并信任根证书


## 覆盖 App 清单

### RevenueCat 解锁（rc-unlock.stoverride / override.yaml）

**通过 Bundle ID 匹配（23 个）：**

- `TeleprompterX`
- `app.imone.OneWidget`
- `camp.user.penbook`
- `com.OfflineMusic.www`
- `com.ausoco.umai`
- `com.exoplanet.chatme`
- `com.flexicalc.app`
- `com.laser-focused.focus-ios`
- `com.reader.book`
- `com.reku.Counter`
- `com.roehl`
- `com.runbuddy.prod`
- `com.skysoft.removalfree`
- `com.trainfitness.Train`
- `com.valo.reader`
- `com.voicedream.Voic`
- `com.zhang333.dd`
- `design.yugen.Flow`
- `io.fadel.TeleprompterX`
- `io.innerpeace.yiye`
- `moonbox.co.il.grow`
- `net.tengl.powertimer`
- `tech.miidii.MDClock`

**通过 User-Agent 匹配（345 个）：**

- #：1Blocker
- A：A Widget, AICalculator, AIChat, AIKeyboard, AI Chat, APTV, ASKAI, Accountit, AccuFind, Airmail, Aisten, Alpenglow, AnimeArt, AnkiPro, Anybox, Ape, Aphrodite, AppBox, ArchiveList, ArtStage …等 32 个
- B：BORD, BabyCare, BeetleADB, Bg Remover, Binsoo, Boar, Brass, Browser, becoming, bluredit
- C：CPUMonitor, Calflow, CallAnnie, Carbon-iOS, CardPhoto, CharingCrossRoad, ChatBot, ChatGPTApp, ChatLLM, ChatPub, Chatty, Chat练口语, ClevCalc, Clipboard, CodeScanner, CollageMaker, Collect, Color Widgets, ContextApp, Context_iOS …等 25 个
- D：DHWaterMarkManager, Dailyart, DarkLooker, Darkroom, DataCalc, DayPoem, Decision, Dotly, Drops, Drowsy, Dumb Phone, dtdvibe
- E：EasyClicker, Echo, ElementNote, ElonAI, Email Me, EncryptNote, Endel, EraseIt, easy_chart
- F：FRMD, Facebook, Falendar, Flourish, FoJiCam, FocusFour, Fontsify, Food-Diary, Free, FretTrainer, FruitMinder, FujiLifeStyle, fastdiet, fengling
- G：Gear, Gentler, GradientMusic, GrowthPath
- H：HRZN, HTTPBot, Habitor, Happy:Days, Harukong, Heal Clock, Hi论坛/69, HurtYou
- I：IDM, IPCams, IPTVUltra, ImageX, ImagineAI, Infltr, iBody, iRead, ig-bookmarker, image_upscaler, intervalFlow, ip_tv_react_native, iplayTV
- J：Jellycuts, Journal_iOS, Joy
- K：Kylin, kiddztube, knowme-storage
- L：LUTCamera, Langster, Language Learning, LaunchTrans, Law, LazyBoard, LazyReply, Ledger, Leica LUX, LemonKeepAccounts, Liftbear, Lightune, Linearity Curve, Lito, LiveCaption, LiveWallpaper, LockFlow, Loopsie, Loora
- M：MOZE, MagicTiles3, MallocVPN, MatrixClock, MaxWallpaper, Meal Planner, Medication List, MinimalDiary, Mockview, Mojo, MoneyThings, Moonlitt, Morphose, MuCase, MusicMate, MusicPutty, My Diary, My Time, MyPianist, MySticker …等 28 个
- N：No Fusion, NotePlan, Noto 笔记, nPtt, nbcamera
- O：ObjectRemoval, OffScreen, One4WallSwiftUI, OneClear, OneFlag, OneGrow, OneMockup, OneScreen, OneTap, OneTodo, OneWidget, OrbitFast, Overdue, opusvpn
- P：PDF Viewer, PDF_convertor, PM4, Packr, Pantry Check, Paper, Percento, Persona, Personal Best, Photo Cleaner, PhotoMapper, PhotoRoom, PhotoVault, Photomator, Photon, Photoooo, Phtoto Swiper, PianoTrainer, PicLoom, Pigment …等 32 个
- Q：QingLong, QuietCam, quitnow
- R：Readle, Rec, Ricoh Recipes, Rootd, remoteMouse, rewritingText
- S：SCRL, Saifs Ai, SalesCat, ScannerPro, Scelta, ScreenRecordCase, Seamless, Sex Actions, Shapy, Shared Family Shopping List, SharkSMS, ShellBean, ShellBoxKit, ShouChong, SleepDown, SleepSounds, SmartAIChat, SnapWords, Snipd, Spark …等 38 个
- T：TQBrowser, Taio, Tangerine, TextMask, TheGreatMe, Themy, Thiro, Tide Guide, TimeFinder, TouchRetouchBasic, Tracepad-iOS, Transfer, Translate - Talk Translator, TripMemo, TruthOrDare, TuneTally, tetrify, tiimo, timetrack.io, totowallet …等 21 个
- U：UTC, Unfold, Utiful
- V：VSCO, VibeCamera, VidCap, Video Teleprompter, Vinyls, Vision, VoiceAI, vibes
- W：WallShift, Watchly, WeNote, Whisper, WhiteCloud, WidgetSmith, Wishy, Worrydolls, Wozi, widget_art, wordswag
- Y：Yosum, YubePiP, Yummi
- Z：Zen Flip Clock, Zettelbox
- 事：事线
- 人：人生清单
- 信：信息计算
- 凹：凹凸啦查妆
- 喵：喵组件
- 手：手持弹幕
- 时：时间记录
- 目：目标地图
- 秩：秩序时钟, 秩序目标
- 美：美妆日历
- 翻：翻页时钟
- 萌：萌客AI绘画
- 语：语音计算器
- 谜：谜底时钟, 谜底黑胶
- 资：资源搬运大师
- 车：车票票

> 总计覆盖 **368** 个 App

### iTunes 验证绕过（itunes-unlock.stoverride / override.yaml）

所有使用 `buy.itunes.apple.com/verifyReceipt` 验证内购的 App 均可受益。
已有购买记录的 App 直接生效；无购买记录的 App 需 product_id 匹配。

### Premium 合集（premium.stoverride）

131 个独立解锁脚本：

- AGC Video Player解锁会员
- AdBlockPro 终身订阅
- AdGuard 解锁永久高级版
- Aloha Browser解锁Premium
- AutoCAD解锁Pro
- B612解锁VIP
- Boom解锁高级会员权限
- ChatGPT 解锁 Plus 订阅
- Craft解锁Premium
- Cubox - 文章阅读与标注笔记 解锁高级会员
- DJ串烧集-解锁VIP
- DJ音乐库-解锁VIP
- Deezer解锁Hi-Fi订阅
- Documents文件管理器+解锁订阅
- Drafts解锁Pro
- DreamFace解锁Pro
- Emby Premiere Unlock解锁
- Endel-舒缓睡眠音-解锁Premium
- Epik解锁Pro
- FaceLab解锁Vip
- FaceSwapper-AI换脸解锁Vip
- Filmic Pro相机解锁高级会员
- Filmix解锁Pro
- Filmr-视频剪辑 解锁 PRO
- Flightradar24 解锁Gold
- FlipaClip解锁Plus
- Flow & VN套装-解锁Premium
- Focos+Focos live☆解锁会员权限
- Funimate 解锁 Premium
- GitHub解锁永久订阅
- GoodNotes6☆解锁会员权限
- IFTTT解锁永久Vip
- IPA应用辅助安装器
- MIX 解锁特权 (需恢复购买)
- MIX2 解锁会员
- MissAV去广告
- Moises-音乐人应用解锁Premium
- Morpholio Trace - Sketch CAD草图解锁Pro
- Movavi-视频图片编辑解锁Pro
- Musixmatch解锁会员功能
- MyFitnessPal解锁Premium
- Nicegram会员解锁
- Notability解锁2099年
- Notebook笔记本-解锁Pro
- PeakVisor解锁Premium
- Perfect365 解锁VIP
- Photoshop Express-图片编辑&修图 解锁Premium
- Picsart美易 解锁Gold
- PikPak解锁会员
- Polarr 泼辣修图解锁Pro
- Qobuz解锁Hi-Res订阅
- Reddit过滤应用内推广,阻止NSFW提示,解锁会员功能
- Slidebox解锁Pro
- Soundcloud解锁Go plus
- Spotify if-none-match返回304状态码
- Spotify解锁Premium
- SwiftyCompiler解锁Premium Lifetime
- Symbolab计算器-数学分步求解器(需要登录)解锁Premium
- TIDAL解锁HiFi Plus
- Termius解锁Premium
- VK音乐-解锁VIP
- VN视频剪辑解锁订阅
- VivaCut解锁永久订阅
- WPS 解锁超级会员 Pro
- WPS解锁稻壳会员
- WallCraft解锁永久专业版
- WorkingCopy 解锁Pro.利用 GitHub Education解锁Working Copy
- XMind思维导图+解锁VIP
- Y2002电音-DJ电音音乐播放器解锁永久Vip
- YandexMusic-解锁VIP
- iLovePDF解锁Vip
- 书旗小说-会员中心
- 书旗小说-用户中心
- 云听-全国电台有声书解锁会员
- 会员优惠券弹窗
- 会员界面横幅广告
- 兔U-引领广播剧潮牌 Unlock VIP SVIP
- 全本小说—淘小说—解锁VIP
- 剪映解锁会员
- 听读训练
- 咪咕视频 开屏广告
- 咪咕视频Vip会员
- 咪咕音乐去广告
- 咪咕音乐解锁Vip
- 地震预警-解锁会员
- 墨迹天气解锁SVip
- 宜搜小说-全场免费读超级会员
- 小旋风收音机解锁VIP
- 山丘阅读解锁Vip
- 幕布-大纲笔记&思维导图 解锁终身会员
- 彩云天气 解锁SVIP.最高支持版本：6.7.2(旧版)
- 得间小说-解锁会员
- 懒人听书vip
- 扫描全能王-手机扫描仪 解锁黄金会员
- 插画世界-P站画师创作约稿平台解锁Vip
- 插画世界-去开屏广告
- 搜索预想
- 波点音乐 会员调试 + 去广告 + 下载功能 + 付费专辑解锁
- 海角社区 解锁付费会员视频
- 滚动截屏-解锁 Premium
- 熊猫脑洞小说VIP
- 爱听收音机解锁会员
- 猫头鹰文件-解锁VIP
- 白描解锁黄金会员
- 百度网盘解锁 SVIP
- 石墨文档-在线文档协作编辑和表格制作 解锁超级会员
- 网易有道词典  翻译 广告均由 安妮 分享
- 网易有道词典解锁会员
- 网易蜗牛读书解锁Vip
- 美图秀秀 解锁SVIP 获取ai擦除照片
- 美颜相机 解锁VIP
- 芒果TV+去广告,页面优化
- 芒果TV,Vip+会员画质+去广告,页面优化
- 蛋啵解锁vip功能
- 蜗牛睡眠解锁Vip
- 解锁 Pixiv Premium
- 解除微信链接限制
- 轻图解锁Pro
- 迅雷Unlock 倍速播放
- 追读小说-解锁会员
- 酷我音乐解锁VIP
- 醒图解锁会员
- 阿基米德-电台FM解锁Vip
- 阿里云盘解锁SVIP
- 随手写FeeNote-解锁Premium
- 首次查词弹窗
- 首页左上角福利中心
- 首页弹窗


### 独立覆写

- **bilibili.stoverride**：哔哩哔哩（1080P+4K画质 / 去广告 / 页面净化）
- **quark.stoverride**：夸克浏览器（去广告：阅读/弹窗/横幅/VIP推广）

---

### 总计覆盖

| 覆写 | App 数量 |
|------|---------|
| RevenueCat（rc-unlock） | 368 |
| iTunes（itunes-unlock） | 通用（所有 verifyReceipt App） |
| Premium | 128 |
| Bilibili | 1 |
| Quark | 1 |
| **合计** | **498+** |
