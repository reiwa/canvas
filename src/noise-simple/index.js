const model = (context) => {
  const {width, height} = context.canvas
  return {
    color: '#0091EA',
    size: 2,
    noise: 0,
    acc: new Int16Array([0, 0]),
    vel: new Int16Array([0, 2]),
    pos: new Int16Array([width / 2, height / 2 - 300])
  }
}

const update = (context, state) => {
  const {width, height} = context.canvas

  state.noise = state.noise + (2 - 4 * Math.random())
  state.pos[0] = width / 2 + state.noise

  if (state.pos[1] > (height / 2 + 300)) {
    context.clearRect(0, 0, width, height)
    state.pos[1] = height / 2 - 300
  } else {
    state.vel[1] = state.vel[1] + state.acc[1] * 1
  }
  state.pos[1] = state.pos[1] + state.vel[1] * 1
  return state
}

const render = (context, state) => {
  context.fillStyle = state.color
  context.beginPath()
  context.arc(state.pos[0], state.pos[1], state.size, 0, Math.PI * 2)
  context.fill()
}

const animationFrame = (context, _state, updates) => {
  const state = updates(context, _state)
  render(context, state)
  requestAnimationFrame(animationFrame.bind(null, context, state, updates))
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('2d')
  const state = model(context)
  animationFrame(context, state, update)
}

window.addEventListener('load', main)
