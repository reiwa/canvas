const model = (context) => {
  const {width, height} = context.canvas

  return array(100, () => {
    return {
      color: '#0091EA',
      size: 4 + 10 * Math.random(),
      vel: new Int16Array([
        0,
        6 + 7 * Math.random()
      ]),
      pos: new Int16Array([
        width * Math.random(),
        height * Math.random()
      ])
    }
  })
}

const update = (context, states) => {
  const {width, height} = context.canvas

  return states.map(state => {
    if (state.pos[1] > height + state.size) {
      state.pos[0] = width * Math.random()
      state.pos[1] = 0 - state.size
    } else {
      state.pos[1] = state.pos[1] + state.vel[1] * 1
    }

    state.pos[1] = state.pos[1] + state.vel[1] * 1

    return state
  })
}

const render = (context, states) => {
  states.forEach(state => {
    context.strokeStyle = state.color
    context.lineWidth = 4
    context.beginPath()
    context.moveTo(state.pos[0], state.pos[1])
    context.lineTo(state.pos[0], state.pos[1] + state.size)
    context.stroke()
  })
}

const animationFrame = (context, _state, updates) => {
  const state = updates(context, _state)
  const {width, height} = context.canvas
  context.clearRect(0, 0, width, height)
  render(context, state)
  requestAnimationFrame(animationFrame.bind(null, context, state, updates))
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
  for (let i = 0; i < n; ++i) {
    array.push(func(i))
  }
  return array
}
