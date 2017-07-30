const model = context => {
  const {width, height} = context.canvas
  return array(100, () => {
    return {
      color: '#0091EA',
      size: 2 + Math.random() * 4,
      vel: new Int16Array([
        (2 + 1 * Math.random()) * (Math.random() < 0.5 ? 1 : -1),
        (2 + 1 * Math.random()) * (Math.random() < 0.5 ? 1 : -1)
      ]),
      pos: new Int16Array([
        Math.random() * width,
        Math.random() * height
      ])
    }
  })
}

const update = (context, states) => {
  const {width, height} = context.canvas

  return states.map(state => {
    if (state.pos[0] < (0 + 10) || state.pos[0] > (width - 10)) {
      state.vel[0] = state.vel[0] * -1
    }

    state.pos[0] = state.pos[0] + state.vel[0] * 1

    if (state.pos[1] < (0 + 10) || state.pos[1] > (height - 10)) {
      state.vel[1] = state.vel[1] * -1
    }

    state.pos[1] = state.pos[1] + state.vel[1] * 1

    return state
  })
}

const render = (context, states) => {
  states.forEach(state => {
    context.fillStyle = state.color
    context.beginPath()
    context.arc(state.pos[0], state.pos[1], state.size, 0, Math.PI * 2)
    context.fill()
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
