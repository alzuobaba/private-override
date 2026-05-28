var url = $request.url
var body = $response.body

if (body) {
  var obj
  try { obj = JSON.parse(body) } catch (e) {}

  if (obj) {
    console.log($script.name + ' ' + url)

    if (/\/x\/v2\/account\/myinfo\?/.test(url)) {
      try {
        if (!obj.data.vip.status) {
          obj.data.vip.type = 2
          obj.data.vip.status = 1
          obj.data.vip.vip_pay_type = 1
          obj.data.vip.due_date = 4669824160000
          console.log($script.name + ' VIP解锁成功')
        }
      } catch (e) {
        console.log($script.name + ' myinfo error: ' + e)
      }
    } else if (/\/x\/v2\/feed\/index\?/.test(url)) {
      try {
        var items = []
        for (var i = 0; i < obj.data.items.length; i++) {
          var item = obj.data.items[i]
          if (item.hasOwnProperty('banner_item')) continue
          if (item.hasOwnProperty('ad_info')) continue
          if (item.card_goto && item.card_goto.indexOf('ad') !== -1) continue
          var ct = item.card_type
          if (ct !== 'small_cover_v2' && ct !== 'large_cover_v1' && ct !== 'large_cover_single_v9') continue
          items.push(item)
        }
        obj.data.items = items
      } catch (e) {
        console.log($script.name + ' feed error: ' + e)
      }
    } else if (/\/x\/v2\/feed\/index\/story\?/.test(url)) {
      try {
        var v2 = []
        for (var j = 0; j < obj.data.items.length; j++) {
          var si = obj.data.items[j]
          if (si.hasOwnProperty('ad_info')) continue
          if (si.card_goto && si.card_goto.indexOf('ad') !== -1) continue
          v2.push(si)
        }
        obj.data.items = v2
      } catch (e) {
        console.log($script.name + ' story error: ' + e)
      }
    } else if (/xlive\/app-room\/v1\/index\/getInfoByRoom/.test(url)) {
      try {
        obj.data.activity_banner_info = null
        if (obj.data && obj.data.shopping_info) {
          obj.data.shopping_info = { is_show: 0 }
        }
        if (obj.data && obj.data.new_tab_info && obj.data.new_tab_info.outer_list && obj.data.new_tab_info.outer_list.length) {
          var outer = obj.data.new_tab_info.outer_list
          obj.data.new_tab_info.outer_list = outer.filter(function (o) { return o.biz_id !== 33 })
        }
      } catch (e) {
        console.log($script.name + ' live error: ' + e)
      }
    } else if (/xlive\/app-interface\/v2\/index\/feed/.test(url)) {
      try {
        if (obj.data && obj.data.card_list) {
          obj.data.card_list = obj.data.card_list.filter(function (c) { return c.card_type !== 'banner_v1' })
        }
      } catch (e) {
        console.log($script.name + ' xlive error: ' + e)
      }
    } else if (/ecommerce-user\/get_shopping_info\?/.test(url)) {
      try {
        obj.data = {
          shopping_card_detail: {},
          bubbles_detail: {},
          recommend_card_detail: {},
          selected_goods: {},
          h5jump_popup: []
        }
      } catch (e) {
        console.log($script.name + ' shopping error: ' + e)
      }
    } else if (/\/x\/v2\/splash\/list/.test(url)) {
      try {
        if (obj.data && obj.data.list) {
          for (var k = 0; k < obj.data.list.length; k++) {
            var splash = obj.data.list[k]
            splash.duration = 0
            splash.begin_time = 2240150400
            splash.end_time = 2240150400
          }
        }
      } catch (e) {
        console.log($script.name + ' splash error: ' + e)
      }
    } else if (/pgc\/season\/app\/related\/recommend\?/.test(url)) {
      try {
        if (obj.result && obj.result.cards && obj.result.cards.length) {
          obj.result.cards = obj.result.cards.filter(function (c) { return c.type !== 2 })
        }
      } catch (e) {
        console.log($script.name + ' recommend error: ' + e)
      }
    } else if (/pgc\/page\/(bangumi|cinema\/tab\?)/.test(url)) {
      try {
        obj.result.modules.forEach(function (mod) {
          if (mod.style && mod.style.startsWith('banner')) {
            mod.items = mod.items.filter(function (m) { return m.link.indexOf('play') !== -1 })
          }
          if (mod.style && mod.style.startsWith('function')) {
            mod.items = mod.items.filter(function (m) { return m.blink.indexOf('bilibili.com') === -1 })
          }
          if ([1283, 241, 1441, 1284].indexOf(mod.module_id) !== -1) {
            mod.items = []
          }
          if (mod.style && mod.style.startsWith('tip')) {
            mod.items = []
          }
        })
      } catch (e) {
        console.log($script.name + ' bangumi error: ' + e)
      }
    } else if (/\/x\/resource\/show\/skin\?/.test(url)) {
      try {
        delete obj.data.common_equip
      } catch (e) {
        console.log($script.name + ' skin error: ' + e)
      }
    } else if (/\/x\/v\d\/account\/teenagers\/status\?/.test(url)) {
      try {
        obj.data.teenagers_status = 0
      } catch (e) {
        console.log($script.name + ' teenagers error: ' + e)
      }
    } else if (/\/x\/resource\/show\/tab/.test(url)) {
      try {
        var keepIds = { 39: 1, 40: 1, 41: 1, 151: 1, 774: 1, 545: 1, 177: 1, 178: 1, 179: 1, 181: 1, 102: 1, 104: 1, 106: 1, 486: 1, 488: 1, 489: 1 }
        if (obj.data && obj.data.tab) {
          var tabs = [
            { id: 39, name: '直播', uri: 'bilibili://live/home', tab_id: '直播tab', pos: 1 },
            { id: 40, name: '推荐', uri: 'bilibili://pegasus/promo', tab_id: '推荐tab', pos: 2, default_selected: 1 }
          ]
          if (JSON.stringify(obj.data.tab).indexOf('pgc/home') === -1) {
            tabs.push({ id: 774, name: '番剧', uri: 'bilibili://following/home_activity_tab/6544', tab_id: 'bangumi', pos: 3 })
          } else {
            tabs.push({ id: 545, name: '番剧', uri: 'bilibili://pgc/home', tab_id: 'bangumi', pos: 3 })
          }
          tabs.push(
            { id: 41, name: '热门', uri: 'bilibili://pegasus/hottopic', tab_id: 'hottopic', pos: 4 },
            { id: 151, name: '影视', uri: 'bilibili://pgc/cinema-tab', tab_id: 'film', pos: 5 }
          )
          obj.data.tab = tabs
        }
        if (obj.data && obj.data.top) {
          obj.data.top = [{ id: 481, icon: 'http://i0.hdslb.com/bfs/archive/d43047538e72c9ed8fd8e4e34415fbe3a4f632cb.png', name: '消息', uri: 'bilibili://link/im_home', tab_id: '消息Top', pos: 1 }]
        }
        if (obj.data && obj.data.bottom) {
          obj.data.bottom = obj.data.bottom.filter(function (b) { return keepIds.hasOwnProperty(b.id) })
        }
      } catch (e) {
        console.log($script.name + ' tab error: ' + e)
      }
    } else if (/\/x\/v2\/account\/mine/.test(url)) {
      try {
        var excludeSet = {}
        ;[396, 397, 398, 399, 407, 410, 402, 404, 425, 426, 427, 428, 430, 432, 433, 434, 494, 495, 496, 497, 500, 501].forEach(function (id) { excludeSet[id] = true })
        obj.data.sections_v2.forEach(function (sec, i) {
          sec.items = sec.items.filter(function (it) { return excludeSet.hasOwnProperty(it.id) })
          obj.data.sections_v2[i].button = {}
          delete obj.data.sections_v2[i].be_up_title
          delete obj.data.sections_v2[i].tip_icon
          delete obj.data.sections_v2[i].tip_title
          if (sec.title === '创作中心' || sec.title === '創作中心') {
            delete obj.data.sections_v2[i].title
            delete obj.data.sections_v2[i].type
          }
        })
        delete obj.data.vip_section_v2
        delete obj.data.vip_section
        if (obj.data.hasOwnProperty('live_tip')) obj.data.live_tip = {}
        if (obj.data.hasOwnProperty('answer')) obj.data.answer = {}
        if (!obj.data.vip.status) {
          obj.data.vip_type = 2
          obj.data.vip.type = 2
          obj.data.vip.status = 1
          obj.data.vip.vip_pay_type = 1
          obj.data.vip.due_date = 4669824160000
        }
      } catch (e) {
        console.log($script.name + ' mine error: ' + e)
      }
    } else if (/\/x\/resource\/top\/activity/.test(url)) {
      try {
        if (obj.data) {
          obj.data.hash = 'ddgksf2013'
          obj.data.online.icon = ''
        }
      } catch (e) {
        console.log($script.name + ' activity error: ' + e)
      }
    } else if (/\/x\/v2\/search\/square/.test(url)) {
      try {
        obj.data = { type: 'history', title: '搜索历史', search_hotword_revision: 2 }
      } catch (e) {
        console.log($script.name + ' search error: ' + e)
      }
    }
  }
}

$done(obj ? { body: JSON.stringify(obj) } : {})
