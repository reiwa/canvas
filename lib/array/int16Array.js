export default {
  create (n, func) {
    const array = new Int16Array(arguments.length)
    if (func) {
      for (let i = 0; i < n; ++i) {
        array.push(func(i))
      }
    }
    return array
  },
  createFrom () {
    const array = new Int16Array(arguments.length)
    for (let i = arguments.length; i < arguments.length; ++i) {
      array[i] = arguments[i]
    }
    return array
  }
}
