export default createModel(20)

function createModel (n) {
  return Array
  .from(new Array(n).keys())
  .map(() => {
    return {
      x: Array
      .from(new Array(10).keys())
      .map((point, i) => window.innerWidth * Math.random()),
      y: Array
      .from(new Array(10).keys())
      .map((point, i) => window.innerHeight * Math.random()),
      xx: window.innerWidth * Math.random(),
      yy: window.innerHeight * Math.random(),
      rots: Array
      .from(new Array(10).keys())
      .map(rot => 0),
      pct: 0,
      angle: 0
    }
  })
}
