import { useState, useContext, createContext } from 'react';

const GeometryContext: React.Context<any> = createContext(["Sphere", () => {}]);

export const useGeometry = () => {
	return (
		useContext(GeometryContext)
	)
}

export const GeometryProvider = ({children}: any) => {
	const [geometry, geometrySet] = useState<string>("Cube");

	const toogleGeometry = (geometry: string) => {
		geometrySet(geometry)
	};

	return (
		<GeometryContext.Provider value={{geometry, toogleGeometry}}>
			{children}
		</GeometryContext.Provider>
	)
}