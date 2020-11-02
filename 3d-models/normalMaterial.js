import * as THREE from '../node_modules/three/build/three.module.js'


let camera, scene, renderer, cube
let step = 0.02

function createGeometry() {
  const geometry = new THREE.BoxGeometry(5, 5, 5)
  const material = new THREE.MeshNormalMaterial()

  cube = new THREE.Mesh(geometry, material)
  
  scene.add(cube)
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30
  createGeometry()

  renderer = new THREE.WebGL1Renderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

function mainLoop() {
  cube.rotation.x += step
  cube.rotation.y += step

  renderer.render(scene, camera)
  requestAnimationFrame(mainLoop)
}

init()
mainLoop()
