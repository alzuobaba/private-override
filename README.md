# Stash 覆写脚本仓库

https://github.com/alzuobaba/private-override

## 订阅链接

在 Stash 中导入以下链接即可使用：

| 文件 | 功能 | 订阅 URL |
|------|------|----------|
| **全功能整合版** | RC+iTunes+Bilibili+夸克+Premium 一键导入 | `https://raw.githubusercontent.com/alzuobaba/private-override/main/override.stoverride` |
| **RevenueCat 解锁** | 内购解锁（368 App） | `https://raw.githubusercontent.com/alzuobaba/private-override/main/rc-unlock.stoverride` |
| **iTunes 验证绕过** | 兜底方案（已过期订阅激活） | `https://raw.githubusercontent.com/alzuobaba/private-override/main/itunes-unlock.stoverride` |
| **Bilibili 净化** | VIP画质解锁 + 去广告 + 页面净化 | `https://raw.githubusercontent.com/alzuobaba/private-override/main/bilibili.stoverride` |
| **夸克去广告** | 浏览器去广告（703 CMS key） | `https://raw.githubusercontent.com/alzuobaba/private-override/main/quark.stoverride` |
| **Premium 合集** | 123 个 App 解锁脚本 | `https://raw.githubusercontent.com/alzuobaba/private-override/main/premium.stoverride` |

**推荐组合**：导入 `rc-unlock.stoverride` + `itunes-unlock.stoverride`，再按需导入其余覆写。

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

## Bilibili — Bilibili 多功能

15 个端点统一处理：
- VIP 画质：`/x/v2/account/myinfo` 注入 `vip.type=2, status=1`
- 去广告：feed/dynamic/live/splash 过滤广告卡片
- 页面净化：mine/tab/search/bangumi 移除推广入口
- url-rewrite 层直接拦截 8 个广告请求（零开销）

## Quark — 夸克去广告

**唯一策略**：拦截 `open-cms-api.quark.cn/open-cms`，删除响应中 703 条 CMS 配置 key。夸克的所有广告/弹窗/VIP推广均由这些远程配置开关控制，删除 key 等同于关闭所有广告功能。

## 独立 App 脚本

源自 BOBOLAOSHIV587/Rules 的 126 个解锁脚本，已全部本地化到 `scripts/apps/`。覆盖：阿里云盘、百度网盘、ChatGPT、Spotify、WPS、剪映、迅雷、美图秀秀、GoodNotes、Notability、Picsart 等 100+ App。

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

