const model = (context) => {
  const {width, height} = context.canvas
  return {
    color: '#0091EA',
    size: 20,
    rad: 0,
    r: 100,
    vel: new Int16Array([0, 4]),
    pos: new Int16Array([width / 2, height / 2])
  }
}

const update = (context, state) => {
  const {width, height} = context.canvas

  state.rad = state.rad > Math.PI * 2
    ? 0
    : state.rad + Math.PI / 40

  if (state.pos[1] > height + state.size) {
    state.pos[1] = 0 - state.size
  } else {
    state.pos[1] = state.pos[1] + state.vel[1] * 1
  }

  state.pos[0] = width / 2 + state.r * Math.sin(state.rad)
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
  const {width, height} = context.canvas
  context.clearRect(0, 0, width, height)
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
