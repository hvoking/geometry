import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
import {OrbitControls} from './OrbitControls.js'

// Global Selectors
const canvas = document.querySelector("#page_background");
const gui_container = document.querySelector("#gui_container");
const gui_background = document.querySelector("#gui_background");
let uRange = document.querySelector("#uRange");

// Set the canvas on the html element
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
canvas.width = sizes.width;
canvas.height = sizes.height;
const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setClearColor(0xAAAAAA);

const camera = makeCamera();
camera.position.set(4, 4, 4).multiplyScalar(3);
camera.lookAt(0, 0, 0);

// Create the scene
const scene = new THREE.Scene();

let gui = new GUI({ autoPlace: false });
gui.domElement.id = 'gui';
gui_container.innerHTML = '';
gui_container.appendChild(gui.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

let gui_colors = new GUI({ autoPlace: false });
gui_colors.domElement.id = 'gui_colors';
gui_background.innerHTML = '';
gui_background.appendChild(gui_colors.domElement);

const guiBackgroundColor = {
	color: 0xAAAAAA
}
gui_colors.addColor(guiBackgroundColor, 'color')
	.onChange(() => {
		renderer.setClearColor(guiBackgroundColor.color)
	});

// Tracks when the user clicks on the button to select a geometry
document.addEventListener('DOMContentLoaded', () => {
	const selectGeometry = document.querySelectorAll('.geometry');
    selectGeometry.forEach(button => {
        button.onclick = function() {
            const geometry = this.innerHTML;
            // Remembers the url
            const geo = new Geometry(history.state.type, geometry, uRange.value);
            geo.getPoints();
            return false;
        }
    });
	
});

uRange.onchange = () => {
	if (history.state) {
		const example = new Geometry(history.state.type, history.state.geometry,uRange.value);
		example.getPoints();
	}
	else {
		const example = new Geometry("mesh", "Sphere", uRange.value);
		example.getPoints();
	}
}

window.onresize = () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

// Goes back on the the url when the back or forward button is clicked
window.onpopstate = function(event) {
	const example = new Geometry(event.state.type, event.state.geometry, event.state.quantity)
	example.getPoints();
}

class Geometry {
	constructor(type, geometry, quantity) {
		this.type = type
		this.geometry = geometry
		this.quantity = quantity
		this.vectorPoints = []
	}
	getPoints() {	
		clearScene(scene);
		gui.destroy();
		createGui();
		fetch(`/${this.type}/${this.geometry}/${this.quantity}`)
		.then(response => response.json())
		.then(points => {
			const listVectors32 = [];
			const positions = points.Positions;
			positions.forEach(vector => {
				const vectors32 = [];
				vector.forEach(array => {
					vectors32.push(array[0], array[2], array[1]);
				});
				listVectors32.push(Float32Array.from(vectors32));
			});
			listVectors32.forEach(array => {
				const gridPoints = new THREE.BufferGeometry();
				gridPoints.setAttribute( 'position', new THREE.BufferAttribute( array, 3 ));
				this.vectorPoints.push(gridPoints);
			});
			this.createGrid();
		})
		.catch(err => {
			console.log(err);
		});
	}
	createGrid() {
		const group = new THREE.Object3D();
		scene.add(group);
		group.position.set(0, 0, 0);
		if (this.type === "points") {
			const pointMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: false, color: 'aqua' } );
			this.vectorPoints.forEach(array => {
				group.add( new THREE.Points( array, pointMaterial ));
			});
		}
		else if (this.type === "lines") {
			const lineMaterial = new THREE.LineBasicMaterial( { color: 'aqua' } );
			this.vectorPoints.forEach(array => {
				group.add( new THREE.Line( array, lineMaterial ));
			});
		}
		else if (this.type === "mesh") {
			const lineMaterial = new THREE.LineBasicMaterial( { color: 0x221122 } );
			const material = new THREE.MeshBasicMaterial( { color: 0xBBCC00 } );
			material.side = THREE.DoubleSide;
			this.vectorPoints.forEach(array => {
				group.add( new THREE.Mesh( array, material ));
				group.add( new THREE.Line( array, lineMaterial ));
			});
		}
		gui.add(group.scale, "x", 0.1, 2).step(0.1);
	 	gui.add(group.scale, "y", 0.1, 2).step(0.1);
	 	gui.add(group.scale, "z", 0.1, 2).step(0.1);
	 	history.pushState({type: this.type, geometry: this.geometry, quantity: this.quantity}, "", `/${this.type}/${this.geometry}/${this.quantity}`);
	}
}

const example = new Geometry("lines", "Sphere", uRange.value);
example.getPoints();

document.querySelectorAll(".geoImg").forEach(button => {
	button.onclick = () => {
		const type = button.dataset.type;
		if (type != undefined) {
	    	const example = new Geometry(type, history.state.geometry, uRange.value);
	    	example.getPoints();
		}
	}
});

function clearScene(scene) {
	while (scene.children.length)
	{
	    scene.remove(scene.children[0]);
	}
}

// Add the dat.GUI element as a child of a div in the HTML 
function createGui() {
	gui = new GUI({ autoPlace: false });
	gui.domElement.id = 'gui';
	gui_container.innerHTML = '';
	gui_container.appendChild(gui.domElement);
}

// Set the cameras
function makeCamera(fov=40) {
	const aspect = 2;
	const near = 0.1;
	const far = 1000;
	return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function render(time) {
	time *= 0.01
	if (scene.children[0] != undefined) {
		scene.children[0].rotation.y = time*0.01;
	}
	controls.update();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

requestAnimationFrame(render);