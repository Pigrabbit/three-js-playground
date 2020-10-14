import * as THREE from '../node_modules/three/build/three.module.js'

let camera, scene, renderer, planet
let planetRings = []
let step = 0.2

function createPlanet({ radius, color, widthSegments = 30, heightSegments = 30 }) {
  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
  const material = new THREE.MeshBasicMaterial({ color })
  planet = new THREE.Mesh(geometry, material)
  scene.add(planet)
}

function createRing({ radius, tube, color, radialSegments = 2, tubularSegments = 100 }) {
  const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)
  const material = new THREE.MeshBasicMaterial({ color })
  const torus = new THREE.Mesh(geometry, material)
  torus.rotation.x -= 30
  torus.rotation.y += 60
  scene.add(torus)
  planetRings.push(torus)
}

function createSaturn({ planetRadius, planetColor, rings }) {
  createPlanet({ radius: planetRadius, color: planetColor })
  rings.forEach((ring) => createRing({ radius: ring.radius, tube: ring.tube, color: ring.color }))
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.z = 80

  const rings = [
    {
      radius: 8,
      tube: 1,
      color: 0xFFE2A0
    },
    {
      radius: 11,
      tube: 1,
      color: 0xFFB05F
    },
    {
      radius: 14,
      tube: 1,
      color: 0xF0BF84
    }
  ]
  const planetRadius = 5
  const planetColor = 0x935623

  createSaturn({ planetRadius, planetColor, rings})

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

function mainLoop() {
  if (Math.abs(planet.position.y) > 10) {
    step = -1 * step
  }
  planet.position.y -= step
  planetRings.forEach(ring => ring.position.y -= step)

  renderer.render(scene, camera)
  requestAnimationFrame(mainLoop)
}

init()
mainLoop()
