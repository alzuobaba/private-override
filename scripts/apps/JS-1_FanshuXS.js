/*************************************

项目名称：番薯小说
脚本作者：alzuobaba

*************************************/
"use strict"

var body = JSON.parse($response.body);

if (body.data) {
  body.data.vip = true;
  body.data.vip_end_time = 4092610661000;
  body.data.vip_start_time = 1748707200000;
  body.data.gold = 999999;
  body.data.normal_gold = 999999;
  body.data.give_gold = 999999;
  body.data.recharge_money = 999999.0;
  body.data.minMoneyForVip = 0.0;
}

$done({ body: JSON.stringify(body) });
