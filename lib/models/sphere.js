// Copyright (c) doxas

export default (row, column, rad, color) => {
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
