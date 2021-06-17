import { useEffect } from 'react';
import * as THREE from 'three';

const Graph = () => {
	const scene = new THREE.Scene();
	const group = new THREE.Object3D();
	scene.add(group);
	group.position.set(0, 0, 0);
}

export default Graph;