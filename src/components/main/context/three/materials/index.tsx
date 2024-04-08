// React imports
import { useState, useContext, createContext } from 'react';

// Third-party imports
import { PointsMaterial, LineBasicMaterial, MeshBasicMaterial, DoubleSide } from "three";

const MaterialsContext: React.Context<any> = createContext(null)

export const useMaterials = () => {
	return (
		useContext(MaterialsContext)
	)
}

export const MaterialsProvider = ({children}: any) => {
	const [ lineMaterial, setLineMaterial ] = useState<any>(new LineBasicMaterial({ color: 0x221122 }));
	const [ pointMaterial, setPointMaterial ] = useState<any>(new PointsMaterial({size: 3, sizeAttenuation: false, color: 'aqua'}));
	const [ meshMaterial, setMeshMaterial ] = useState<any>(new MeshBasicMaterial({ color: 0xBBCC00, side: DoubleSide }));

	return (
		<MaterialsContext.Provider value= {{ pointMaterial, lineMaterial, meshMaterial }}>
			{children}
		</MaterialsContext.Provider>
	)
}

MaterialsContext.displayName = "MaterialsContext";