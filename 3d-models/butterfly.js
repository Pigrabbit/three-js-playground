import * as THREE from '../node_modules/three/build/three.module.js'

let camera, scene, renderer, butterfly
let step = 0.02

function createButterfly() {
  const geometry = new THREE.Geometry()
  geometry.vertices.push(new THREE.Vector3(0, 0, 0)) // vertices[0]
  geometry.vertices.push(new THREE.Vector3(0, 0, 2)) // vertices[1]
  geometry.vertices.push(new THREE.Vector3(0, 1.5, 1)) // vertices[2]
  geometry.vertices.push(new THREE.Vector3(0, -1.5, 1)) // vertices[3]

  geometry.faces.push(new THREE.Face3(0, 1, 2))
  geometry.faces.push(new THREE.Face3(0, 1, 3))

  const material = new THREE.MeshBasicMaterial({
    color: 0x00a2f0,
    side: THREE.DoubleSide,
  })

  butterfly = new THREE.Mesh(geometry, material)
  scene.add(butterfly)
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xababab)

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.x = 1.5
  camera.position.y = 1
  camera.position.z = 10
  camera.rotation.z -= 135

  const axes = new THREE.AxesHelper(5)
  scene.add(axes)

  createButterfly()

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

function mainLoop() {
  if (butterfly.geometry.vertices[2].y < 0) {
    step *= -1
  } else if (butterfly.geometry.vertices[2].z < 0) {
    step *= -1
  }
  butterfly.geometry.vertices[2].y -= step
  butterfly.geometry.vertices[2].z += 2*step

  butterfly.geometry.vertices[3].y += step
  butterfly.geometry.vertices[3].z += 2*step

  butterfly.geometry.verticesNeedUpdate = true

  renderer.render(scene, camera)
  requestAnimationFrame(mainLoop)
}

init()
mainLoop()
