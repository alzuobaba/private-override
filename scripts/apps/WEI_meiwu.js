/*
 *
 *
脚本功能：魅.舞直播++ 解锁付费房
软件版本：
下载地址：
脚本作者：**
更新时间：2024-
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：⚠️此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# >魅.舞直播++
^https?:\/\/.+(member\/detail|user_video_async|lottery-ns) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/meiwu.js

[mitm] 
hostname = qq.baiduan*.com,*wensan*com,ws.wensangq.com,45.117.11.*
*
*
*/

"use strict";

var _0x138855=$response["body"];var _0x17aa32=$request["url"];var _0x11fd13=JSON["parse"](_0x138855);const _0xa1f48f="/platform-ns/v1.0/member/detail";const _0x2ea268="/live-ns/index/user_video_async";const _0x5bb9cb="/lottery-ns/";if(_0x17aa32["indexOf"](_0xa1f48f)!=-0x1){var _0xb101d4="1|2|4|3|0"["split"]('|'),_0xe75ba3=0x0;while(!![]){switch(_0xb101d4[_0xe75ba3++]){case'0':_0x138855=JSON["stringify"](_0x11fd13);continue;case'1':_0x11fd13["data"]["nick_name"]="https://t.me/GieGie777";continue;case'2':_0x11fd13["data"]["head_img"]="https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg";continue;case'3':_0x11fd13["data"]["total_account"]=0xf41c8;continue;case'4':_0x11fd13["data"]["vip"]=0x32;continue;}break;}}if(_0x17aa32["indexOf"](_0x2ea268)!=-0x1){for(var _0x4176a3=0x0;_0x4176a3<_0x11fd13["data"]["viewer"]["list"]["length"];_0x4176a3++){_0x11fd13["data"]["viewer"]["list"][_0x4176a3]["officer"]=0x1;_0x11fd13["data"]["viewer"]["list"][_0x4176a3]["guardType"]=0x1;_0x11fd13["data"]["viewer"]["list"][_0x4176a3]["user_level"]=0x32;}_0x11fd13["data"]["is_live_pay"]=0x0;delete _0x11fd13["data"]["h5Plugins"];_0x138855=JSON["stringify"](_0x11fd13);}if(_0x17aa32["indexOf"](_0x5bb9cb)!=-0x1){delete _0x11fd13["data"];_0x138855=JSON["stringify"](_0x11fd13);}$done({'body':_0x138855});
