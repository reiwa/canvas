const N = 10000

setTimeout(() => {
  const now = performance.now()
  for (let i = 0; i < N; ++i) {
    const array = new Int16Array([1, 1, 1, 1])
  }
  console.log('create typedArray 4', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  for (let i = 0; i < N; ++i) {
    const array = int16Array(1, 1, 1, 1)
  }
  console.log('create typedArray 4 fast', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  for (let i = 0; i < N; ++i) {
    const array = [1, 1, 1, 1]
  }
  console.log('create Array 4', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  for (let i = 0; i < N; ++i) {
    const array = new Int16Array(1000)
  }
  console.log('create typedArray', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  for (let i = 0; i < N; ++i) {
    const array = []
    for (let i = 0; i < 1000; ++i) {
      array.push(null)
    }
  }
  console.log('create Array', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  const array = new Int16Array(N)
  for (let i = 0; i < N; ++i) {
    array[i] = i
  }
  console.log('update typedArray', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  const array = []
  for (let i = 0; i < N; ++i) {
    array.push(null)
  }
  for (let i = 0; i < N; ++i) {
    array[i] = i
  }
  console.log('update array', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  const object = {a: 0, b: 0, c: 0}
  for (let i = 0; i < N; ++i) {
    object.a = 10
    object.b = 10
    object.c = 10
  }
  console.log('update object', performance.now() - now)
})

setTimeout(() => {
  const now = performance.now()
  const object = {a: 0, b: 0}
  for (let i = 0; i < N; ++i) {
    const next = {
      a: 10,
      b: 10,
      c: 10
    }
  }
  console.log('update object fast', performance.now() - now)
})

function int16Array () {
  const array = new Int16Array(arguments.length)
  for (let i = arguments.length; i < arguments.length; ++i) {
    array[i] = arguments[i]
  }
  return array
}
