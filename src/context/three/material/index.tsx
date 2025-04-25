// React imports
import { useState, useContext, createContext } from 'react';

// Third-party imports
import { PointsMaterial, LineBasicMaterial, MeshBasicMaterial, DoubleSide, Color } from "three";

const MaterialContext: React.Context<any> = createContext(null)

export const useMaterial = () => {
	return (
		useContext(MaterialContext)
	)
}

export const MaterialProvider = ({children}: any) => {
	const line = new LineBasicMaterial({ color: new Color(0/255, 120/255, 120/255) });
	const point = new PointsMaterial({
		size: 2, 
		sizeAttenuation: false, 
		color: new Color(0/255, 120/255, 120/255) 
	});
	const mesh = new MeshBasicMaterial({ 
		color: new Color(0, 120/255, 120/255), 
		opacity: 0.4, 
		transparent: true,
		side: DoubleSide,
	})

	const [ lineMaterial, setLineMaterial ] = useState<any>(line);
	const [ pointMaterial, setPointMaterial ] = useState<any>(point);
	const [ meshMaterial, setMeshMaterial ] = useState<any>(mesh);

	return (
		<MaterialContext.Provider value= {{ pointMaterial, lineMaterial, meshMaterial }}>
			{children}
		</MaterialContext.Provider>
	)
}

MaterialContext.displayName = "MaterialContext";