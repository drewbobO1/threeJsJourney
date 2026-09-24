import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Meshes
 */
const basicMaterial = new THREE.MeshBasicMaterial();
basicMaterial.color.set("#049ef4");

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16), 
    basicMaterial
);
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1), 
    basicMaterial
);
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32), 
    basicMaterial
);

sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Rotate meshes for sake of viewing material change(s)
    sphereMesh.rotation.y = elapsedTime * 0.1;
    planeMesh.rotation.y = elapsedTime * 0.1;
    torusMesh.rotation.y = elapsedTime * 0.1;

    sphereMesh.rotation.x = elapsedTime * - 0.15;
    planeMesh.rotation.x = elapsedTime * - 0.15;
    torusMesh.rotation.x = elapsedTime * - 0.15;
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()