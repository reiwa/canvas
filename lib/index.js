export const array = {
  create (n, func) {
    const array = []
    if (func) {
      for (let i = 0; i < n; ++i) {
        array.push(func(i))
      }
    } else {
      for (let i = 0; i < n; ++i) {
        array.push(null)
      }
    }
    return array
  }
}

export const int16Array = {
  create (n, func) {
    const array = new Int16Array(arguments.length)
    if (func) {
      for (let i = 0; i < n; ++i) {
        array.push(func(i))
      }
    }
    return array
  },
  createFrom () {
    const array = new Int16Array(arguments.length)
    for (let i = arguments.length; i < arguments.length; ++i) {
      array[i] = arguments[i]
    }
    return array
  }
}

// Copyright (c) doxas

export const sphere = (row, column, rad, color) => {
  const pos = []
  const nor = []
  const col = []
  const st = []
  const idx = []
  for (var i = 0; i <= row; i++) {
    const r = Math.PI / row * i
    const ry = Math.cos(r)
    const rr = Math.sin(r)
    for (let ii = 0; ii <= column; ++ii) {
      const tr = Math.PI * 2 / column * ii
      const tx = rr * rad * Math.cos(tr)
      const ty = ry * rad
      const tz = rr * rad * Math.sin(tr)
      const rx = rr * Math.cos(tr)
      const rz = rr * Math.sin(tr)
      const tc = color || hsva(360 / row * i, 1, 1, 1)
      pos.push(tx, ty, tz)
      nor.push(rx, ry, rz)
      col.push(tc[0], tc[1], tc[2], tc[3])
      st.push(1 - 1 / column * ii, 1 / row * i)
    }
  }
  let r = 0
  for (i = 0; i < row; ++i) {
    for (let ii = 0; ii < column; ++ii) {
      r = (column + 1) * i + ii
      idx.push(r, r + 1, r + column + 2)
      idx.push(r, r + column + 2, r + column + 1)
    }
  }
  return {positions: pos, n: nor, colors: col, t: st, index: idx}
}

export const hsva = (h, s, v, a) => {
  if (s > 1 || v > 1 || a > 1) { return }
  const th = h % 360
  const i = Math.floor(th / 60)
  const f = th / 60 - i
  const m = v * (1 - s)
  const n = v * (1 - s * f)
  const k = v * (1 - s * (1 - f))
  const color = []
  if (!s > 0 && !s < 0) {
    color.push(v, v, v, a)
  } else {
    const r = [v, n, m, m, k, v]
    const g = [k, v, v, n, m, m]
    const b = [m, m, k, v, v, n]
    color.push(r[i], g[i], b[i], a)
  }
  return color
}

// mat

