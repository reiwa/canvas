const mat4 = {
  create () {
    return new Float32Array(16)
  },
  identity (ref) {
    ref[0] = 1
    ref[1] = 0
    ref[2] = 0
    ref[3] = 0
    ref[4] = 0
    ref[5] = 1
    ref[6] = 0
    ref[7] = 0
    ref[8] = 0
    ref[9] = 0
    ref[10] = 1
    ref[11] = 0
    ref[12] = 0
    ref[13] = 0
    ref[14] = 0
    ref[15] = 1
  },
  multiply (mat1, mat2, ref) {
    const a = mat1[0]
    const b = mat1[1]
    const c = mat1[2]
    const d = mat1[3]
    const e = mat1[4]
    const f = mat1[5]
    const g = mat1[6]
    const h = mat1[7]
    const i = mat1[8]
    const j = mat1[9]
    const k = mat1[10]
    const l = mat1[11]
    const m = mat1[12]
    const n = mat1[13]
    const o = mat1[14]
    const p = mat1[15]
    const A = mat2[0]
    const B = mat2[1]
    const C = mat2[2]
    const D = mat2[3]
    const E = mat2[4]
    const F = mat2[5]
    const G = mat2[6]
    const H = mat2[7]
    const I = mat2[8]
    const J = mat2[9]
    const K = mat2[10]
    const L = mat2[11]
    const M = mat2[12]
    const N = mat2[13]
    const O = mat2[14]
    const P = mat2[15]
    ref[0] = A * a + B * e + C * i + D * m
    ref[1] = A * b + B * f + C * j + D * n
    ref[2] = A * c + B * g + C * k + D * o
    ref[3] = A * d + B * h + C * l + D * p
    ref[4] = E * a + F * e + G * i + H * m
    ref[5] = E * b + F * f + G * j + H * n
    ref[6] = E * c + F * g + G * k + H * o
    ref[7] = E * d + F * h + G * l + H * p
    ref[8] = I * a + J * e + K * i + L * m
    ref[9] = I * b + J * f + K * j + L * n
    ref[10] = I * c + J * g + K * k + L * o
    ref[11] = I * d + J * h + K * l + L * p
    ref[12] = M * a + N * e + O * i + P * m
    ref[13] = M * b + N * f + O * j + P * n
    ref[14] = M * c + N * g + O * k + P * o
    ref[15] = M * d + N * h + O * l + P * p
  },
  lookAt (eye, center, up, ref) {
    const eyeX = eye[0]
    const eyeY = eye[1]
    const eyeZ = eye[2]
    const upX = up[0]
    const upY = up[1]
    const upZ = up[2]
    const centerX = center[0]
    const centerY = center[1]
    const centerZ = center[2]
    if (eyeX === centerX && eyeY === centerY && eyeZ === centerZ) {
      this.identity(ref)
      return
    }
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, l
    z0 = eyeX - center[0]
    z1 = eyeY - center[1]
    z2 = eyeZ - center[2]
    l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2)
    z0 *= l
    z1 *= l
    z2 *= l
    x0 = upY * z2 - upZ * z1
    x1 = upZ * z0 - upX * z2
    x2 = upX * z1 - upY * z0
    l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2)
    if (!l) {
      x0 = 0
      x1 = 0
      x2 = 0
    } else {
      l = 1 / l
      x0 *= l
      x1 *= l
      x2 *= l
    }
    y0 = z1 * x2 - z2 * x1
    y1 = z2 * x0 - z0 * x2
    y2 = z0 * x1 - z1 * x0
    l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2)
    if (!l) {
      y0 = 0
      y1 = 0
      y2 = 0
    } else {
      l = 1 / l
      y0 = y0 * l
      y1 = y1 * l
      y2 = y2 * l
    }
    ref[0] = x0
    ref[1] = y0
    ref[2] = z0
    ref[3] = 0
    ref[4] = x1
    ref[5] = y1
    ref[6] = z1
    ref[7] = 0
    ref[8] = x2
    ref[9] = y2
    ref[10] = z2
    ref[11] = 0
    ref[12] = -1 * (x0 * eyeX + x1 * eyeY + x2 * eyeZ)
    ref[13] = -1 * (y0 * eyeX + y1 * eyeY + y2 * eyeZ)
    ref[14] = -1 * (z0 * eyeX + z1 * eyeY + z2 * eyeZ)
    ref[15] = 1
  },
  perspective (fovy, aspect, near, far, ref) {
    const t = near * Math.tan(fovy * Math.PI / 360)
    const r = t * aspect
    const a = r * 2
    const b = t * 2
    const c = far - near
    ref[0] = near * 2 / a
    ref[1] = 0
    ref[2] = 0
    ref[3] = 0
    ref[4] = 0
    ref[5] = near * 2 / b
    ref[6] = 0
    ref[7] = 0
    ref[8] = 0
    ref[9] = 0
    ref[10] = -1 * (far + near) / c
    ref[11] = -1
    ref[12] = 0
    ref[13] = 0
    ref[14] = -1 * (far * near * 2) / c
    ref[15] = 0
  }
}

// mat4: Copyright (c) doxas

const qtn4 = {
  create () {
    return new Float32Array(4)
  },
  identity (ref) {
    ref[0] = 0
    ref[1] = 0
    ref[2] = 0
    ref[3] = 1
  },
  toMat4 (qtn, ref) {
    const x = qtn[0]
    const y = qtn[1]
    const z = qtn[2]
    const w = qtn[3]
    const x2 = x + x
    const y2 = y + y
    const z2 = z + z
    const xx = x * x2
    const xy = x * y2
    const xz = x * z2
    const yy = y * y2
    const yz = y * z2
    const zz = z * z2
    const wx = w * x2
    const wy = w * y2
    const wz = w * z2
    ref[0] = 1 - (yy + zz)
    ref[1] = xy - wz
    ref[2] = xz + wy
    ref[3] = 0
    ref[4] = xy + wz
    ref[5] = 1 - (xx + zz)
    ref[6] = yz - wx
    ref[7] = 0
    ref[8] = xz - wy
    ref[9] = yz + wx
    ref[10] = 1 - (xx + yy)
    ref[11] = 0
    ref[12] = 0
    ref[13] = 0
    ref[14] = 0
    ref[15] = 1
  }
}

