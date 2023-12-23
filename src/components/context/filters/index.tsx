// React imports
import { useState, useContext, createContext } from 'react';

const FiltersContext: React.Context<any> = createContext(null);

export const useFilters = () => {
	return (
		useContext(FiltersContext)
	)
}

export const FiltersProvider = ({children}: any) => {
	const [ type, setType ] = useState<string>("points");
	const [ equation, setEquation ] = useState<string>("Cube");
	const [ quantity, setQuantity ] = useState<number>(33);

	return (
		<FiltersContext.Provider value={{ 
			equation, setEquation,
			quantity, setQuantity,
			type, setType,
		}}>
			{children}
		</FiltersContext.Provider>
	)
}