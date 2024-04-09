// React imports
import { useState, useContext, createContext } from 'react';

const SliderSizesContext: React.Context<any> = createContext(null)

export const useSliderSizes = () => {
	return (
		useContext(SliderSizesContext)
	)
}

export const SliderSizesProvider = ({children}: any) => {
	const [ width, setWidth ] = useState<any>(null);
	const [ height, setHeight ] = useState<any>(null);

	const margin = { top: 0, bottom: 0, left: 0, right: 0 }

	const innerWidth = width - margin.right - margin.left;
	const innerHeight = height - margin.top - margin.bottom;

	return (
		<SliderSizesContext.Provider value={{
			margin,
			width,
			height,
			setWidth,
			setHeight,
			innerWidth,
			innerHeight,
		}}>
			{children}
		</SliderSizesContext.Provider>
	)
}

SliderSizesContext.displayName = "SliderSizesContext";