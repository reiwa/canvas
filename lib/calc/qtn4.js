// Copyright (c) doxas

export default {
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
