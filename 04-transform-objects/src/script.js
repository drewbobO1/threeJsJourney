import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

const cubesEtcGroup = new THREE.Group();
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ffff })
);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

cube1.position.x = -2;
cube2.position.set(0, 2, 0);
cube3.position.set(2, 1, 0);

cubesEtcGroup.add(cube1);
cubesEtcGroup.add(cube2);
cubesEtcGroup.add(cube3);

cubesEtcGroup.position.y = -2;
cubesEtcGroup.scale.y = 2;
cubesEtcGroup.rotation.y = 1;

scene.add(cubesEtcGroup);


// Set mesh (object) position
// mesh.position.set(0, -2, -4);

// Change mesh (object) scale
// mesh.scale.x = 10;
// mesh.scale.y = .5;
// mesh.scale.z = 2;

// mesh.scale.set(5, .5, 1);

// Rotating mesh
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.z = Math.PI * 0.25;

// Axes helper (visualizer)
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;

// camera.lookAt(mesh.position);

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)