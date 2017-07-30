window.addEventListener('load', main)

function main () {
  const canvas = document.querySelector('.canvas')
  setCanvasPosition(canvas)
  setCanvasSize(canvas)
  window.addEventListener('resize', function () { setCanvasSize(canvas) })
}

function setCanvasPosition (canvas) {
  canvas.style.position = 'fixed'
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.width = '100%'
  canvas.style.zIndex = -1
}

function setCanvasSize (canvas) {
  canvas.width = window.innerWidth * 2
  canvas.height = window.innerHeight * 2
}