const mat4 = {
  create () {
    return new Float32Array(16)
  },
  identity (ref) {
    ref[0] = 1
    ref[1] = 0
    ref[2] = 0
    ref[3] = 0
    ref[4] = 0
    ref[5] = 1
    ref[6] = 0
    ref[7] = 0
    ref[8] = 0
    ref[9] = 0
    ref[10] = 1
    ref[11] = 0
    ref[12] = 0
    ref[13] = 0
    ref[14] = 0
    ref[15] = 1
  },
  multiply (mat1, mat2, ref) {
    const a = mat1[0]
    const b = mat1[1]
    const c = mat1[2]
    const d = mat1[3]
    const e = mat1[4]
    const f = mat1[5]
    const g = mat1[6]
    const h = mat1[7]
    const i = mat1[8]
    const j = mat1[9]
    const k = mat1[10]
    const l = mat1[11]
    const m = mat1[12]
    const n = mat1[13]
    const o = mat1[14]
    const p = mat1[15]
    const A = mat2[0]
    const B = mat2[1]
    const C = mat2[2]
    const D = mat2[3]
    const E = mat2[4]
    const F = mat2[5]
    const G = mat2[6]
    const H = mat2[7]
    const I = mat2[8]
    const J = mat2[9]
    const K = mat2[10]
    const L = mat2[11]
    const M = mat2[12]
    const N = mat2[13]
    const O = mat2[14]
    const P = mat2[15]
    ref[0] = A * a + B * e + C * i + D * m
    ref[1] = A * b + B * f + C * j + D * n
    ref[2] = A * c + B * g + C * k + D * o
    ref[3] = A * d + B * h + C * l + D * p
    ref[4] = E * a + F * e + G * i + H * m
    ref[5] = E * b + F * f + G * j + H * n
    ref[6] = E * c + F * g + G * k + H * o
    ref[7] = E * d + F * h + G * l + H * p
    ref[8] = I * a + J * e + K * i + L * m
    ref[9] = I * b + J * f + K * j + L * n
    ref[10] = I * c + J * g + K * k + L * o
    ref[11] = I * d + J * h + K * l + L * p
    ref[12] = M * a + N * e + O * i + P * m
    ref[13] = M * b + N * f + O * j + P * n
    ref[14] = M * c + N * g + O * k + P * o
    ref[15] = M * d + N * h + O * l + P * p
  },
  scale (mat, vec, ref) {
    ref[0] = mat[0] * vec[0]
    ref[1] = mat[1] * vec[0]
    ref[2] = mat[2] * vec[0]
    ref[3] = mat[3] * vec[0]
    ref[4] = mat[4] * vec[1]
    ref[5] = mat[5] * vec[1]
    ref[6] = mat[6] * vec[1]
    ref[7] = mat[7] * vec[1]
    ref[8] = mat[8] * vec[2]
    ref[9] = mat[9] * vec[2]
    ref[10] = mat[10] * vec[2]
    ref[11] = mat[11] * vec[2]
    ref[12] = mat[12]
    ref[13] = mat[13]
    ref[14] = mat[14]
    ref[15] = mat[15]
  },
  translate (mat, vec, ref) {
    ref[0] = mat[0]
    ref[1] = mat[1]
    ref[2] = mat[2]
    ref[3] = mat[3]
    ref[4] = mat[4]
    ref[5] = mat[5]
    ref[6] = mat[6]
    ref[7] = mat[7]
    ref[8] = mat[8]
    ref[9] = mat[9]
    ref[10] = mat[10]
    ref[11] = mat[11]
    ref[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12]
    ref[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13]
    ref[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14]
    ref[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15]
  },
  rotate (mat, angle, axis, ref) {
    let sqrt = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2])
    if (!sqrt) return
    let a = axis[0]
    let b = axis[1]
    let c = axis[2]
    if (sqrt !== 1) {
      sqrt = 1 / sqrt
      a = a * sqrt
      b = b * sqrt
      c = c * sqrt
    }
    const d = Math.sin(angle)
    const e = Math.cos(angle)
    const f = 1 - e
    const g = mat[0]
    const h = mat[1]
    const i = mat[2]
    const j = mat[3]
    const k = mat[4]
    const l = mat[5]
    const m = mat[6]
    const n = mat[7]
    const o = mat[8]
    const p = mat[9]
    const q = mat[10]
    const r = mat[11]
    const s = a * a * f + e
    const t = b * a * f + c * d
    const u = c * a * f - b * d
    const v = a * b * f - c * d
    const w = b * b * f + e
    const x = c * b * f + a * d
    const y = a * c * f + b * d
    const z = b * c * f - a * d
    const A = c * c * f + e
    if (angle) {
      if (mat !== ref) {
        ref[12] = mat[12]
        ref[13] = mat[13]
        ref[14] = mat[14]
        ref[15] = mat[15]
      }
    } else {
      ref = mat
    }
    ref[0] = g * s + k * t + o * u
    ref[1] = h * s + l * t + p * u
    ref[2] = i * s + m * t + q * u
    ref[3] = j * s + n * t + r * u
    ref[4] = g * v + k * w + o * x
    ref[5] = h * v + l * w + p * x
    ref[6] = i * v + m * w + q * x
    ref[7] = j * v + n * w + r * x
    ref[8] = g * y + k * z + o * A
    ref[9] = h * y + l * z + p * A
    ref[10] = i * y + m * z + q * A
    ref[11] = j * y + n * z + r * A
  },
  lookAt (eye, center, up, ref) {
    const eyeX = eye[0]
    const eyeY = eye[1]
    const eyeZ = eye[2]
    const upX = up[0]
    const upY = up[1]
    const upZ = up[2]
    const centerX = center[0]
    const centerY = center[1]
    const centerZ = center[2]
    if (eyeX === centerX && eyeY === centerY && eyeZ === centerZ) {
      this.identity(ref)
      return
    }
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, l
    z0 = eyeX - center[0]
    z1 = eyeY - center[1]
    z2 = eyeZ - center[2]
    l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2)
    z0 *= l
    z1 *= l
    z2 *= l
    x0 = upY * z2 - upZ * z1
    x1 = upZ * z0 - upX * z2
    x2 = upX * z1 - upY * z0
    l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2)
    if (!l) {
      x0 = 0
      x1 = 0
      x2 = 0
    } else {
      l = 1 / l
      x0 *= l
      x1 *= l
      x2 *= l
    }
    y0 = z1 * x2 - z2 * x1
    y1 = z2 * x0 - z0 * x2
    y2 = z0 * x1 - z1 * x0
    l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2)
    if (!l) {
      y0 = 0
      y1 = 0
      y2 = 0
    } else {
      l = 1 / l
      y0 *= l
      y1 *= l
      y2 *= l
    }
    ref[0] = x0
    ref[1] = y0
    ref[2] = z0
    ref[3] = 0
    ref[4] = x1
    ref[5] = y1
    ref[6] = z1
    ref[7] = 0
    ref[8] = x2
    ref[9] = y2
    ref[10] = z2
    ref[11] = 0
    ref[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ)
    ref[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ)
    ref[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ)
    ref[15] = 1
  },
  perspective (fovy, aspect, near, far, ref) {
    const t = near * Math.tan(fovy * Math.PI / 360)
    const r = t * aspect
    const a = r * 2
    const b = t * 2
    const c = far - near
    ref[0] = near * 2 / a
    ref[1] = 0
    ref[2] = 0
    ref[3] = 0
    ref[4] = 0
    ref[5] = near * 2 / b
    ref[6] = 0
    ref[7] = 0
    ref[8] = 0
    ref[9] = 0
    ref[10] = -(far + near) / c
    ref[11] = -1
    ref[12] = 0
    ref[13] = 0
    ref[14] = -(far * near * 2) / c
    ref[15] = 0
  },
  ortho (left, right, top, bottom, near, far, ref) {
    const h = (right - left)
    const v = (top - bottom)
    const d = (far - near)
    ref[0] = 2 / h
    ref[1] = 0
    ref[2] = 0
    ref[3] = 0
    ref[4] = 0
    ref[5] = 2 / v
    ref[6] = 0
    ref[7] = 0
    ref[8] = 0
    ref[9] = 0
    ref[10] = -2 / d
    ref[11] = 0
    ref[12] = -1 * (left + right) / h
    ref[13] = -1 * (top + bottom) / v
    ref[14] = -1 * (far + near) / d
    ref[15] = 1
  },
  transpose (mat, ref) {
    ref[0] = mat[0]
    ref[1] = mat[4]
    ref[2] = mat[8]
    ref[3] = mat[12]
    ref[4] = mat[1]
    ref[5] = mat[5]
    ref[6] = mat[9]
    ref[7] = mat[13]
    ref[8] = mat[2]
    ref[9] = mat[6]
    ref[10] = mat[10]
    ref[11] = mat[14]
    ref[12] = mat[3]
    ref[13] = mat[7]
    ref[14] = mat[11]
    ref[15] = mat[15]
  },
  inverse (mat, ref) {
    const a = mat[0]
    const b = mat[1]
    const c = mat[2]
    const d = mat[3]
    const e = mat[4]
    const f = mat[5]
    const g = mat[6]
    const h = mat[7]
    const i = mat[8]
    const j = mat[9]
    const k = mat[10]
    const l = mat[11]
    const m = mat[12]
    const n = mat[13]
    const o = mat[14]
    const p = mat[15]
    const q = a * f - b * e
    const r = a * g - c * e
    const s = a * h - d * e
    const t = b * g - c * f
    const u = b * h - d * f
    const v = c * h - d * g
    const w = i * n - j * m
    const x = i * o - k * m
    const y = i * p - l * m
    const z = j * o - k * n
    const A = j * p - l * n
    const B = k * p - l * o
    const ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w)
    ref[0] = (f * B - g * A + h * z) * ivd
    ref[1] = (-b * B + c * A - d * z) * ivd
    ref[2] = (n * v - o * u + p * t) * ivd
    ref[3] = (-j * v + k * u - l * t) * ivd
    ref[4] = (-e * B + g * y - h * x) * ivd
    ref[5] = (a * B - c * y + d * x) * ivd
    ref[6] = (-m * v + o * s - p * r) * ivd
    ref[7] = (i * v - k * s + l * r) * ivd
    ref[8] = (e * A - f * y + h * w) * ivd
    ref[9] = (-a * A + b * y - d * w) * ivd
    ref[10] = (m * u - n * s + p * q) * ivd
    ref[11] = (-i * u + j * s - l * q) * ivd
    ref[12] = (-e * z + f * x - g * w) * ivd
    ref[13] = (a * z - b * x + c * w) * ivd
    ref[14] = (-m * t + n * r - o * q) * ivd
    ref[15] = (i * t - j * r + k * q) * ivd
  }
}

