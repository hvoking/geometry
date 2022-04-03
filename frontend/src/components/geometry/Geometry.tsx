import { useEffect, useState } from 'react';
import {
	BufferGeometry,
	BufferAttribute,
	Object3D,
	PointsMaterial,
	Points,
	LineBasicMaterial,
	MeshBasicMaterial,
	DoubleSide,
	Mesh,
	Line,
} from "three";

import { useScene } from '../../hooks/scene';
import { useQuantity } from '../../hooks/quantity';
import { useGeometry } from '../../hooks/geometry';
import { useType } from '../../hooks/type';

const Geometry = () => {
	const {geometry} = useGeometry();
	const {type} = useType();
	const {quantity} = useQuantity();
	const { scene } = useScene();
	const [vectorPoints, vectorPointsSet] = useState<BufferGeometry[]>([])
	useEffect(() => {
		vectorPointsSet([]);
		getPoints()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geometry, type, quantity])
	const getPoints = () => {	
		fetch(`http://localhost:8000/${type}/${geometry}/${quantity}`)
		.then(response => response.json())
		.then(points => {
			const listVectors32: Float32Array[] = [];
			const positions = points.Positions;
			positions.forEach((vector: any) => {
				const vectors32: any = [];
				vector.forEach((array: any) => {
					vectors32.push(array[0], array[2], array[1]);
				});
				listVectors32.push(Float32Array.from(vectors32));
			});
			listVectors32.forEach((array: any) => {
				const gridPoints = new BufferGeometry();
				gridPoints.setAttribute( 'position', new BufferAttribute( array, 3 ));
				vectorPoints.push(gridPoints);
			});
			createGrid(vectorPoints);

		})
		.catch(err => {
			console.log(err);
		});
	}
	const clearScene = (scene: any) => {
		while (scene.children.length)
		{
		    scene.remove(scene.children[0]);
		}
	}

	const createGrid = (vectorPoints: BufferGeometry[]) => {
		const group = new Object3D();
		clearScene(scene);
		scene.add(group);
		group.position.set(0, 0, 0);
		if (type === "points") {
			const pointMaterial = new PointsMaterial( { size: 3, sizeAttenuation: false, color: 'aqua' } );
			vectorPoints.forEach((array: any) => {
				group.add( new Points( array, pointMaterial ));
			});
		}
		else if (type === "lines") {
			const lineMaterial = new LineBasicMaterial( { color: 'aqua' } );
			vectorPoints.forEach((array: any) => {
				group.add( new Line( array, lineMaterial ));
			});
		}
		else if (type === "mesh") {
			const lineMaterial = new LineBasicMaterial( { color: 0x221122 } );
			const material = new MeshBasicMaterial( { color: 0xBBCC00 } );
			material.side = DoubleSide;
			vectorPoints.forEach((array: any) => {
				group.add( new Mesh( array, material ));
				group.add( new Line( array, lineMaterial ));
			});
		}
		// gui.add(group.scale, "x", 0.1, 2).step(0.1);
	 // 	gui.add(group.scale, "y", 0.1, 2).step(0.1);
	 // 	gui.add(group.scale, "z", 0.1, 2).step(0.1);
	 	// history.pushState({type: type, geometry: geometry, quantity: quantity}, "", `/${type}/${geometry}/${quantity}`);
	}
	return (
		<div>
			
		</div>
	)
}

Geometry.displayName="Geometry";
export default Geometry;