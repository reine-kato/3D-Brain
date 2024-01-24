//import three.js library, orbit controls, and gltf loader
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// create three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe5f3fd);

// create camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 0;
camera.position.z = 27;

// keep brain on a global variable to access later
let object;

// allow orbit controls
let controls;

// loader for .gltf file
const loader = new GLTFLoader();

// load brain and scale
loader.load(
  'models/brain/scene.gltf', 
  function (gltf) {
    //If loaded, add to scene
    object = gltf.scene;
    object.scale.set(6,6,6);
    object.position.x = -5
    object.position.y = -15
    object.position.z = 0
    scene.add(object);
  },
  undefined, // if error
  function (error) {
    console.error("An error occurred while loading the model:", error);
  }
);

// create renderer and set size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// add renderer to dom
document.getElementById("container3D").appendChild(renderer.domElement);

// lights
function createLight(color, intensity, position) {
  const light = new THREE.PointLight(color, intensity);
  light.position.set(...position);
  scene.add(light);
}
createLight(0xfdfbf2, 1, [0, 200, 0]); // top
createLight(0xfdfbf2, 0.8, [5, 10, -50]); // left
createLight(0xfdfbf2, 0.8, [5, 10, 50]); // right
createLight(0xfdfbf2, 0.4, [0, -100, 0]); // bottom
createLight(0xfdfbf2, 0.9, [100, -10, 0]); // front
createLight(0xfdfbf2, 0.8, [-100, 0, 0]); // back
createLight(0xfdfbf2, 0.5, [-40, -50, -50]); // bottom-back-left
createLight(0xfdfbf2, 0.5, [-40, -50, 50]); // bottom-back-right
createLight(0xfdfbf2, 0.15, [50, -50, -70]); // bottom-front-left
createLight(0xfdfbf2, 0.15, [50, -50, 70]); // bottom-front-right

// add orbit control
controls = new OrbitControls(camera, renderer.domElement);

// Event listener for the button
document.getElementById('toggleSeeInsideButton').addEventListener('click', function() {
  toggleMeshVisibility('right_cerebral_hemisphere');
})

// Function to toggle visibility of a specific mesh
function toggleMeshVisibility(meshName) {
  if (scene.getObjectByName(meshName)) {
      const mesh = scene.getObjectByName(meshName);
      mesh.visible = !mesh.visible;  // Toggle visibility
  } else {
      console.warn(`Mesh with name ${meshName} not found in the scene.`);
  }
}

// render scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// add listener to window, to resize window and camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// start rendering
animate();