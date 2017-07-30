const model = () => {
  return array(52, () => null)
  .map(() => new Float32Array([0, 0]))
  .map(point => [
    new Float32Array([point[0], point[1]]),
    new Float32Array([point[0] + 10, point[1] + 85 + Math.random() * 25]),
    new Float32Array([point[0] + 85 + Math.random() * 25, point[1] + 10])
  ])
  .map(points => ({
    rad: 0,
    radAcc: 0.1,
    reverse: Math.random() < 0.5 ? 0.8 : -0.8,
    acceleration: 0,
    velocity: 0,
    color: createRandomColor(),
    points,
    nextPoints: createSamplePattern(),
    pattern: 1
  }))
}

const createSamplePattern = () => {
  return [
    '278.13,147.562 282.331,110.2 350.28,178.845',
    '282.108,110.2 353.899,131.758 350.058,178.845',
    '250.498,134.377 282.331,110.2 278.13,147.562',
    '354.122,241.483 278.13,147.562 350.28,178.845',
    '354.122,241.483 350.28,178.845 416.896,155.492',
    '385.509,198.488 416.896,155.492 458.612,177.512',
    '416.896,155.492 458.612,157.281 458.612,177.512',
    '458.612,157.281 492.648,189.875 458.612,177.512',
    '492.648,189.875 473.031,196.515 458.612,177.512',
    '492.648,189.875 473.031,196.515 494.157,225.79',
    '494.157,225.79 473.031,196.515 473.031,228.988',
    '468.655,253.933 473.031,228.988 435.306,259.893',
    '468.655,253.933 494.157,225.79 473.031,228.988',
    '473.031,196.515 473.031,228.988 393.719,234.844',
    '473.031,228.988 435.306,259.893 393.719,234.844',
    '393.719,234.844 385.509,198.488 473.031,196.515',
    '458.612,177.512 473.031,196.515 385.509,198.488',
    '354.122,241.483 385.509,198.488 398.493,255.987',
    '398.493,255.987 393.719,234.844 435.306,259.893',
    '215.293,199.533 250.498,134.377 278.13,147.562',
    '215.293,199.533 215.293,134.377 250.498,134.377',
    '215.293,199.533 162.779,212.51 215.293,134.377',
    '221.329,255.064 162.779,212.51 215.293,199.533',
    '250.498,302.749 211.068,302.749 221.329,255.064',
    '221.329,255.064 211.068,302.749 162.779,212.51',
    '215.293,199.533 278.13,147.562 318.003,196.515',
    '221.329,255.064 215.293,199.533 354.122,241.483',
    '250.498,302.749 221.329,255.064 354.122,241.483',
    '215.293,199.533 318.003,196.515 354.122,241.483',
    '135.919,115.632 168.514,91.186 215.293,134.377',
    '135.919,142.341 135.919,115.632 215.293,134.377',
    '162.779,212.51 135.919,142.341 215.293,134.377',
    '111.263,257.63 92.761,161.506 135.919,142.341',
    '162.779,212.51 111.263,257.63 135.919,142.341',
    '211.068,302.749 111.263,257.63 162.779,212.51',
    '211.068,302.749 121.3,311.199 111.263,257.63',
    '121.3,311.199 79.331,299.731 106.878,234.844',
    '106.878,234.844 57.451,182.028 92.761,161.506',
    '106.878,234.844 73.677,234.844 57.451,182.028',
    '106.878,234.844 79.331,299.731 73.677,234.844',
    '145.275,359.639 121.3,311.199 211.068,302.749',
    '179.68,375.86 145.275,359.639 175.606,332.891',
    '179.68,375.86 175.606,332.891 193.337,344.05',
    '193.337,344.05 175.606,332.891 211.068,302.749',
    '73.677,234.844 20.027,214.925 57.451,182.028',
    '73.677,234.844 42.662,284.415 20.027,214.925',
    '42.662,284.415 5.843,255.064 20.027,214.925',
    '79.331,299.731 42.662,284.415 73.677,234.844',
    '344.464,284.415 250.498,302.749 354.122,241.483',
    '277.239,320.706 250.498,302.749 344.464,284.415',
    '313.76,320.706 277.239,320.706 344.464,284.415',
    '39.458,231.907 39.458,215.063 52.018,224.582'
  ].map(line => {
    return line
    .split(' ')
    .map(str => {
      const n = str.split(',')
      return new Float32Array([
        n[0] - 200,
        n[1] - 170
      ])
    })
  })
}

