import * as THREE from '../node_modules/three/build/three.module.js'


let camera, scene, renderer, cylinder, sphere
let step = 0.02

function createGeometry() {
  let material = new THREE.PointsMaterial({color: 0xffffff})
  let geometry = new THREE.CylinderGeometry(3, 2, 4)

  cylinder = new THREE.Line(geometry, material)
  cylinder.position.z = -10
  cylinder.position.x = -5

  // geometry.computeLineDistances()
  cylinder.computeLineDistances()

  geometry = new THREE.SphereGeometry(3, 30, 30)
  sphere = new THREE.Line(geometry, material)
  sphere.position.z = 0
  sphere.position.x = 5

  // geometry.computeLineDistances()
  sphere.computeLineDistances()
  
  scene.add(cylinder)
  scene.add(sphere)
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xababab)

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 30
  createGeometry()

  renderer = new THREE.WebGL1Renderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

function mainLoop() {
  cylinder.rotation.y += step
  renderer.render(scene, camera)
  requestAnimationFrame(mainLoop)
}

init()
mainLoop()
