import * as THREE from 'three'
import {GLTFLoader} from './GLTFLoader.js';
import {OrbitControls} from './OrbitControls.js';

const renderer = new THREE.WebGLRender({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

renderer.setClearColor(0xA3A3A3);
 
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 3, 6);
camera.lookAt(scene.position);

const LoadingManager = new THREE.LoadingManager();

const progressBar = document.getElementById('progress-bar');

LoadingManager.onProgress = function (url, loaded, total) {
	progressBar.value = (loaded / total) * 100;
}

const progressBarContainer = document.querySelection('.progress-bar-container');

LoadingManager.onLoad = function() {
	progressBarContainer.style.display = 'none';
}

const loader = new GLTFLoader(loadingManager);
loader.load('./scene.gltf', function(gltf) {
	const model = gltf.scene;
	scene.add(model);
});

function animate () {
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