const update = (context, states, subscriptions) => {
  return states.map((state, i) => {
    if (subscriptions.free) {
      if (state.reverse) {
        state.rad = state.rad > Math.PI * 2
          ? state.rad - Math.PI * 2
          : state.rad + state.radAcc
      } else {
        state.rad = state.rad < 0
          ? Math.PI * 2 - state.rad
          : state.rad - state.radAcc
      }
    } else {
      state.rad = state.rad - state.rad / 10
    }

    state.points.forEach((point, j) => {
      point[0] = point[0] + (subscriptions.points[i][j][0] - point[0]) / 10
      point[1] = point[1] + (subscriptions.points[i][j][1] - point[1]) / 10
    })

    state.acceleration = state.acceleration + 0.01
    state.velocity = state.velocity + state.acceleration
    state.color = subscriptions.colors[i]

    return state
  })
}

const render = (context, states) => {
  const {width, height} = context.canvas
  context.save()
  context.translate(width / 2, height / 2)
  forEach(context, states)
  context.restore()
}

const forEach = (context, state, i = 0) => {
  if (state.length - 1 < i) return
  const center = [
    state[i].points.map(point => point[0]).reduce((a, b) => a + b) / 3,
    state[i].points.map(point => point[1]).reduce((a, b) => a + b) / 3
  ]
  context.save()
  context.translate(center[0], center[1])
  context.lineWidth = 0.3
  context.strokeStyle = '#485859'
  context.fillStyle = state[i].color
  context.rotate((state[i].rad * Math.PI) / 180)
  context.beginPath()
  context.moveTo(state[i].points[0][0] - center[0], state[i].points[0][1] - center[1])
  context.lineTo(state[i].points[1][0] - center[0], state[i].points[1][1] - center[1])
  context.lineTo(state[i].points[2][0] - center[0], state[i].points[2][1] - center[1])
  context.closePath()
  context.fill()
  context.stroke()
  context.restore()
  forEach(context, state, i + 1)
}

const animationFrame = (context, _states, updates, subscription) => {
  const {width, height} = context.canvas
  context.clearRect(0, 0, width, height)
  const states = updates(context, _states, subscription)
  render(context, states)
  requestAnimationFrame(animationFrame.bind(null, context, states, updates, subscription))
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('2d')
  const states = model(context)
  const subscription = createSubscription(context)
  animationFrame(context, states, update, subscription)
}

window.addEventListener('load', main)

const createSubscription = (context) => {
  const states = {
    free: 0,
    points: generateSamplePoints(),
    colors: generateSampleColors()
  }
  window.addEventListener('click', () => {
    if (states.free) {
      states.free = false
      states.points = generateSamplePoints(context)
    } else {
      states.free = true
      states.points = generateFreePoints(context, 52)
    }
  })
  return states
}