// mat4: Copyright (c) doxas

const qtn4 = {
  create () {
    return new Float32Array(4)
  },
  identity (ref) {
    ref[0] = 0
    ref[1] = 0
    ref[2] = 0
    ref[3] = 1
  },
  inverse (qtn, ref) {
    ref[0] = qtn[0] * -1
    ref[1] = qtn[1] * -1
    ref[2] = qtn[2] * -1
    ref[3] = qtn[3]
  },
  normalize (ref) {
    const x = ref[0]
    const y = ref[1]
    const z = ref[2]
    const w = ref[3]
    let l = Math.sqrt(x * x + y * y + z * z + w * w)
    if (l === 0) {
      ref[0] = 0
      ref[1] = 0
      ref[2] = 0
      ref[3] = 0
    } else {
      l = 1 / l
      ref[0] = x * l
      ref[1] = y * l
      ref[2] = z * l
      ref[3] = w * l
    }
  },
  multiply (qtn1, qtn2, ref) {
    const ax = qtn1[0]
    const ay = qtn1[1]
    const az = qtn1[2]
    const aw = qtn1[3]
    const bx = qtn2[0]
    const by = qtn2[1]
    const bz = qtn2[2]
    const bw = qtn2[3]
    ref[0] = ax * bw + aw * bx + ay * bz - az * by
    ref[1] = ay * bw + aw * by + az * bx - ax * bz
    ref[2] = az * bw + aw * bz + ax * by - ay * bx
    ref[3] = aw * bw - ax * bx - ay * by - az * bz
  },
  rotate (angle, axis, ref) {
    let sqrt = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2])
    if (!sqrt) return
    let a = axis[0]
    let b = axis[1]
    let c = axis[2]
    if (sqrt !== 1) {
      sqrt = 1 / sqrt
      a = a * sqrt
      b = b * sqrt
      c = c * sqrt
    }
    const s = Math.sin(angle * 0.5)
    ref[0] = a * s
    ref[1] = b * s
    ref[2] = c * s
    ref[3] = Math.cos(angle * 0.5)
  },
  toVec3 (vec, qtn, ref) {
    const qp = this.create()
    const qq = this.create()
    const qr = this.create()
    this.inverse(qtn, qr)
    qp[0] = vec[0]
    qp[1] = vec[1]
    qp[2] = vec[2]
    this.multiply(qr, qp, qq)
    this.multiply(qq, qtn, qr)
    ref[0] = qr[0]
    ref[1] = qr[1]
    ref[2] = qr[2]
  },
  toMat4 (qtn, ref) {
    const x = qtn[0]
    const y = qtn[1]
    const z = qtn[2]
    const w = qtn[3]
    const x2 = x + x
    const y2 = y + y
    const z2 = z + z
    const xx = x * x2
    const xy = x * y2
    const xz = x * z2
    const yy = y * y2
    const yz = y * z2
    const zz = z * z2
    const wx = w * x2
    const wy = w * y2
    const wz = w * z2
    ref[0] = 1 - (yy + zz)
    ref[1] = xy - wz
    ref[2] = xz + wy
    ref[3] = 0
    ref[4] = xy + wz
    ref[5] = 1 - (xx + zz)
    ref[6] = yz - wx
    ref[7] = 0
    ref[8] = xz - wy
    ref[9] = yz + wx
    ref[10] = 1 - (xx + yy)
    ref[11] = 0
    ref[12] = 0
    ref[13] = 0
    ref[14] = 0
    ref[15] = 1
  },
  slerp (qtn1, qtn2, time, ref) {
    const ht = qtn1[0] * qtn2[0] + qtn1[1] * qtn2[1] + qtn1[2] * qtn2[2] + qtn1[3] * qtn2[3]
    let hs = 1.0 - ht * ht
    if (hs <= 0.0) {
      ref[0] = qtn1[0]
      ref[1] = qtn1[1]
      ref[2] = qtn1[2]
      ref[3] = qtn1[3]
    } else {
      hs = Math.sqrt(hs)
      if (Math.abs(hs) < 0.0001) {
        ref[0] = (qtn1[0] * 0.5 + qtn2[0] * 0.5)
        ref[1] = (qtn1[1] * 0.5 + qtn2[1] * 0.5)
        ref[2] = (qtn1[2] * 0.5 + qtn2[2] * 0.5)
        ref[3] = (qtn1[3] * 0.5 + qtn2[3] * 0.5)
      } else {
        const ph = Math.acos(ht)
        const pt = ph * time
        const t0 = Math.sin(ph - pt) / hs
        const t1 = Math.sin(pt) / hs
        ref[0] = qtn1[0] * t0 + qtn2[0] * t1
        ref[1] = qtn1[1] * t0 + qtn2[1] * t1
        ref[2] = qtn1[2] * t0 + qtn2[2] * t1
        ref[3] = qtn1[3] * t0 + qtn2[3] * t1
      }
    }
  }
}
