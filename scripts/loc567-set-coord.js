// loc567-set-coord.js
// 从前端接收坐标并存储到 Stash 持久存储
// 前端通过 fetch("http://loc567-set.local/set?lat=39.9&lng=116.4") 调用

const LAT = $request.query?.lat || null
const LNG = $request.query?.lng || null

if (LAT !== null && LNG !== null) {
  const lat = parseFloat(LAT)
  const lng = parseFloat(LNG)
  
  if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    $persistentStore.write(JSON.stringify({ latitude: lat, longitude: lng }), "loc567_target_coord")
    console.log(`loc567: 坐标已设置 → ${lat}, ${lng}`)
    $done({
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      response: {
        body: `OK: ${lat}, ${lng}`
      }
    })
  } else {
    $done({
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      response: {
        body: `无效坐标: lat=${LAT}, lng=${LNG}`
      }
    })
  }
} else {
  $done({
    status: 400,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    response: {
      body: "缺少参数: ?lat=&lng="
    }
  })
}