const generateSamplePoints = () => {
  return [
    '278.13,147.562 282.331,110.2 350.28,178.845',
    '282.108,110.2 353.899,131.758 350.058,178.845',
    '250.498,134.377 282.331,110.2 278.13,147.562',
    '354.122,241.483 278.13,147.562 350.28,178.845',
    '354.122,241.483 350.28,178.845 416.896,155.492',
    '385.509,198.488 416.896,155.492 458.612,177.512',
    '416.896,155.492 458.612,157.281 458.612,177.512',
    '458.612,157.281 492.648,189.875 458.612,177.512',
    '492.648,189.875 473.031,196.515 458.612,177.512',
    '492.648,189.875 473.031,196.515 494.157,225.79',
    '494.157,225.79 473.031,196.515 473.031,228.988',
    '468.655,253.933 473.031,228.988 435.306,259.893',
    '468.655,253.933 494.157,225.79 473.031,228.988',
    '473.031,196.515 473.031,228.988 393.719,234.844',
    '473.031,228.988 435.306,259.893 393.719,234.844',
    '393.719,234.844 385.509,198.488 473.031,196.515',
    '458.612,177.512 473.031,196.515 385.509,198.488',
    '354.122,241.483 385.509,198.488 398.493,255.987',
    '398.493,255.987 393.719,234.844 435.306,259.893',
    '215.293,199.533 250.498,134.377 278.13,147.562',
    '215.293,199.533 215.293,134.377 250.498,134.377',
    '215.293,199.533 162.779,212.51 215.293,134.377',
    '221.329,255.064 162.779,212.51 215.293,199.533',
    '250.498,302.749 211.068,302.749 221.329,255.064',
    '221.329,255.064 211.068,302.749 162.779,212.51',
    '215.293,199.533 278.13,147.562 318.003,196.515',
    '221.329,255.064 215.293,199.533 354.122,241.483',
    '250.498,302.749 221.329,255.064 354.122,241.483',
    '215.293,199.533 318.003,196.515 354.122,241.483',
    '135.919,115.632 168.514,91.186 215.293,134.377',
    '135.919,142.341 135.919,115.632 215.293,134.377',
    '162.779,212.51 135.919,142.341 215.293,134.377',
    '111.263,257.63 92.761,161.506 135.919,142.341',
    '162.779,212.51 111.263,257.63 135.919,142.341',
    '211.068,302.749 111.263,257.63 162.779,212.51',
    '211.068,302.749 121.3,311.199 111.263,257.63',
    '121.3,311.199 79.331,299.731 106.878,234.844',
    '106.878,234.844 57.451,182.028 92.761,161.506',
    '106.878,234.844 73.677,234.844 57.451,182.028',
    '106.878,234.844 79.331,299.731 73.677,234.844',
    '145.275,359.639 121.3,311.199 211.068,302.749',
    '179.68,375.86 145.275,359.639 175.606,332.891',
    '179.68,375.86 175.606,332.891 193.337,344.05',
    '193.337,344.05 175.606,332.891 211.068,302.749',
    '73.677,234.844 20.027,214.925 57.451,182.028',
    '73.677,234.844 42.662,284.415 20.027,214.925',
    '42.662,284.415 5.843,255.064 20.027,214.925',
    '79.331,299.731 42.662,284.415 73.677,234.844',
    '344.464,284.415 250.498,302.749 354.122,241.483',
    '277.239,320.706 250.498,302.749 344.464,284.415',
    '313.76,320.706 277.239,320.706 344.464,284.415',
    '39.458,231.907 39.458,215.063 52.018,224.582'
  ].map(line => {
    return line
    .split(' ')
    .map(str => {
      const n = str.split(',')
      return new Float32Array([
        n[0] - 260,
        n[1] - 200
      ])
    })
  })
}

const generateFreePoints = (context, n) => {
  const {width} = context.canvas
  return Array
  .from(new Array(n).keys())
  .map(point => {
    const r = width * Math.random() / 4
    const rad = Math.PI * 2 * Math.random()
    return new Float32Array([
      r * Math.sin(rad),
      r * Math.cos(rad)
    ])
  })
  .map(point => [
    new Float32Array([point[0], point[1]]),
    new Float32Array([point[0] + 5, point[1] + 15 + Math.random() * 5]),
    new Float32Array([point[0] + 15 + Math.random() * 5, point[1] + 5])
  ])
}

const generateSampleColors = () => {
  return [
    'DB5126',
    '171618',
    'BC341E',
    'E55F1C',
    'FFF5F5',
    'BC341E',
    '171618',
    '382921',
    '171618',
    '3D3A38',
    '382921',
    'DB5126',
    '171618',
    'EA833D',
    'DB5C38',
    'E2692B',
    'E55F1C',
    'F5F7F7',
    'E2EDEC',
    'EAA86C',
    'FFF5F5',
    'F9F9F9',
    'EDF2F2',
    'E2EDEC',
    'F5F7F7',
    'F28941',
    'FF7733',
    'DB5C38',
    'E2692B',
    '171618',
    'BC341E',
    'DB5126',
    'EAA86C',
    'F28941',
    'E2692B',
    'DB5C38',
    'DB5126',
    'F9F9F9',
    'F7F5F5',
    'F5F7F7',
    'BC341E',
    '171618',
    '382921',
    'DB5126',
    'F28941',
    'FF7733',
    'E2692B',
    'E55F1C',
    'DB5126',
    'BC341E',
    '171618',
    '171618'
  ].map(color => '#' + color)
}

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

const createRandomColor = () => {
  return rgb(
    parseInt(Math.random() * 255),
    parseInt(Math.random() * 255),
    parseInt(Math.random() * 255)
  )
}

const rgb = (r, g, b) => {
  return 'rgba(' + r + ',' + g + ',' + b + ',1)'
}
