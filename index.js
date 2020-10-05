import * as THREE from '../node_modules/three/build/three.module.js'

let camera, scene, renderer, cube
let step = 0.2

function buildCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1)
  let material = new THREE.MeshBasicMaterial({ color: 0xff9631 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

function buildEdge() {
  let geometry = new THREE.EdgesGeometry(cube.geometry)
  let material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
  let edges = new THREE.LineSegments(geometry, material)
  cube.add(edges)
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xababab)

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 8
  camera.position.x = 1
  camera.position.y = 1

  buildCube()
  buildEdge()

  const axes = new THREE.AxesHelper(5)
  scene.add(axes)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

function rotateCubeY() {
  cube.rotation.y -= step
}

function mainLoop() {
  rotateCubeY();

  renderer.render(scene, camera)
  requestAnimationFrame(mainLoop)
}

init()
mainLoop()
