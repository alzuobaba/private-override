// loc567-spoof.js
// 拦截 gs-loc.apple.com 响应，替换坐标为香港（默认）
// 
// 如需修改坐标，编辑下方的 DEFAULT_LAT / DEFAULT_LNG

const DEFAULT_LAT = 22.3027   // 香港 纬度
const DEFAULT_LNG = 114.1772  // 香港 经度

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

  walkAndReplace(targetLat, targetLng) {
    const out = []
    this._walk(out, targetLat, targetLng)
    return { data: new Uint8Array(out), modified: this.modified }
  }

  _walk(out, targetLat, targetLng) {
    while (this.bytesLeft() > 0) {
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
        case 1: { // 64-bit (double)
          const doubleVal = this.readDouble()
          if (fieldNum === 1 && doubleVal >= -90 && doubleVal <= 90 && targetLat !== null) {
            this._writeDouble(out, targetLat)
            this.modified = true
          } else if (fieldNum === 2 && doubleVal >= -180 && doubleVal <= 180 && targetLng !== null) {
            this._writeDouble(out, targetLng)
            this.modified = true
          } else {
            this._writeDouble(out, doubleVal)
          }
          break
        }
        case 2: { // length-delimited (embedded message)
          const len = this.readVarint()
          this._writeVarint(out, len)
          try {
            const subWalker = new ProtobufWalker(
              new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, len)
            )
            const subResult = subWalker.walkAndReplace(targetLat, targetLng)
            if (subResult.modified) {
              this.modified = true
              out.length -= this._varintLen(len)
              this._writeVarint(out, len)
              for (const b of subResult.data) out.push(b)
              this.offset += len
            } else {
              for (let i = 0; i < len; i++) {
                out.push(this.view.getUint8(this.offset++))
              }
            }
          } catch {
            for (let i = 0; i < len; i++) {
              out.push(this.view.getUint8(this.offset++))
            }
          }
          break
        }
        case 5: { // 32-bit
          for (let i = 0; i < 4; i++) out.push(this.view.getUint8(this.offset++))
          break
        }
        default:
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
  const targetLat = DEFAULT_LAT
  const targetLng = DEFAULT_LNG

  console.log(`loc567: 目标坐标 ${targetLat}, ${targetLng} (香港)`)

  const bodyBytes = $response.bodyBytes
  if (!bodyBytes || bodyBytes.byteLength === 0) {
    $done({})
    return
  }

  const bytes = new Uint8Array(bodyBytes)

  try {
    const walker = new ProtobufWalker(bytes)
    const result = walker.walkAndReplace(targetLat, targetLng)

    if (result.modified) {
      console.log("loc567: 坐标已修改 ✓")
      $done({ bodyBytes: result.data.buffer })
    } else {
      console.log("loc567: 未找到可替换的坐标字段")
      $done({})
    }
  } catch (e) {
    console.log(`loc567: 解析失败: ${e.message}`)
    $done({})
  }
}

main()
