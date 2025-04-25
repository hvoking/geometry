// React imports
import { useState, useContext, createContext } from 'react';

const CanvasSizesContext: React.Context<any> = createContext(null)

export const useCanvasSizes = () => {
	return (
		useContext(CanvasSizesContext)
	)
}

export const CanvasSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	return (
		<CanvasSizesContext.Provider value={{
			width, setWidth,
			height, setHeight,
		}}>
			{children}
		</CanvasSizesContext.Provider>
	)
}

CanvasSizesContext.displayName = "CanvasSizesContext";