import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { materialAO } from 'three/src/nodes/accessors/MaterialNode.js';
// console.log(RGBELoader);


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

// // === MeshStandardMaterial ===
// const standardMaterial = new THREE.MeshStandardMaterial();
// standardMaterial.metalness = 1;
// standardMaterial.roughness = 1;
// standardMaterial.map = doorColorTexture;
// standardMaterial.aoMap = doorAmbientTexture;
// standardMaterial.aoMapIntensity = 1;
// standardMaterial.displacementMap = doorHeightTexture;
// standardMaterial.displacementScale = 0.1;
// standardMaterial.metalnessMap = doorMetalnessTexture;
// standardMaterial.roughnessMap = doorRoughnessTexture;
// standardMaterial.normalMap = doorNormalTexture;
// standardMaterial.normalScale.set(0.5, 0.5);
// standardMaterial.transparent = true;
// standardMaterial.alphaMap = doorAlphaTexture;

// gui.add(standardMaterial, "metalness").min(0).max(1).step(0.0001);
// gui.add(standardMaterial, "roughness").min(0).max(1).step(0.0001);

// === MeshPhysicalMaterial ===
const physicalMaterial = new THREE.MeshPhysicalMaterial();
physicalMaterial.metalness = 0;
physicalMaterial.roughness = 0;
// physicalMaterial.map = doorColorTexture;
// physicalMaterial.aoMap = doorAmbientTexture;
// physicalMaterial.aoMapIntensity = 1;
// physicalMaterial.displacementMap = doorHeightTexture;
// physicalMaterial.displacementScale = 0.1;
// physicalMaterial.metalnessMap = doorMetalnessTexture;
// physicalMaterial.roughnessMap = doorRoughnessTexture;
// physicalMaterial.normalMap = doorNormalTexture;
// physicalMaterial.normalScale.set(0.5, 0.5);
// physicalMaterial.transparent = true;
// physicalMaterial.alphaMap = doorAlphaTexture;

gui.add(physicalMaterial, "metalness").min(0).max(1).step(0.0001);
gui.add(physicalMaterial, "roughness").min(0).max(1).step(0.0001);

// Clearcoat
physicalMaterial.clearcoat = 1;
physicalMaterial.clearcoatRoughness = 0;

gui.add(physicalMaterial, "clearcoat").min(0).max(1).step(0.0001);
gui.add(physicalMaterial, "clearcoatRoughness").min(0).max(1).step(0.0001);

// Sheen
// physicalMaterial.sheen = 1;
// physicalMaterial.sheenRoughness = 0.25;
// physicalMaterial.sheenColor.set(new THREE.Color("#f4a30c"));

// gui.add(physicalMaterial, "sheen").min(0).max(1).step(0.0001);
// gui.add(physicalMaterial, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(physicalMaterial, "sheenColor");

// // Iridescence
// physicalMaterial.iridescence = 1;
// physicalMaterial.iridescenceIOR = 1;
// physicalMaterial.iridescenceThicknessRange = [ 100, 800 ];

// gui.add(physicalMaterial, "iridescence").min(0).max(1).step(0.0001);
// // Max of 2.333 is important here. Anything higher will start to create things that don't actually exist (or exist in real life).
// gui.add(physicalMaterial, "iridescenceIOR").min(1).max(2.333).step(0.0001);
// gui.add(physicalMaterial.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
// gui.add(physicalMaterial.iridescenceThicknessRange, '1').min(1).max(1000).step(1);

// Transmission
physicalMaterial.transmission = 1;
physicalMaterial.ior = 1.5;
physicalMaterial.thickness = 0.5;

gui.add(physicalMaterial, "transmission").min(0).max(1).step(0.0001);
gui.add(physicalMaterial, "ior").min(1).max(10).step(0.0001);
gui.add(physicalMaterial, "thickness").min(0).max(1).step(0.0001);



const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), 
    physicalMaterial
);
const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), 
    physicalMaterial
);
const torusMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128), 
    physicalMaterial
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

// scene.add(ambientLight, pointLight);

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = envMap;
    scene.environment = envMap;
});

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