// React imports
import { useState, useContext, createContext } from 'react';

// Third-party imports
import { PointsMaterial, LineBasicMaterial, MeshStandardMaterial, DoubleSide, Color } from "three";

const MaterialsContext: React.Context<any> = createContext(null)

export const useMaterials = () => {
	return (
		useContext(MaterialsContext)
	)
}

export const MaterialsProvider = ({children}: any) => {
	const line = new LineBasicMaterial({ color: 0x221122 });
	const point = new PointsMaterial({
		size: 3, 
		sizeAttenuation: false, 
		color: 'aqua'
	});
	const mesh = new MeshStandardMaterial({ 
		color: new Color(1, 0, 0), 
		opacity: 0.8, 
		transparent: true,
		side: DoubleSide, 
		roughness: 0.123 
	})

	const [ lineMaterial, setLineMaterial ] = useState<any>(line);
	const [ pointMaterial, setPointMaterial ] = useState<any>(point);
	const [ meshMaterial, setMeshMaterial ] = useState<any>(mesh);

	return (
		<MaterialsContext.Provider value= {{ pointMaterial, lineMaterial, meshMaterial }}>
			{children}
		</MaterialsContext.Provider>
	)
}

MaterialsContext.displayName = "MaterialsContext";