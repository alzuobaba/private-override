// loc567-spoof.js
// 拦截 gs-loc.apple.com 响应，替换坐标为自定义值
// 坐标由 loc567-set-coord.js 通过 $persistentStore 传入

// ─── Protobuf 工具 ────────────────────────────────────────────────────────

class ProtobufWalker {
  constructor(data) {
    this.view = new DataView(data)
    this.offset = 0
    this.modified = false
  }

  bytesLeft() { return this.view.byteLength - this.offset }

  readVarint() {
    let val = 0, shift = 0
    while (this.offset < this.view.byteLength) {
      const byte = this.view.getUint8(this.offset++)
      val |= (byte & 0x7f) << shift
      if (!(byte & 0x80)) return val
      shift += 7
    }
    throw new Error('varint 截断')
  }

  readDouble() {
    const val = this.view.getFloat64(this.offset, true)
    this.offset += 8
    return val
  }

  writeDouble(arr, val) {
    const buf = new ArrayBuffer(8)
    new DataView(buf).setFloat64(0, val, true)
    for (let i = 0; i < 8; i++) arr.push(buf[i])
  }

  // 遍历并替换 lat/lng
  walkAndReplace(targetLat, targetLng) {
    const out = []
    this._walk(out, targetLat, targetLng)
    return { data: new Uint8Array(out), modified: this.modified }
  }

  _walk(out, targetLat, targetLng) {
    while (this.bytesLeft() > 0) {
      const keyStart = this.offset
      const key = this.readVarint()
      const fieldNum = key >> 3
      const wireType = key & 0x07

      this._writeVarint(out, key)

      switch (wireType) {
        case 0: { // varint
          const val = this.readVarint()
          this._writeVarint(out, val)
          break
        }
        case 1: { // 64-bit (double/fixed64)
          const doubleVal = this.readDouble()
          // field 1 = 可能是纬度, field 2 = 可能是经度
          if (fieldNum === 1 && doubleVal >= -90 && doubleVal <= 90 && targetLat !== null) {
            this._writeDouble(out, targetLat)
            this.modified = true
            console.log(`loc567: 纬度已替换 ${doubleVal} → ${targetLat}`)
          } else if (fieldNum === 2 && doubleVal >= -180 && doubleVal <= 180 && targetLng !== null) {
            this._writeDouble(out, targetLng)
            this.modified = true
            console.log(`loc567: 经度已替换 ${doubleVal} → ${targetLng}`)
          } else {
            this._writeDouble(out, doubleVal)
          }
          break
        }
        case 2: { // length-delimited (string / embedded message)
          const len = this.readVarint()
          this._writeVarint(out, len)
          const subStart = this.offset
          const subEnd = this.offset + len

          // 尝试递归解析为 embedded message
          const savedOffset = this.offset
          try {
            const subWalker = new ProtobufWalker(
              new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, len)
            )
            const subResult = subWalker.walkAndReplace(targetLat, targetLng)
            if (subResult.modified) {
              this.modified = true
              // 重写长度（内容长度可能变了——但这里长度不变因为 double 还是 8 字节）
              // 覆盖已写入的长度
              out.length -= this._varintLen(len)
              this._writeVarint(out, len)
              for (const b of subResult.data) out.push(b)
              this.offset = subEnd
            } else {
              // 没修改，原样复制
              for (let i = 0; i < len; i++) {
                out.push(this.view.getUint8(this.offset++))
              }
            }
          } catch {
            // 不是有效的 protobuf，原样复制
            this.offset = subStart
            for (let i = 0; i < len; i++) {
              out.push(this.view.getUint8(this.offset++))
            }
          }
          break
        }
        case 5: { // 32-bit (float/fixed32)
          for (let i = 0; i < 4; i++) out.push(this.view.getUint8(this.offset++))
          break
        }
        default:
          // 未知 wire type，跳过
          break
      }
    }
  }

  _writeVarint(arr, val) {
    while (val >= 0x80) {
      arr.push((val & 0x7f) | 0x80)
      val >>>= 7
    }
    arr.push(val & 0x7f)
  }

  _varintLen(val) {
    let len = 0
    do { len++; val >>>= 7 } while (val > 0)
    return len
  }

  _writeDouble(arr, val) {
    const buf = new ArrayBuffer(8)
    new DataView(buf).setFloat64(0, val, true)
    for (let i = 0; i < 8; i++) arr.push(buf[i])
  }
}

// ─── 主逻辑 ──────────────────────────────────────────────────────────────

function main() {
  // 读取目标坐标
  const stored = $persistentStore.read("loc567_target_coord")
  if (!stored) {
    console.log("loc567: 未设置目标坐标，跳过修改")
    $done({})  // 不修改
    return
  }

  let targetLat = null, targetLng = null
  try {
    const parsed = JSON.parse(stored)
    targetLat = parseFloat(parsed.latitude)
    targetLng = parseFloat(parsed.longitude)
  } catch (e) {
    console.log(`loc567: 坐标格式错误: ${stored}`)
    $done({})
    return
  }

  if (isNaN(targetLat) || isNaN(targetLng)) {
    console.log(`loc567: 无效坐标: ${targetLat}, ${targetLng}`)
    $done({})
    return
  }

  console.log(`loc567: 目标坐标 ${targetLat}, ${targetLng}`)

  // 获取响应体
  const bodyBytes = $response.bodyBytes
  if (!bodyBytes || bodyBytes.byteLength === 0) {
    console.log("loc567: 响应体为空")
    $done({})
    return
  }

  // 转换为 Uint8Array
  const bytes = new Uint8Array(bodyBytes)

  try {
    const walker = new ProtobufWalker(bytes)
    const result = walker.walkAndReplace(targetLat, targetLng)

    if (result.modified) {
      console.log("loc567: 坐标已修改 ✓")
      $done({ bodyBytes: result.data.buffer })
    } else {
      console.log("loc567: 未找到可替换的坐标字段，响应原样放行")
      $done({})
    }
  } catch (e) {
    console.log(`loc567: 解析失败: ${e.message}`)
    $done({})
  }
}

main()
