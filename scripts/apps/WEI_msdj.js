/*
 *
 *
脚本功能：漫森短剧
软件版本：1.0.10
下载地址：
脚本作者：
更新时间：2024年
电报频道：https://t.me/GieGie777
问题反馈：
使用声明：此脚本仅供学习与交流，请在下载使用24小时内删除！请勿在中国大陆转载与贩卖！
*******************************
[rewrite_local]
# >漫森短剧
^https?:\/\/man.api.mansenwenhua77.com\/app\/(my-home\/user\/info|login\/apple) url script-response-body https://raw.githubusercontent.com/WeiGiegie/666/main/msdj.js


[mitm]
hostname = man.api.mansenwenhua77.com

*
*
*/

"use strict";

if($request["url"]["includes"]("/app/my-home/user/info")){let _0x4a5a64=JSON["parse"]($response["body"]);Object["assign"](_0x4a5a64["data"],{'gold_coin':0xf41c8,'vip_date':"2999-09-09会员到期",'head_url':"https://zdimg.lifeweek.com.cn/app/20230410/16810960185662892.jpg",'audit_nick_name':"https://t.me/GieGie777",'nick_name':"https://t.me/GieGie777"});$done({'body':JSON["stringify"](_0x4a5a64)});}else if($request["url"]["includes"]("/app/login/apple")){let _0x220c85=JSON["parse"]($response["body"]);Object["assign"](_0x220c85,{'data':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoiNTMzODg4MDMyOTg2NjQ4NzI3IiwidXNlcl9pZCI6Mjk5MDczLCJ1c2VyX25hbWUiOiIiLCJleHBpcmVfdGltZSI6MTcyOTA2NTY2NSwid3hfc2Vzc2lvbl9rZXkiOiIiLCJleHAiOjE3MjkwNjU2NjUsImlhdCI6MTcyNzc1MTY2NSwiaXNzIjoicGxheS1zZXJ2ZXIiLCJuYmYiOjE3Mjc3NTE2NjV9.0YtFgWmoSOx_MQ_5yUnv3Fegkvo0YD8h5Jpk-Xvt6yw"});$done({'body':JSON["stringify"](_0x220c85)});}
