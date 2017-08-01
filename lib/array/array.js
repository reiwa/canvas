export default {
  create (n, func) {
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
}