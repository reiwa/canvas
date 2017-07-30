const model = context => {
  return array(100, () => {
    const rad = (Math.PI * 2) * Math.random()
    return {
      rad,
      radAcc: Math.random() / 10,
      reverse: Math.random() < 0.5 ? 1 : 0,
      color: createRandomColor(),
      size: 100 + 140 * Math.random(),
      pos: new Int16Array([
        10 * Math.sin(rad),
        10 * Math.cos(rad)
      ])
    }
  })
}

const update = (context, states) => {
  return states.map(state => {
    if (state.reverse) {
      state.rad = state.rad > Math.PI * 2
        ? state.rad - Math.PI * 2
        : state.rad + state.radAcc
    } else {
      state.rad = state.rad < 0
        ? Math.PI * 2 - state.rad
        : state.rad - state.radAcc
    }

    state.pos[0] = 20 * Math.sin(state.rad)
    state.pos[1] = 20 * Math.cos(state.rad)

    return state
  })
}

const render = (context, states) => {
  const {width, height} = context.canvas
  context.save()
  context.translate(width / 2, height / 2)
  states.forEach(state => {
    context.globalAlpha = 0.1
    context.lineWidth = 100
    context.strokeStyle = state.color
    context.beginPath()
    context.arc(state.pos[0], state.pos[1], state.size, 0, Math.PI * 2)
    context.stroke()
  })
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

function createRandomColor () {
  return rgb(
    parseInt(Math.random() * 255),
    parseInt(Math.random() * 255),
    parseInt(Math.random() * 255)
  )
}

function rgb (r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ',1)'
}