// qtn4: Copyright (c) doxas

const mMatrix = mat4.create()
mat4.identity(mMatrix)

const vMatrix = mat4.create()
mat4.identity(vMatrix)

const pMatrix = mat4.create()
mat4.identity(pMatrix)

const tmpMatrix = mat4.create()
mat4.identity(tmpMatrix)

const mvpMatrix = mat4.create()
mat4.identity(mvpMatrix)

const quaternion = qtn4.create()
qtn4.identity(quaternion)

const quaternionMatrix = mat4.create()
mat4.identity(quaternionMatrix)

qtn4.toMat4(quaternion, quaternionMatrix)

const model = (context) => {
  return {
    rad: 0,
    r: 1,
    color: {
      attribLocation: null,
      data: new Float32Array([0, 145 / 256, 234 / 256, 1]),
      size: 4,
      buffer: null
    },
    position: {
      attribLocation: null,
      data: new Float32Array([0, 0, 0]),
      size: 3,
      buffer: null
    },
    uniformLocation: {
      mvpMatrix: null,
      pointSize: null
    }
  }
}

const update = (context, state) => {
  state.rad = state.rad > Math.PI * 2
    ? state.rad - Math.PI * 2
    : state.rad + Math.PI / 100

  state.position.data[0] = state.r * Math.sin(state.rad)
  state.position.data[1] = state.r * Math.cos(state.rad)

  return state
}

const render = (context, state) => {
  const {width, height} = context.canvas

  const cameraPosition = [0.0, 5.0, 10.0]
  mat4.lookAt(cameraPosition, [0, 0, 0], [0, 1, 0], vMatrix)
  mat4.multiply(vMatrix, quaternionMatrix, vMatrix)
  mat4.perspective(45, width / height, 0.1, 100, pMatrix)
  mat4.multiply(pMatrix, vMatrix, tmpMatrix)

  // update data
  context.bindBuffer(context.ARRAY_BUFFER, state.position.buffer)
  context.vertexAttribPointer(state.position.attribLocation, state.position.size, context.FLOAT, false, 0, 0)
  context.bufferSubData(context.ARRAY_BUFFER, 0, state.position.data)

  mat4.identity(mMatrix)
  mat4.multiply(tmpMatrix, mMatrix, mvpMatrix)

  context.uniformMatrix4fv(state.uniformLocation.mvpMatrix, false, mvpMatrix)
  context.uniform1f(state.uniformLocation.pointSize, 10)
  context.drawArrays(context.POINTS, 0, state.position.data.length / 3)

  context.flush()
}

const animationFrame = (context, _state, update) => {
  context.clearColor(0.0, 0.0, 0.0, 0.0)
  context.clearDepth(1.0)
  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT)
  const state = update(context, _state)
  render(context, state)
  requestAnimationFrame(animationFrame.bind(null, context, state, update))
}

const main = () => {
  const canvas = document.querySelector('.canvas')
  const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

  // vertex shader
  const vertexShaderText = `
  attribute vec3 position;
  attribute vec4 color;
  uniform mat4 mvpMatrix;
  uniform float pointSize;
  varying vec4 vColor;
  
  void main(void){
    vColor = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
    gl_PointSize = pointSize;
  }`
  const vertexShader = context.createShader(context.VERTEX_SHADER)
  context.shaderSource(vertexShader, vertexShaderText)
  context.compileShader(vertexShader)

  // fragment shader
  const fragmentShaderText = `
  precision mediump float;
  varying vec4 vColor;
  
  void main (void) {
    gl_FragColor = vColor;
  }`
  const fragmentShader = context.createShader(context.FRAGMENT_SHADER)
  context.shaderSource(fragmentShader, fragmentShaderText)
  context.compileShader(fragmentShader)

  // program
  const program = context.createProgram()
  context.attachShader(program, vertexShader)
  context.attachShader(program, fragmentShader)
  context.linkProgram(program)
  context.useProgram(program)

  const state = model(context)

  // attribLocation
  state.position.attribLocation = context.getAttribLocation(program, 'position')
  state.color.attribLocation = context.getAttribLocation(program, 'color')

  // color buffer
  state.color.buffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, state.color.buffer)
  context.bufferData(context.ARRAY_BUFFER, state.color.data, context.STATIC_DRAW)
  context.enableVertexAttribArray(state.color.attribLocation)
  context.vertexAttribPointer(state.color.attribLocation, state.color.size, context.FLOAT, false, 0, 0)
  context.bindBuffer(context.ARRAY_BUFFER, null)

  // position buffer
  state.position.buffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, state.position.buffer)
  context.enableVertexAttribArray(state.position.attribLocation)
  context.vertexAttribPointer(state.position.attribLocation, state.position.size, context.FLOAT, false, 0, 0)
  context.bufferData(context.ARRAY_BUFFER, state.position.data, context.DYNAMIC_DRAW)
  context.bindBuffer(context.ARRAY_BUFFER, null)

  // uniformLocation
  state.uniformLocation.mvpMatrix = context.getUniformLocation(program, 'mvpMatrix')
  state.uniformLocation.pointSize = context.getUniformLocation(program, 'pointSize')

  animationFrame(context, state, update)
}

window.addEventListener('load', main)
