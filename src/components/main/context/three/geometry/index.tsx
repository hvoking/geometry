// React imports
import { useEffect, useContext, createContext } from 'react';

// App imports
import { getPoints } from './points';
import { createVectors } from './vectors';
import { createGrid } from './list';

// Context imports
import { useFilters } from '../../filters';
import { useMaterial } from '../material';
import { useCanvas } from '../canvas';

// Third-party imports
import { Object3D, Points, Mesh, Line, HemisphereLight } from "three";

const GeometryContext: React.Context<any> = createContext(null)

export const useGeometry = () => {
	return (
		useContext(GeometryContext)
	)
}

export const GeometryProvider = ({children}: any) => {
	const { type, equation, quantity } = useFilters();
	const { scene, clearScene, gui, setGui } = useCanvas();
	const { pointMaterial, lineMaterial, meshMaterial } = useMaterial();

	const createGeometry = (vectorPoints: any) => {
		const group = new Object3D();
		clearScene(scene);
		scene.add(group);
		group.position.set(0, 0, 0);

		if (type === "points") {
			vectorPoints.forEach((array: any) => {
				const points = new Points( array, pointMaterial);
				group.add(points);
			});
		}
		else if (type === "lines") {
			vectorPoints.forEach((array: any) => {
				const line =  new Line( array, lineMaterial );
				group.add(line);
			});
		}
		else if (type === "mesh") {
			vectorPoints.forEach((array: any) => {
				const mesh = new Mesh( array, meshMaterial )
				const line =  new Line( array, lineMaterial );
				group.add(mesh);
				group.add(line)
			});
		}
		while (gui.__controllers.length) {
            gui.__controllers.forEach((controller: any) => gui.remove(controller))    
        }
		gui.add(group.scale, "x", 0.1, 2).step(0.1);
		gui.add(group.scale, "y", 0.1, 2).step(0.1);
		gui.add(group.scale, "z", 0.1, 2).step(0.1);
	}

	useEffect(() => {
	    const points = getPoints(type, equation, quantity);
	    const vectors = createVectors(points);
	    const grid = createGrid(vectors);
	    createGeometry(grid);
	}, [ type, equation, quantity ]);

	return (
		<GeometryContext.Provider value= {{ createGeometry }}>
			{children}
		</GeometryContext.Provider>
	)
}

GeometryContext.displayName = "GeometryContext";