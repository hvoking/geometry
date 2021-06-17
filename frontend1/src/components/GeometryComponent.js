import * as THREE from 'three';

const GeometryComponent = ({type, geometry, quantity}) => {
	const vectorPoints = [];
	const getPoints = () => {	
	// 	clearScene(scene);
	// 	gui.destroy();
	// 	createGui();
		fetch(`/${type}/${geometry}/${quantity}`)
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
				vectorPoints.push(gridPoints);
			});
			console.log(vectorPoints);
			// createGrid();
		})
		.catch(err => {
			console.log(err);
		});
	}
	const createGrid = () => {
		const scene = new THREE.Scene();
		const group = new THREE.Object3D();
		scene.add(group);
		group.position.set(0, 0, 0);
		if (type === "points") {
			const pointMaterial = new THREE.PointsMaterial( { size: 3, sizeAttenuation: false, color: 'aqua' } );
			vectorPoints.forEach(array => {
				group.add( new THREE.Points( array, pointMaterial ));
			});
		}
		else if (type === "lines") {
			const lineMaterial = new THREE.LineBasicMaterial( { color: 'aqua' } );
			vectorPoints.forEach(array => {
				group.add( new THREE.Line( array, lineMaterial ));
			});
		}
		else if (type === "mesh") {
			const lineMaterial = new THREE.LineBasicMaterial( { color: 0x221122 } );
			const material = new THREE.MeshBasicMaterial( { color: 0xBBCC00 } );
			material.side = THREE.DoubleSide;
			vectorPoints.forEach(array => {
				group.add( new THREE.Mesh( array, material ));
				group.add( new THREE.Line( array, lineMaterial ));
			});
		}
	// 	gui.add(group.scale, "x", 0.1, 2).step(0.1);
	//  	gui.add(group.scale, "y", 0.1, 2).step(0.1);
	//  	gui.add(group.scale, "z", 0.1, 2).step(0.1);
	//  	history.pushState({type: type, geometry: geometry, quantity: quantity}, "", `/${type}/${geometry}/${quantity}`);
	}
}

export default GeometryComponent;