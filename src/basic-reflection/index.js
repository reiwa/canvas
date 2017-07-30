const model = (context) => {
  const {width, height} = context.canvas
  return {
    color: '#0091EA',
    size: 20,
    acc: new Int16Array([0, 0]),
    vel: new Int16Array([4, 10]),
    pos: new Int16Array([width / 2, height / 2])
  }
}

const update = (context, state) => {
  const {width, height} = context.canvas

  if (state.pos[0] < (0 + 10) || state.pos[0] > (width - 10)) {
    state.vel[0] = state.vel[0] * -1
  }

  if (state.pos[1] < (0 + 10) || state.pos[1] > (height - 10)) {
    state.vel[1] = state.vel[1] * -1
  }

  state.pos[0] = state.pos[0] + state.vel[0] * 1
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
