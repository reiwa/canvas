const model = context => {
  const {width, height} = context.canvas
  return {
    color: '#0091EA',
    size: 10 * Math.random() * 20,
    pos: new Int16Array([
      Math.random() * width,
      Math.random() * height
    ])
  }
}

const update = (context, state) => {
  const {width, height} = context.canvas
  state.size = 10 * Math.random() * 20
  state.pos[0] = Math.random() * width
  state.pos[1] = Math.random() * height
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
  setTimeout(animationFrame.bind(null, context, state, updates), 1000)
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('2d')
  const state = model(context)
  animationFrame(context, state, update)
}

window.addEventListener('load', main)
