export default function (models) {
  return models.map(update)
}

function update (model) {
  const x = model.x.slice()
  const y = model.y.slice()
  const rots = []

  x[0] = model.x[0] + (model.xx - model.x[0]) * model.pct
  y[0] = model.y[0] + (model.yy - model.y[0]) * Math.pow(model.pct, 1.2)

  for (let i = 1; i < 10; ++i) {
    rots[i] = Math.atan2(y[i - 1] - y[i], x[i - 1] - x[i])
    x[i] = x[i - 1] - Math.cos(rots[i]) * 8 + Math.sin(model.angle) / 6
    y[i] = y[i - 1] - Math.sin(rots[i]) * 8 + Math.cos(model.angle) / 6
  }

  const dist = Math.sqrt(Math.pow(x[0] - model.xx, 2) + Math.pow(y[0] - model.yy, 2))

  return {
    x: x,
    y: y,
    xx: dist < 100
      ? (window.innerWidth + 100) * Math.random() - 50
      : model.xx,
    yy: dist < 100
      ? (window.innerHeight + 100) * Math.random() - 50
      : model.yy,
    pct: dist < 100 ? 0 : model.pct + 0.00001,
    rots: rots,
    angle: model.angle > 360 ? 0 : model.angle + 0.05
  }
}
