/*
 *
 *
脚本功能：网易云音乐 
软件版本：9.3.60
下载地址：
脚本作者：
更新时间：2025
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# > 网易云音乐
# 播放器会员皮肤
^https:\/\/interface3?\.music\.163\.com\/eapi\/playermode\/ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 搜索结果会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/search\/complex\/(page|rec\/song\/get) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 播放器会员歌曲
^https:\/\/interface3?\.music\.163\.com\/eapi\/v3\/song\/detail url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/song\/(chorus|enhance\/|play\/|type\/detail\/get) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
^https:\/\/interface3?\.music\.163\.com\/eapi\/(v1\/artist\/top\/song|v3\/discovery\/recommend\/songs) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 侧边栏会员等级
^https:\/\/interface3?\.music\.163\.com\/eapi\/vipnewcenter\/app\/resource\/newaccountpage url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 首页歌单会员歌曲
^https?:\/\/interface3?\.music\.163\.com\/eapi\/(homepage\/|v6\/)?playlist\/ url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 会员认证
^https?:\/\/interface3?\.music\.163\.com\/eapi\/vipauth\/app\/auth\/(soundquality\/)?query url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/wangyiyun.js
# 去除部分广告
^https?://interface.*\.music\.163\.com/eapi/ad/get url reject
^https?://interface.*\.music\.163\.com/eapi/ad/config/get url reject
^https?://interface.*\.music\.163\.com/eapi/ad/iyunIds url reject
^https?://interface.*\.music\.163\.com/eapi/ad/prefetch/select url reject
^https?://interface.*\.music\.163\.com/eapi/ad/loading/current url reject
[mitm] 
hostname = *music.163.com,interface*.music.163.com,

*
*
*/

"use strict";

var _0x6cbacf=$request["headers"];_0x6cbacf["cookie"]="MUSIC_U=00C9610D4E969926FA2513F7B324A9031F128BDA1073A2AEE61F37F42A038B511A2537B2D15757F9D3D53098AD04266F63B29BE102A4A1268DCA3EBC667570EA093E09CCA5C132472FABF1BC5E1B3C15828448B580EBC82E2C503C96590C5840C2212777D84204C7C2569EFFE16D738BC6C413A2F383F3098E31A4A0E3BC19A9FBA217D7BBB0CB3A09050DE13334AB04B5DCB651F19E9CAF67C6F9A25B5DC0258A403B11DED5E4C469ACC0968847CC20F9BE7902837FF2884D8BD741F2F03E28E2B8B37C72E02A5355F5017FC95937EA3B443292A631037C2C20B9C2C4D9BDD1F1E39B603B497D20917F854A95634BEC73BA6DD09AC255CA31CFE41820F6B1E22E9F2228EF7003A7DF0FDC626A4C12E14F4D594BF4CBCD2FF84591E5B87FC50DBDF4B125A1E8F61651ACEBC74C649CF55A8C31B9E61A7BDEDB4AFFBFDE149C9A52CF00A0A9DF5DFB30811942563FDD2147114831657C4D698EED3E8B504F7A4B8D;appver=9.3.25; deviceId=5664b3c08da1d786701cc1a79279c035; os=iPhone OS; osver=16.2; machineid=iPhone13.4; ";_0x6cbacf["user-agent"]="NeteaseMusic 9.3.25/6062 (iPhone; iOS 16.6; zh-Hans_TW)";_0x6cbacf["mconfig-Info"]="{\"zr4bw6pKFDIZScpo\":{\"version\":3061824,\"appver\":\"9.3.25\"},\"tPJJnts2H31BZXmp\":{\"version\":3973120,\"appver\":\"2.0.30\"},\"c0Ve6C0uNl2Am0Rl\":{\"version\":600064,\"appver\":\"1.7.50\"},\"IuRPVVmc3WWul9fT\":{\"version\":92171072,\"appver\":\"9.3.25\"}}";$done({'headers':_0x6cbacf});
