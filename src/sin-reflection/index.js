const model = context => {
  return array(100, () => {
    const r = 100 + 200 * Math.random()
    const rad = Math.PI * 2 * Math.random()
    return {
      color: '#0091EA',
      size: 2 + Math.random() * 4,
      vel: new Int16Array([
        (1 + 1 * Math.random()) * (Math.random() < 0.5 ? 1 : -1),
        (1 + 1 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)
      ]),
      pos: new Float32Array([
        r * Math.sin(rad),
        r * Math.cos(rad)
      ])
    }
  })
}

const update = (context, states) => {
  return states.map(state => {
    const r = dist(state.pos)

    if (r < -400 + state.size || r > 400 - state.size) {
      state.vel[0] = state.vel[0] * -1
    }

    state.pos[0] = state.pos[0] + state.vel[0] * 1

    if (r < -400 + state.size || r > 400 - state.size) {
      state.vel[1] = state.vel[1] * -1
    }

    state.pos[1] = state.pos[1] + state.vel[1] * 1

    return state
  })
}

const render = (context, states) => {
  const {width, height} = context.canvas
  context.save()
  context.translate(width / 2, height / 2)
  states.forEach(state => {
    context.strokeStyle = state.color
    context.fillStyle = state.color
    context.beginPath()
    context.arc(state.pos[0], state.pos[1], state.size, 0, Math.PI * 2)
    context.fill()
  })
  context.beginPath()
  context.arc(0, 0, 400, 0, Math.PI * 2)
  context.stroke()
  context.restore()
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
  const states = model(context)
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

const dist = (vec) => {
  return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2))
}
