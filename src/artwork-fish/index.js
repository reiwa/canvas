const state = context => {
  const {width, height} = context.canvas
  return array(10, () => {
    return {
      x: array(10)
      .map((point, i) => width * Math.random()),
      y: array(10)
      .map((point, i) => height * Math.random()),
      xx: width * Math.random(),
      yy: height * Math.random(),
      rots: Array
      .from(new Array(10).keys())
      .map(rot => 0),
      pct: 0,
      angle: 0
    }
  })
}

const update = (context, states) => {
  const {width, height} = context.canvas

  return states.map(state => {
    const x = state.x.slice()
    const y = state.y.slice()
    const rots = []

    x[0] = state.x[0] + (state.xx - state.x[0]) * state.pct
    y[0] = state.y[0] + (state.yy - state.y[0]) * Math.pow(state.pct, 1.2)

    for (let i = 1; i < 10; ++i) {
      rots[i] = Math.atan2(y[i - 1] - y[i], x[i - 1] - x[i])
      x[i] = x[i - 1] - Math.cos(rots[i]) * 8 + Math.sin(state.angle) / 6
      y[i] = y[i - 1] - Math.sin(rots[i]) * 8 + Math.cos(state.angle) / 6
    }

    const dist = Math.sqrt(Math.pow(x[0] - state.xx, 2) + Math.pow(y[0] - state.yy, 2))

    return {
      x: x,
      y: y,
      xx: dist < 100
        ? (width + 100) * Math.random() - 50
        : state.xx,
      yy: dist < 100
        ? (height + 100) * Math.random() - 50
        : state.yy,
      pct: dist < 100 ? 0 : state.pct + 0.00001,
      rots: rots,
      angle: state.angle > 360 ? 0 : state.angle + 0.05
    }
  })
}

const render = (context, states) => {
  states.forEach(state => {
    context.strokeStyle = '#0095d9'

    context.save()
    context.translate(state.x[1], state.y[1])
    context.rotate(Math.PI / 2 + state.rots[1])
    context.beginPath()
    context.lineTo(-4, -2)
    context.lineTo(4, -2)
    context.stroke()
    context.beginPath()
    context.lineTo(0, -14)
    context.lineTo(-6, -6)
    context.lineTo(6, -6)
    context.closePath()
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[1], state.y[1])
    context.rotate(Math.PI / 2 + state.rots[1])
    context.beginPath()
    context.lineTo(14, 16)
    context.lineTo(12, 8)
    context.lineTo(8, 6)
    context.closePath()
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[1], state.y[1])
    context.rotate(Math.PI / 2 + state.rots[1])
    context.beginPath()
    context.lineTo(-14, 16)
    context.lineTo(-12, 8)
    context.lineTo(-8, 6)
    context.closePath()
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[2], state.y[2])
    context.rotate(Math.PI / 2 + state.rots[2])
    context.beginPath()
    context.lineTo(-4, 0)
    context.lineTo(4, 0)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[3], state.y[3])
    context.rotate(Math.PI / 2 + state.rots[3])
    context.beginPath()
    context.lineTo(-4, 0)
    context.lineTo(4, 0)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[4], state.y[4])
    context.rotate(Math.PI / 2 + state.rots[4])
    context.beginPath()
    context.lineTo(-4, -2)
    context.lineTo(4, -2)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[5], state.y[5])
    context.rotate(Math.PI / 2 + state.rots[5])
    context.beginPath()
    context.lineTo(-6, -2)
    context.lineTo(5, -2)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[6], state.y[6])
    context.rotate(Math.PI / 2 + state.rots[6])
    context.beginPath()
    context.lineTo(-5, 0)
    context.lineTo(5, 0)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[8], state.y[8])
    context.rotate(Math.PI / 2 + state.rots[8])
    context.beginPath()
    context.lineTo(-2, 0)
    context.lineTo(2, 0)
    context.stroke()
    context.restore()

    context.save()
    context.translate(state.x[9], state.y[9])
    context.rotate(Math.PI / 2 + state.rots[9])
    context.beginPath()
    context.lineTo(0, 0)
    context.lineTo(4, 4)
    context.stroke()
    context.beginPath()
    context.lineTo(0, 0)
    context.lineTo(-4, 4)
    context.stroke()
    context.restore()
  })
}

const animationFrame = (context, _states, updates) => {
  const {width, height} = context.canvas
  context.clearRect(0, 0, width, height)
  const states = updates(context, _states)
  render(context, states)
  requestAnimationFrame(animationFrame.bind(null, context, states, updates))
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('2d')
  const states = state(context)
  animationFrame(context, states, update)
}

window.addEventListener('load', main)

const array = (n, func) => {
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
