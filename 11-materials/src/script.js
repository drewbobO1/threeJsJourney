import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';


/**
 * Debug GUI
 */
const gui = new GUI();

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
const matcapOneTexture = textureLoader.load("./textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");


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
// const normalMaterial = new THREE.MeshNormalMaterial();
// normalMaterial.flatShading = true;

// === MeshMatcapMaterial ===
// const matcapMaterial = new THREE.MeshMatcapMaterial();
// matcapMaterial.matcap = matcapOneTexture;

// === MeshDepthMaterial ===
// const depthMaterial = new THREE.MeshDepthMaterial();

// === MeshLambertMaterial ===
// const lambertMaterial = new THREE.MeshLambertMaterial();

// === MeshPhongMaterial ===
// const phongMaterial = new THREE.MeshPhongMaterial();
// phongMaterial.shininess = 100;
// phongMaterial.specular = new THREE.Color("#e57316");

// === MeshToonMaterial ===
// const toonMaterial = new THREE.MeshToonMaterial();
// toonMaterial.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// // Can disable mipmapping since NearestFilter doesn't ever use mipmapped versions of the texture
// gradientTexture.generateMipmaps = false;

// === MeshStandardMaterial ===
const standardMaterial = new THREE.MeshStandardMaterial();

gui.add(standardMaterial, "metalness", 0, 3, .1);
gui.add(standardMaterial, "roughness", -1, 1, .1);



const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16), 
    standardMaterial
);
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1), 
    standardMaterial
);
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32), 
    standardMaterial
);

sphereMesh.position.x = -1.5;
torusMesh.position.x = 1.5;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Lights!!!!!!
 * For MeshLambertMaterial (which requires lights to be visible)
 */
const ambientLight = new THREE.AmbientLight(new THREE.Color("#00ffff"), 1);
const pointLight = new THREE.PointLight(new THREE.Color("#ff00ff"), 40);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(ambientLight, pointLight);

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