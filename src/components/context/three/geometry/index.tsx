// React imports
import { useContext, createContext } from 'react';

// Context imports
import { useFilters } from '../../filters';
import { useMaterials } from '../materials';
import { useCanvas } from '../canvas';

// Third-party imports
import { Object3D, Points, Mesh, Line } from "three";

const ThreeGeometryContext: React.Context<any> = createContext(null)

export const useThreeGeometry = () => {
	return (
		useContext(ThreeGeometryContext)
	)
}

export const ThreeGeometryProvider = ({children}: any) => {
	const { type } = useFilters();
	const { scene, clearScene, gui, setGui } = useCanvas();
	const { pointMaterial, lineMaterial, meshMaterial } = useMaterials();

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
				group.add(mesh);
			});
		}
		while (gui.__controllers.length) {
            gui.__controllers.forEach((controller: any) => gui.remove(controller))    
        }
		gui.add(group.scale, "x", 0.1, 2).step(0.1);
		gui.add(group.scale, "y", 0.1, 2).step(0.1);
		gui.add(group.scale, "z", 0.1, 2).step(0.1);
	}

	return (
		<ThreeGeometryContext.Provider value= {{ createGeometry }}>
			{children}
		</ThreeGeometryContext.Provider>
	)
}

ThreeGeometryContext.displayName = "ThreeGeometryContext";