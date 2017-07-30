const model = (context) => {
  return array(100, () => {
    const r = 100 + 200 * Math.random()
    const rad = Math.PI * 2 * Math.random()
    return {
      color: '#0091EA',
      size: 4 + 10 * Math.random(),
      acc: new Float32Array([1, 1]),
      vel: new Float32Array([0, 0]),
      pos: new Float32Array([
        r * Math.sin(rad),
        r * Math.cos(rad)
      ])
    }
  })
}

const update = (context, states) => {
  return states.map(state => {
    sub(state.acc, [0, 0], state.pos)
    normalize(state.acc)
    multiple(state.acc, state.acc, 0.2)
    add(state.vel, state.acc)
    limit(state.vel, 10)
    add(state.pos, state.vel)
    return state
  })
}

const render = (context, states) => {
  const {width, height} = context.canvas
  context.save()
  context.translate(width / 2, height / 2)
  states.forEach(state => {
    context.strokeStyle = state.color
    context.beginPath()
    context.arc(state.pos[0], state.pos[1], state.size, 0, Math.PI * 2)
    context.stroke()
  })
  context.restore()
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

const normalize = (vector) => {
  if (vector.length === 2) {
    const n = Math.sqrt(
      Math.pow(vector[0], 2) + Math.pow(vector[1], 2)
    )
    vector[0] = vector[0] / n
    vector[1] = vector[1] / n
  } else {
    const n = Math.sqrt(
      Math.pow(vector[0], 2),
      Math.pow(vector[1], 2),
      Math.pow(vector[2], 2)
    )
    vector[0] = vector[0] / n
    vector[1] = vector[1] / n
    vector[2] = vector[2] / n
  }
}

const add = (vector, vector2) => {
  if (typeof vector2 === 'number') {
    vector[0] = vector[0] + vector2
    vector[1] = vector[1] + vector2
    if (vector.length === 3) {
      vector[2] = vector[2] + vector2
    }
  } else {
    vector[0] = vector[0] + vector2[0]
    vector[1] = vector[1] + vector2[1]
    if (vector.length === 3) {
      vector[2] = vector[2] + vector2[2]
    }
  }
}

const sub = (vector, vector1, vector2) => {
  if (typeof vector2 === 'number') {
    vector[0] = vector1[0] - vector2
    vector[1] = vector1[1] - vector2
    if (array.length === 3) {
      vector[2] = vector1[2] - vector2
    }
  } else {
    vector[0] = vector1[0] - vector2[0]
    vector[1] = vector1[1] - vector2[1]
    if (array.length === 3) {
      vector[2] = vector1[2] - vector2[2]
    }
  }
  return vector
}

const multiple = (vec, vec1, v) => {
  vec[0] = vec1[0] * v
  vec[1] = vec1[1] * v
  if (vec.length === 3) {
    vec[2] = vec1[2] * v
  }
}

const limit = (vector, v) => {
  if (vector[0] >= v) {
    vector[0] = v
  } else if (vector[0] <= -v) {
    vector[0] = -v
  }
  if (vector[1] >= v) {
    vector[1] = v
  } else if (vector[1] <= -v) {
    vector[1] = -v
  }
  if (vector.length === 3) {
    if (vector[2] >= v) { vector[2] = v }
  }
}
