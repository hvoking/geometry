// import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import { useEffect } from 'react';
import * as THREE from 'three';

const canvas = document.querySelector("#page_background");
const scene = new THREE.Scene();
const group = new THREE.Object3D();
const renderer = new THREE.WebGLRenderer({canvas:canvas});
const Fetcher = () => {
	useEffect(() => {
		FetchData('http://localhost:8000/points/Cylinder/40')

		// Set the Scene in threejs
		renderer.setClearColor(0xAAAAAA);
		scene.add(group);
		group.position.set(0, 0, 0);
	}, [])
	

	const makeCamera = (fov=40) => {
		const aspect = 2;
		const near = 0.1;
		const far = 1000;
		return new THREE.PerspectiveCamera(fov, aspect, near, far);
	}
	const camera = makeCamera();
	
	const createGrid = (points) => {
		const pointMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: false, color: 'aqua' } );
		points.Positions.forEach(array => {
			group.add( new THREE.Points( array, pointMaterial ));
		});
	}
	const FetchData = (url) => {
		fetch(url)
		.then(response => response.json())
		.then(data => {
			createGrid(data)
		})
	}
	return (
		<div>
			<div>
				<div>{renderer.render(scene, camera)}</div>
			</div>
		</div>
	)
}

export default Fetcher;