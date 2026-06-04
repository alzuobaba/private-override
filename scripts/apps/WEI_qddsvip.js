/*
 *
 *
脚本功能：起点读书 解锁会员免费听书板块
软件版本：5.9.364
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >起点读书 解锁会员免费听书板块
^https?:\/\/.+.qidian.com\/argus\/api\/v[0-9]\/(adv\/getadvlistbatch|user\/getaccountpage|subscription\/getvipprice|client\/getsplashscreen) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/qddsvip.js
^https?:\/\/.+.qidian.com\/argus\/api\/v[0-9]\/(audio\/getTtsChapterAudio|bookcontent\/getvipcontent|audio\/getaudiochapter\?) url script-request-header https://raw.githubusercontent.com/WeiGiegie/666/main/qddsvip.js

[mitm] 
hostname = *.qidian.com,*.if.qidian.com

*
*
*/

"use strict";

if($request["url"]["indexOf"]("/argus/api/v1/audio/getaudiochapter")!=-0x1){var _0x1431ba=$request["headers"];_0x1431ba["Cookie"]="cmfuToken=N((H2uU5W_MCWvQbfwlWmhsiWXeTcvsrnirJMj7g6vmUltez47PMRf3mSWnziqpnbH50kuv1JXgzD6P2Kv3aU_bhKZtfA9D-MR9olm8Fp8-PgOvrZxrDGvlfsJfNiDP5sOqKBzqH-TnrjDZQVcgKijIoUNb8RbUETrSDQkwmSeBXyEn5P-K70aMTi5MZ3REEjEoQ4WWtYntRYVrlhhow3DiiBMGK6mqr9uM4ZJqNVowT7k5MF9vdmL_PzfETBoIfUqc08GmUKf6FgbW5HXfPgE7XH82hmzl4dv10;ywkey=ywZQdHbJh53y";$done({'headers':_0x1431ba});}setInterval(function(){var _0x190f1a={'wQUfw':;
