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
	const { scene, clearScene, gui } = useCanvas();
	const { pointMaterial, lineMaterial, meshMaterial } = useMaterials();

	const createGeometry = (vectorPoints: any) => {
		const group = new Object3D();
		clearScene(scene);
		scene.add(group);
		group.position.set(0, 0, 0);

		if (type === "points") {
			vectorPoints.forEach((array: any) => {
				group.add( new Points( array, pointMaterial ));
			});
		}
		else if (type === "lines") {
			vectorPoints.forEach((array: any) => {
				group.add( new Line( array, lineMaterial ));
			});
		}
		else if (type === "mesh") {
			vectorPoints.forEach((array: any) => {
				group.add( new Mesh( array, meshMaterial ));
			});
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