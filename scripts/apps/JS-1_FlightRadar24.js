/*************************************

项目名称：FlightRadar24
脚本作者：SubTek

*************************************/
"use strict"

var obj = {
  "status": "ok",
  "userData": {
    "idUser": 12345678,
    "dateExpires": 4102444800,
    "subscriptionKey": "Gold",
    "isActive": true,
    "hasConsented": true,
    "localeCode": "en",
    "name": "By Anni",
    "typeSource": "Gold",
    "subscriptions": {
      "0": {
        "dateExpires": 4102444800,
        "sortOrder": 2,
        "isOnTrial": true,
        "sku": "flightradar24_gold",
        "originalBillingPeriod": 365,
        "typePlatform": "iOS",
        "typeStatus": "active",
        "name": "Flightradar24 Gold",
        "typeSubscription": "Gold"
      }
    },
    "isLoggedin": true,
    "accountType": "Gold",
    "features": {
      "adverts": "disabled",
      "map.view.3d": "enabled",
      "map.view.radar": "enabled",
      "map.view.multi": "enabled",
      "map.view.fullscreen": "enabled",
      "map.search": "enabled",
      "map.data.ads-b": "enabled",
      "map.data.mlat": "enabled",
      "map.data.satellite": "enabled",
      "map.data.faa": "enabled",
      "map.data.flarm": "enabled",
      "map.data.delaystats": "enabled",
      "map.layer.weather": "enabled",
      "map.layer.waypoints": "enabled",
      "map.layer.weather.volcano": "enabled",
      "map.layer.trail.tooltip": "enabled",
      "map.filters.receivers": "enabled",
      "map.filters.unblocking": "enabled",
      "map.filters.categories": "enabled",
      "map.filters.max": 25,
      "map.filters.fleets": "enabled",
      "map.info.flight": "enhanced",
      "map.info.aircraft": "full",
      "map.timeout.mins": -1,
      "history.flight.days": 365,
      "history.playback.days": 365,
      "support.level": "Gold",
      "usage.rights": "Gold"
    }
  },
  "message": "Success",
  "success": true
};

$done({ body: JSON.stringify(obj) });
