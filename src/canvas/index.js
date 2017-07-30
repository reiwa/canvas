window.addEventListener('load', main)

function main () {
  const canvas = document.querySelector('.canvas')
  setCanvasSize(canvas)
  window.addEventListener('resize', () => { setCanvasSize(canvas) })
}

function setCanvasSize (canvas) {
  canvas.width = window.innerWidth * 2
  canvas.height = window.innerHeight * 2
}