**Premium 脚本**：已全部本地化至 `scripts/apps/`，运行时无任何外部依赖。如需跟踪上游更新，手动对比 [BOBOLAOSHIV587/Rules](https://github.com/BOBOLAOSHIV587/Rules) 后替换对应文件。

---

# Stash 兼容性

- 覆写格式：`http.script` + `script-providers`，符合 [Stash Wiki](https://stash.wiki/configuration/override) 标准
- 脚本类型：`response` 或 `request`，按需 `require-body: true`
- 脚本缓存：`interval: 86400`（每日检查更新）
- 需开启 MITM 并信任根证书


## 统一 App 索引

| App 名称 | Bundle ID / 域名 | UA 关键字 | 覆盖方式 |
|----------|-----------------|-----------|----------|
| 1Blocker | - | `1Blocker` | RevenueCat |
| A Widget | - | `A%20Widget` | RevenueCat |
| Accountit | - | `Accountit` | RevenueCat |
| AccuFind | - | `AccuFind` | RevenueCat |
| AdBlock终身订阅 | - | - | Premium 专用脚本 |
| adbTools | - | `adbTools` | RevenueCat |
| AdGuard解锁永久高级版 | - | - | Premium 专用脚本 |
| AGC Player解锁会员 | `api.agcplayer.com` | - | Premium 专用脚本 |
| ai_music_generator | - | `ai_music_generator` | RevenueCat |
| AICalculator | - | `AICalculator` | RevenueCat |
| AIChat | - | `AIChat` | RevenueCat |
| AIKeyboard | - | `AIKeyboard` | RevenueCat |
| Airmail | - | `Airmail` | RevenueCat |
| Aisten | - | `Aisten` | RevenueCat |
| AI Chat | - | `AI%C2%A0Chat` | RevenueCat |
| alistTools | - | `alistTools` | RevenueCat |
| AlohaBrowser解锁Premium | - | - | Premium 专用脚本 |
| Alpenglow | - | `Alpenglow` | RevenueCat |
| andyworks-calculator | - | `andyworks-calculator` | RevenueCat |
| AnimeArt | - | `AnimeArt` | RevenueCat |
| AnkiPro | - | `AnkiPro` | RevenueCat |
| Anybox | - | `Anybox` | RevenueCat |
| Ape | - | `Ape` | RevenueCat |
| Aphrodite | - | `Aphrodite` | RevenueCat |
| apollo | - | `apollo` | RevenueCat |
| app.imone.OneWidget | `app.imone.OneWidget` | - | RevenueCat |
| app/112 | - | `app/112` | RevenueCat |
| app/38 | - | `app/38` | RevenueCat |
| AppBox | - | `AppBox` | RevenueCat |
| APTV | - | `APTV` | RevenueCat |
| ArchiveList | - | `ArchiveList` | RevenueCat |
| ArtStage | - | `ArtStage` | RevenueCat |
| ASKAI | - | `ASKAI` | RevenueCat |
| Assembly | - | `Assembly` | RevenueCat |
| Atomic | - | `Atomic` | RevenueCat |
| audiomack-iphone | - | `audiomack-iphone` | RevenueCat |
| Authenticator | - | `Authenticator` | RevenueCat |
| AutoCAD解锁Pro | - | - | Premium 专用脚本 |
| Awake | - | `Awake` | RevenueCat |
| B612解锁VIP | - | - | Premium 专用脚本 |
| BabyCare | - | `BabyCare` | RevenueCat |
| becoming | - | `becoming` | RevenueCat |
| BeetleADB | - | `BeetleADB` | RevenueCat |
| Bg Remover | - | `Bg%20Remover` | RevenueCat |
| Binsoo | - | `Binsoo` | RevenueCat |
| bluredit | - | `bluredit` | RevenueCat |
| Boar | - | `Boar` | RevenueCat |
| Boom解锁高级会员 | - | - | Premium 专用脚本 |
| BORD | - | `BORD` | RevenueCat |
| Brass | - | `Brass` | RevenueCat |
| Browser | - | `Browser` | RevenueCat |
| Calflow | - | `Calflow` | RevenueCat |
| CallAnnie | - | `CallAnnie` | RevenueCat |
| camp.user.penbook | `camp.user.penbook` | - | RevenueCat |
| Carbon-iOS | - | `Carbon-iOS` | RevenueCat |
| CardPhoto | - | `CardPhoto` | RevenueCat |
| CharingCrossRoad | - | `CharingCrossRoad` | RevenueCat |
| ChatBot | - | `ChatBot` | RevenueCat |
| ChatGPTApp | - | `ChatGPTApp` | RevenueCat |
| ChatGPT解锁 Plus 订阅 | - | - | Premium 专用脚本 |
| ChatLLM | - | `ChatLLM` | RevenueCat |
| ChatPub | - | `ChatPub` | RevenueCat |
| Chatty | - | `Chatty` | RevenueCat |
| Chat练口语 | - | `Chat%E7%BB%83%E5%8F%A3%E8%AF%AD` | RevenueCat |
| ClevCalc | - | `ClevCalc` | RevenueCat |
| Clipboard | - | `Clipboard` | RevenueCat |
| CodeScanner | - | `CodeScanner` | RevenueCat |
| CollageMaker | - | `CollageMaker` | RevenueCat |
| Collect | - | `Collect` | RevenueCat |
| Color Widgets | - | `Color%20Widgets` | RevenueCat |
| com.ausoco.umai | `com.ausoco.umai` | - | RevenueCat |
| com.dison.diary | - | `com.dison.diary` | RevenueCat |
| com.exoplanet.chatme | `com.exoplanet.chatme` | - | RevenueCat |
| com.flexicalc.app | `com.flexicalc.app` | - | RevenueCat |
| com.laser-focused.focus-ios | `com.laser-focused.focus-ios` | - | RevenueCat |
| com.OfflineMusic.www | `com.OfflineMusic.www` | - | RevenueCat |
| com.reader.book | `com.reader.book` | - | RevenueCat |
| com.reku.Counter | `com.reku.Counter` | - | RevenueCat |
| com.roehl | `com.roehl` | - | RevenueCat |
| com.runbuddy.prod | `com.runbuddy.prod` | - | RevenueCat |
| com.skysoft.removalfree | `com.skysoft.removalfree` | - | RevenueCat |
| com.trainfitness.Train | `com.trainfitness.Train` | - | RevenueCat |
| com.valo.reader | `com.valo.reader` | - | RevenueCat |
| com.voicedream.Voic | `com.voicedream.Voic` | - | RevenueCat |
| com.zhang333.dd | `com.zhang333.dd` | - | RevenueCat |
| Context_iOS | - | `Context_iOS` | RevenueCat |
| ContextApp | - | `ContextApp` | RevenueCat |
| Cookie | - | `Cookie` | RevenueCat |
| CountdownWidget | - | `CountdownWidget` | RevenueCat |
| CountDuck | - | `CountDuck` | RevenueCat |
| CPUMonitor | - | `CPUMonitor` | RevenueCat |
| Craft解锁Premium | - | - | Premium 专用脚本 |
| Cubox 解锁高级会员 | - | - | Premium 专用脚本 |
| Currency | - | `Currency` | RevenueCat |
| Dailyart | - | `Dailyart` | RevenueCat |
| DarkLooker | - | `DarkLooker` | RevenueCat |
| Darkroom | - | `Darkroom` | RevenueCat |
| DataCalc | - | `DataCalc` | RevenueCat |
| DayPoem | - | `DayPoem` | RevenueCat |
| Decision | - | `Decision` | RevenueCat |
| Deezer解锁Hi-Fi订阅 | - | - | Premium 专用脚本 |
| design.yugen.Flow | `design.yugen.Flow` | - | RevenueCat |
| DHWaterMarkManager | - | `DHWaterMarkManager` | RevenueCat |
| DJ串烧集 | - | - | Premium 专用脚本 |
| DJ音乐库 | - | - | Premium 专用脚本 |
| Documents文件管理器+解锁订阅 | `license.pdfexpert.com` | - | Premium 专用脚本 |
| Dotly | - | `Dotly` | RevenueCat |
| Drafts解锁Pro | - | - | Premium 专用脚本 |
| DreamFace解锁Pro | - | - | Premium 专用脚本 |
| Drops | - | `Drops` | RevenueCat |
| Drowsy | - | `Drowsy` | RevenueCat |
| dtdvibe | - | `dtdvibe` | RevenueCat |
| Dumb Phone | - | `Dumb%20Phone` | RevenueCat |
| easy_chart | - | `easy_chart` | RevenueCat |
| EasyClicker | - | `EasyClicker` | RevenueCat |
| Echo | - | `Echo` | RevenueCat |
| ElementNote | - | `ElementNote` | RevenueCat |
| ElonAI | - | `ElonAI` | RevenueCat |
| Email Me | - | `Email%20Me` | RevenueCat |
| Emby Premiere解锁 | - | - | Premium 专用脚本 |
| EncryptNote | - | `EncryptNote` | RevenueCat |
| Endel | - | `Endel` | RevenueCat |
| Endel解锁Premium | - | - | Premium 专用脚本 |
| Epik解锁Pro | - | - | Premium 专用脚本 |
| EraseIt | - | `EraseIt` | RevenueCat |
| Facebook | - | `Facebook` | RevenueCat |
| FaceLab解锁Vip | - | - | Premium 专用脚本 |
| FaceSwapper-AI换脸解锁Vip | - | - | Premium 专用脚本 |
| Falendar | - | `Falendar` | RevenueCat |
| fastdiet | - | `fastdiet` | RevenueCat |
| fengling | - | `fengling` | RevenueCat |
| FilmicPro相机解锁高级会员 | - | - | Premium 专用脚本 |
| Filmix解锁Pro | - | - | Premium 专用脚本 |
| Filmr-视频剪辑 解锁PRO | `payments.invideo.io` | - | Premium 专用脚本 |
| Flightradar24解锁Gold | - | - | Premium 专用脚本 |
| FlipaClip解锁Plus | `api.purchasely.io` | - | Premium 专用脚本 |
| Flourish | - | `Flourish` | RevenueCat |
| Flow & VN套装-解锁Premium | - | - | Premium 专用脚本 |
| Focos+Focos live☆解锁会员权限 | - | - | Premium 专用脚本 |
| FocusFour | - | `FocusFour` | RevenueCat |
| FoJiCam | - | `FoJiCam` | RevenueCat |
| Fontsify | - | `Fontsify` | RevenueCat |
| Food-Diary | - | `Food-Diary` | RevenueCat |
| Free | - | `Free` | RevenueCat |
| FretTrainer | - | `FretTrainer` | RevenueCat |
| FRMD | - | `FRMD` | RevenueCat |
| FruitMinder | - | `FruitMinder` | RevenueCat |
| FujiLifeStyle | - | `FujiLifeStyle` | RevenueCat |
| Funimate解锁Premium | `api.funimate.com` | - | Premium 专用脚本 |
| Gear | - | `Gear` | RevenueCat |
| Gentler | - | `Gentler` | RevenueCat |
| GithubPro解锁永久订阅 | `api.github.com` | - | Premium 专用脚本 |
| GoodNotes6☆解锁会员 | - | - | Premium 专用脚本 |
| GradientMusic | - | `GradientMusic` | RevenueCat |
| GrowthPath | - | `GrowthPath` | RevenueCat |
| Habitor | - | `Habitor` | RevenueCat |
| Happy:Days | - | `Happy%3ADays` | RevenueCat |
| Harukong | - | `Harukong` | RevenueCat |
| Heal Clock | - | `Heal%20Clock` | RevenueCat |
| Hi论坛/69 | - | `Hi%E8%AE%BA%E5%9D%9B/69` | RevenueCat |
| HRZN | - | `HRZN` | RevenueCat |
| HTTPBot | - | `HTTPBot` | RevenueCat |
| HurtYou | - | `HurtYou` | RevenueCat |
| iBody | - | `iBody` | RevenueCat |
| IDM | - | `IDM` | RevenueCat |
| IFTTT解锁永久Vip | - | - | Premium 专用脚本 |
| ig-bookmarker | - | `ig-bookmarker` | RevenueCat |
| iLovePDF解锁Vip | - | - | Premium 专用脚本 |
| image_upscaler | - | `image_upscaler` | RevenueCat |
| ImageX | - | `ImageX` | RevenueCat |
| ImagineAI | - | `ImagineAI` | RevenueCat |
| Infltr | - | `Infltr` | RevenueCat |
| intervalFlow | - | `intervalFlow` | RevenueCat |
| io.fadel.TeleprompterX | `io.fadel.TeleprompterX` | - | RevenueCat |
| io.innerpeace.yiye | `io.innerpeace.yiye` | - | RevenueCat |
| ip_tv_react_native | - | `ip_tv_react_native` | RevenueCat |
| IPA-Installer | - | - | Premium 专用脚本 |
| IPCams | - | `IPCams` | RevenueCat |
| iplayTV | - | `iplayTV` | RevenueCat |
| IPTVUltra | - | `IPTVUltra` | RevenueCat |
| iRead | - | `iRead` | RevenueCat |
| Jellycuts | - | `Jellycuts` | RevenueCat |
| Journal_iOS | - | `Journal_iOS` | RevenueCat |
| Joy | - | `Joy` | RevenueCat |
| kiddztube | - | `kiddztube` | RevenueCat |
| knowme-storage | - | `knowme-storage` | RevenueCat |
| Kylin | - | `Kylin` | RevenueCat |
| Langster | - | `Langster` | RevenueCat |
| Language Learning | - | `Language%20Learning` | RevenueCat |
| LaunchTrans | - | `LaunchTrans` | RevenueCat |
| Law | - | `Law` | RevenueCat |
| LazyBoard | - | `LazyBoard` | RevenueCat |
| LazyReply | - | `LazyReply` | RevenueCat |
| Ledger | - | `Ledger` | RevenueCat |
| Leica LUX | - | `Leica%20LUX` | RevenueCat |
| LemonKeepAccounts | - | `LemonKeepAccounts` | RevenueCat |
| Liftbear | - | `Liftbear` | RevenueCat |
| Lightune | - | `Lightune` | RevenueCat |
| Linearity Curve | - | `Linearity%20Curve` | RevenueCat |
| Lito | - | `Lito` | RevenueCat |
| LiveCaption | - | `LiveCaption` | RevenueCat |
| LiveWallpaper | - | `LiveWallpaper` | RevenueCat |
| LockFlow | - | `LockFlow` | RevenueCat |
| Loopsie | - | `Loopsie` | RevenueCat |
| Loora | - | `Loora` | RevenueCat |
| LUTCamera | - | `LUTCamera` | RevenueCat |
| MagicTiles3 | - | `MagicTiles3` | RevenueCat |
| MallocVPN | - | `MallocVPN` | RevenueCat |
| maple_mobile | - | `maple_mobile` | RevenueCat |
| MatrixClock | - | `MatrixClock` | RevenueCat |
| MaxWallpaper | - | `MaxWallpaper` | RevenueCat |
| Meal Planner | - | `Meal%20Planner` | RevenueCat |
| Medication List | - | `Medication%20List` | RevenueCat |
| metaslip | - | `metaslip` | RevenueCat |
| MinimalDiary | - | `MinimalDiary` | RevenueCat |
| MissAV去广告 | - | - | Premium 专用脚本 |
| MIX2解锁会员 | - | - | Premium 专用脚本 |
| mizframa | - | `mizframa` | RevenueCat |
| Mockview | - | `Mockview` | RevenueCat |
| Moises-音乐人应用解锁Premium | - | - | Premium 专用脚本 |
| Mojo | - | `Mojo` | RevenueCat |
| money_manager | - | `money_manager` | RevenueCat |
| MoneyThings | - | `MoneyThings` | RevenueCat |
| moonbox.co.il.grow | `moonbox.co.il.grow` | - | RevenueCat |
| Moonlitt | - | `Moonlitt` | RevenueCat |
| Morpholio Trace CAD草图解锁Pro | - | - | Premium 专用脚本 |
| Morphose | - | `Morphose` | RevenueCat |
| moss-ios | - | `moss-ios` | RevenueCat |
| Movavi视频图片编辑解锁Pro | - | - | Premium 专用脚本 |
| MOZE | - | `MOZE` | RevenueCat |
| MuCase | - | `MuCase` | RevenueCat |
| multitimer_app | - | `multitimer_app` | RevenueCat |
| muoyu | - | `muoyu` | RevenueCat |
| MusicMate | - | `MusicMate` | RevenueCat |
| MusicPutty | - | `MusicPutty` | RevenueCat |
| Musixmatch解锁会员功能 | `apic.musixmatch.com` | - | Premium 专用脚本 |
| My Diary | - | `My%20Diary` | RevenueCat |
| My Time | - | `My%20Time` | RevenueCat |
| MyFitnessPal解锁Premium | - | - | Premium 专用脚本 |
| MyPianist | - | `MyPianist` | RevenueCat |
| MySticker | - | `MySticker` | RevenueCat |
| MyThings | - | `MyThings` | RevenueCat |
| nbcamera | - | `nbcamera` | RevenueCat |
| net.tengl.powertimer | `net.tengl.powertimer` | - | RevenueCat |
| Nicegram会员解锁 | - | - | Premium 专用脚本 |
| No Fusion | - | `No%20Fusion` | RevenueCat |
| Notability解锁2099年 | - | - | Premium 专用脚本 |
| Notebook笔记本 | - | - | Premium 专用脚本 |
| NotePlan | - | `NotePlan` | RevenueCat |
| Noto 笔记 | - | `Noto%20%E7%AC%94%E8%AE%B0` | RevenueCat |
| nPtt | - | `nPtt` | RevenueCat |
| ObjectRemoval | - | `ObjectRemoval` | RevenueCat |
| OffScreen | - | `OffScreen` | RevenueCat |
| One4WallSwiftUI | - | `One4WallSwiftUI` | RevenueCat |
| OneClear | - | `OneClear` | RevenueCat |
| OneFlag | - | `OneFlag` | RevenueCat |
| OneGrow | - | `OneGrow` | RevenueCat |
| OneMockup | - | `OneMockup` | RevenueCat |
| OneScreen | - | `OneScreen` | RevenueCat |
| OneTap | - | `OneTap` | RevenueCat |
| OneTodo | - | `OneTodo` | RevenueCat |
| OneWidget | - | `OneWidget` | RevenueCat |
| opusvpn | - | `opusvpn` | RevenueCat |
| OrbitFast | - | `OrbitFast` | RevenueCat |
| Overdue | - | `Overdue` | RevenueCat |
| Packr | - | `Packr` | RevenueCat |
| Pantry Check | - | `Pantry%20Check` | RevenueCat |
| Paper | - | `Paper` | RevenueCat |
| PDF Viewer | - | `PDF%20Viewer` | RevenueCat |
| PDF_convertor | - | `PDF_convertor` | RevenueCat |
| pdfai_app | - | `pdfai_app` | RevenueCat |
| PeakVisor解锁Premium | - | - | Premium 专用脚本 |
| Percento | - | `Percento` | RevenueCat |
| Perfect365解锁VIP | - | - | Premium 专用脚本 |
| Persona | - | `Persona` | RevenueCat |
| Personal Best | - | `Personal%20Best` | RevenueCat |
| Photo Cleaner | - | `Photo%20Cleaner` | RevenueCat |
| photography | - | `photography` | RevenueCat |
| PhotoMapper | - | `PhotoMapper` | RevenueCat |
| Photomator | - | `Photomator` | RevenueCat |
| Photon | - | `Photon` | RevenueCat |
| Photoooo | - | `Photoooo` | RevenueCat |
| PhotoRoom | - | `PhotoRoom` | RevenueCat |
| Photoshop Express-图片编辑&修图 解锁Premium | `lcs-mobile-cops.adobe.io` | - | Premium 专用脚本 |
| PhotoVault | - | `PhotoVault` | RevenueCat |
| Phtoto Swiper | - | `Phtoto%20Swiper` | RevenueCat |
| PianoTrainer | - | `PianoTrainer` | RevenueCat |
| PicLoom | - | `PicLoom` | RevenueCat |
| Picsart美易 解锁Gold | `api.` | - | Premium 专用脚本 |
| Pigment | - | `Pigment` | RevenueCat |
| PikPak解锁会员 | - | - | Premium 专用脚本 |
| Pillow | - | `Pillow` | RevenueCat |
| PinPaper | - | `PinPaper` | RevenueCat |
| Pins | - | `Pins` | RevenueCat |
| PipDoc | - | `PipDoc` | RevenueCat |
| PixelStudio | - | `PixelStudio` | RevenueCat |
| PixImagine | - | `PixImagine` | RevenueCat |
| PM4 | - | `PM4` | RevenueCat |
| PrivateBrowser | - | `PrivateBrowser` | RevenueCat |
| ProCam | - | `ProCam` | RevenueCat |
| Project Delta | - | `Project%20Delta` | RevenueCat |
| PwDrawingPad | - | `PwDrawingPad` | RevenueCat |
| QingLong | - | `QingLong` | RevenueCat |
| Qobuz解锁Hi-Res订阅 | - | - | Premium 专用脚本 |
| QuietCam | - | `QuietCam` | RevenueCat |
| quitnow | - | `quitnow` | RevenueCat |
| Readle | - | `Readle` | RevenueCat |
| Rec | - | `Rec` | RevenueCat |
| RedditPro解锁会员功能 | - | - | Premium 专用脚本 |
| remoteMouse | - | `remoteMouse` | RevenueCat |
| RetouchPics醒图解锁会员 | - | - | Premium 专用脚本 |
| rewritingText | - | `rewritingText` | RevenueCat |
| Ricoh Recipes | - | `Ricoh%20Recipes` | RevenueCat |
| Rootd | - | `Rootd` | RevenueCat |
| Saifs Ai | - | `Saifs%20Ai` | RevenueCat |
| SalesCat | - | `SalesCat` | RevenueCat |
| ScannerPro | - | `ScannerPro` | RevenueCat |
| Scelta | - | `Scelta` | RevenueCat |
| ScreenRecordCase | - | `ScreenRecordCase` | RevenueCat |
| SCRL | - | `SCRL` | RevenueCat |
| Seamless | - | `Seamless` | RevenueCat |
| server_bee | - | `server_bee` | RevenueCat |
| Sex Actions | - | `Sex%20Actions` | RevenueCat |
| Shapy | - | `Shapy` | RevenueCat |
| Shared Family Shopping List | - | `Shared%20Family%20Shopping%20List` | RevenueCat |
| SharkSMS | - | `SharkSMS` | RevenueCat |
| ShellBean | - | `ShellBean` | RevenueCat |
| ShellBoxKit | - | `ShellBoxKit` | RevenueCat |
| shipian-ios | - | `shipian-ios` | RevenueCat |
| ShouChong | - | `ShouChong` | RevenueCat |
| simple-timer | - | `simple-timer` | RevenueCat |
| simple-weather | - | `simple-weather` | RevenueCat |
| SleepDown | - | `SleepDown` | RevenueCat |
| SleepSounds | - | `SleepSounds` | RevenueCat |
| Slidebox解锁Pro | - | - | Premium 专用脚本 |
| SmartAIChat | - | `SmartAIChat` | RevenueCat |
| smscat | - | `smscat` | RevenueCat |
| SnapWords | - | `SnapWords` | RevenueCat |
| Snipd | - | `Snipd` | RevenueCat |
| Soundcloud解锁Go plus | `api-mobile.soundcloud.com` | - | Premium 专用脚本 |
| Spark | - | `Spark` | RevenueCat |
| Spotify解锁Premium | - | - | Premium 专用脚本 |
| StarDiary | - | `StarDiary` | RevenueCat |
| StarFocus | - | `StarFocus` | RevenueCat |
| Startodo | - | `Startodo` | RevenueCat |
| StayOff | - | `StayOff` | RevenueCat |
| StockPlus | - | `StockPlus` | RevenueCat |
| stopwatch | - | `stopwatch` | RevenueCat |
| Storage Cleaner | - | `Storage%20Cleaner` | RevenueCat |
| streaks | - | `streaks` | RevenueCat |
| Stress | - | `Stress` | RevenueCat |
| Structured | - | `Structured` | RevenueCat |
| StudyAI | - | `StudyAI` | RevenueCat |
| Subtrack | - | `Subtrack` | RevenueCat |
| Sunlitt | - | `Sunlitt` | RevenueCat |
| SwiftyCompiler解锁Premium | - | - | Premium 专用脚本 |
| Symbolab计算器-解锁Premium | - | - | Premium 专用脚本 |
| Taio | - | `Taio` | RevenueCat |
| Tangerine | - | `Tangerine` | RevenueCat |
| tech.miidii.MDClock | `tech.miidii.MDClock` | - | RevenueCat |
| TeleprompterX | `TeleprompterX` | - | RevenueCat |
| Termius解锁Premium | - | - | Premium 专用脚本 |
| tetrify | - | `tetrify` | RevenueCat |
| TextMask | - | `TextMask` | RevenueCat |
| TheGreatMe | - | `TheGreatMe` | RevenueCat |
| Themy | - | `Themy` | RevenueCat |
| Thiro | - | `Thiro` | RevenueCat |
| TIDALHiFiPlusCrack | - | - | Premium 专用脚本 |
| Tide Guide | - | `Tide%20Guide` | RevenueCat |
| tiimo | - | `tiimo` | RevenueCat |
| TimeFinder | - | `TimeFinder` | RevenueCat |
| timetrack.io | - | `timetrack.io` | RevenueCat |
| totowallet | - | `totowallet` | RevenueCat |
| TouchRetouchBasic | - | `TouchRetouchBasic` | RevenueCat |
| TQBrowser | - | `TQBrowser` | RevenueCat |
| Tracepad-iOS | - | `Tracepad-iOS` | RevenueCat |
| Transfer | - | `Transfer` | RevenueCat |
| Translate - Talk Translator | - | `Translate%20-%20Talk%20Translator` | RevenueCat |
| transmission_ui | - | `transmission_ui` | RevenueCat |
| TripMemo | - | `TripMemo` | RevenueCat |
| TruthOrDare | - | `TruthOrDare` | RevenueCat |
| TuneTally | - | `TuneTally` | RevenueCat |
| Unfold | - | `Unfold` | RevenueCat |
| UTC | - | `UTC` | RevenueCat |
| Utiful | - | `Utiful` | RevenueCat |
| VibeCamera | - | `VibeCamera` | RevenueCat |
| vibes | - | `vibes` | RevenueCat |
| VidCap | - | `VidCap` | RevenueCat |
| Video Teleprompter | - | `Video%20Teleprompter` | RevenueCat |
| Vinyls | - | `Vinyls` | RevenueCat |
| Vision | - | `Vision` | RevenueCat |
| VivaCut解锁永久订阅 | - | - | Premium 专用脚本 |
| VK音乐 | `api.moosic.io` | - | Premium 专用脚本 |
| VN视频剪辑解锁订阅 | - | - | Premium 专用脚本 |
| VoiceAI | - | `VoiceAI` | RevenueCat |
| VSCO | - | `VSCO` | RevenueCat |
| WallCraftFProCrack | - | - | Premium 专用脚本 |
| WallShift | - | `WallShift` | RevenueCat |
| Watchly | - | `Watchly` | RevenueCat |
| WeNote | - | `WeNote` | RevenueCat |
| Whisper | - | `Whisper` | RevenueCat |
| WhiteCloud | - | `WhiteCloud` | RevenueCat |
| widget_art | - | `widget_art` | RevenueCat |
| WidgetSmith | - | `WidgetSmith` | RevenueCat |
| Wishy | - | `Wishy` | RevenueCat |
| wordswag | - | `wordswag` | RevenueCat |
| WorkingCopy 解锁Pro | - | - | Premium 专用脚本 |
| Worrydolls | - | `Worrydolls` | RevenueCat |
| Wozi | - | `Wozi` | RevenueCat |
| WPSDocerVIPowerCrack | - | - | Premium 专用脚本 |
| WPSDocerVIPuserCrack | - | - | Premium 专用脚本 |
| WPSuperVIPowerCrack | - | - | Premium 专用脚本 |
| WPSuperVIPuserCrack | - | - | Premium 专用脚本 |
| XMind思维导图+解锁VIP | - | - | Premium 专用脚本 |
| Y2002电音-DJ电音音乐播放器解锁永久Vip-Y1 | - | - | Premium 专用脚本 |
| Y2002电音-DJ电音音乐播放器解锁永久Vip-Y2 | - | - | Premium 专用脚本 |
| YandexMusic | `api.music.yandex.net` | - | Premium 专用脚本 |
| Yosum | - | `Yosum` | RevenueCat |
| Youdao网易有道词典解锁会员 | - | - | Premium 专用脚本 |
| YubePiP | - | `YubePiP` | RevenueCat |
| Yummi | - | `Yummi` | RevenueCat |
| Zen Flip Clock | - | `Zen%20Flip%20Clock` | RevenueCat |
| Zettelbox | - | `Zettelbox` | RevenueCat |
| 书旗小说-会员中心 | - | - | Premium 专用脚本 |
| 书旗小说-用户中心 | - | - | Premium 专用脚本 |
| 事线 | - | `%E4%BA%8B%E7%BA%BF` | RevenueCat |
| 云听-解锁会员 | - | - | Premium 专用脚本 |
| 人生清单 | - | `%E4%BA%BA%E7%94%9F%E6%B8%85%E5%8D%95` | RevenueCat |
| 信息计算 | - | `%E4%BF%A1%E6%81%AF%E8%AE%A1%E7%AE%97` | RevenueCat |
| 兔U | - | - | Premium 专用脚本 |
| 全本小说-解锁VIP | - | - | Premium 专用脚本 |
| 凹凸啦查妆 | - | `%E5%87%B9%E5%87%B8%E5%95%A6%E6%9F%A5%E5%A6%86` | RevenueCat |
| 剪映解锁会员 | - | - | Premium 专用脚本 |
| 咪咕音乐解锁Vip | - | - | Premium 专用脚本 |
| 哔哩哔哩 Bilibili | `app.bilibili.com` | - | bilibili.stoverride |
| 喵组件 | - | `%E5%96%B5%E7%BB%84%E4%BB%B6` | RevenueCat |
| 地震预警-解锁会员 | - | - | Premium 专用脚本 |
| 墨迹天气解锁SVip | - | - | Premium 专用脚本 |
| 夸克浏览器 Quark | `open-cms-api.quark.cn` | - | quark.stoverride |
| 宜搜小说-超级会员 | - | - | Premium 专用脚本 |
| 小旋风收音机解锁VIP | - | - | Premium 专用脚本 |
| 山丘阅读解锁Vip | - | - | Premium 专用脚本 |
| 幕布-解锁终身会员 | `api2.mubu.com` | - | Premium 专用脚本 |
| 彩云天气SVIP | - | - | Premium 专用脚本 |
| 得间小说-解锁会员 | - | - | Premium 专用脚本 |
| 懒人听书vip | - | - | Premium 专用脚本 |
| 手持弹幕 | - | `%E6%89%8B%E6%8C%81%E5%BC%B9%E5%B9%95` | RevenueCat |
| 扫描全能王-解锁黄金会员 | - | - | Premium 专用脚本 |
| 插画世界解锁Vip | - | - | Premium 专用脚本 |
| 时间记录 | - | `%E6%97%B6%E9%97%B4%E8%AE%B0%E5%BD%95` | RevenueCat |
| 波点音乐 | - | - | Premium 专用脚本 |
| 泼辣修图解锁Pro | - | - | Premium 专用脚本 |
| 海角社区 解锁付费会员视频 | - | - | Premium 专用脚本 |
| 滚动截屏-解锁 Premium | - | - | Premium 专用脚本 |
| 熊猫脑洞小说VIP | - | - | Premium 专用脚本 |
| 爱听收音机 | - | - | Premium 专用脚本 |
| 猫头鹰文件 | - | - | Premium 专用脚本 |
| 白描解锁黄金会员 | - | - | Premium 专用脚本 |
| 百度网盘解锁 SVIP | - | - | Premium 专用脚本 |
| 目标地图 | - | `%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE` | RevenueCat |
| 石墨文档 解锁超级会员 | `shimo.im` | - | Premium 专用脚本 |
| 秩序时钟 | - | `%E7%A7%A9%E5%BA%8F%E6%97%B6%E9%92%9F` | RevenueCat |
| 秩序目标 | - | `%E7%A7%A9%E5%BA%8F%E7%9B%AE%E6%A0%87` | RevenueCat |
| 网易蜗牛读书解锁Vip | - | - | Premium 专用脚本 |
| 美图秀秀 解锁SVIP | - | - | Premium 专用脚本 |
| 美妆日历 | - | `%E7%BE%8E%E5%A6%86%E6%97%A5%E5%8E%86` | RevenueCat |
| 美颜相机 解锁VIP | - | - | Premium 专用脚本 |
| 翻页时钟 | - | `%E7%BF%BB%E9%A1%B5%E6%97%B6%E9%92%9F` | RevenueCat |
| 芒果TV | - | - | Premium 专用脚本 |
| 萌客AI绘画 | - | `%E8%90%8C%E5%AE%A2AI%E7%BB%98%E7%94%BB` | RevenueCat |
| 蛋啵解锁vip | `api-sub` | - | Premium 专用脚本 |
| 蜗牛睡眠解锁Vip | - | - | Premium 专用脚本 |
| 解锁 Pixiv Premium | - | - | Premium 专用脚本 |
| 解锁特权 | - | - | Premium 专用脚本 |
| 解除微信链接限制 | - | - | Premium 专用脚本 |
| 语音计算器 | - | `%E8%AF%AD%E9%9F%B3%E8%AE%A1%E7%AE%97%E5%99%A8` | RevenueCat |
| 谜底时钟 | - | `%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F` | RevenueCat |
| 谜底黑胶 | - | `%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6` | RevenueCat |
| 资源搬运大师 | - | `%E8%B5%84%E6%BA%90%E6%90%AC%E8%BF%90%E5%A4%A7%E5%B8%88` | RevenueCat |
| 车票票 | - | `%E8%BD%A6%E7%A5%A8%E7%A5%A8` | RevenueCat |
| 轻图解锁Pro | - | - | Premium 专用脚本 |
| 迅雷Unlock | - | - | Premium 专用脚本 |
| 追读小说-解锁会员 | - | - | Premium 专用脚本 |
| 酷我音乐解锁VIP | - | - | Premium 专用脚本 |
| 阿基米德-电台FM解锁Vip | - | - | Premium 专用脚本 |
| 阿里云盘解锁SVIP | - | - | Premium 专用脚本 |
| 随手写FeeNote-解锁Premium | - | - | Premium 专用脚本 |

> 共 **487** 个条目。RC = RevenueCat 字典匹配，Premium = 独立解锁脚本。
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
