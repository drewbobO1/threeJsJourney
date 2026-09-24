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
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
const matcapOneTexture = textureLoader.load("./textures/gradients/3.jpg");
const gradientOneTexture = textureLoader.load("./textures/matcaps/1.png");


loadingManager.onProgress = (url) => {
    console.log("Loaded:", url);
}
loadingManager.onError = (e) => {
    console.log("Error loading:", e);
}
loadingManager.onLoad = () => {
    console.log("Everything loaded!");
}

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapOneTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Meshes
 */
// === MeshBasicMaterial ===
// const basicMaterial = new THREE.MeshBasicMaterial();
// basicMaterial.map = doorColorTexture;                   // Better, cleaner way of setting map texture.
// basicMaterial.color = new THREE.Color("#049ef4");
// basicMaterial.wireframe = true;
// basicMaterial.transparent = true;
// basicMaterial.opacity = 0.5;
// basicMaterial.alphaMap = doorAlphaTexture;
// basicMaterial.side = THREE.DoubleSide;

// === MeshNormalMaterial ===
const normalMaterial = new THREE.MeshNormalMaterial();
normalMaterial.flatShading = true;

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16), 
    normalMaterial
);
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1), 
    normalMaterial
);
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32), 
    normalMaterial
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