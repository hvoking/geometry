import { useState, useContext, createContext } from 'react';

const QuantityContext: React.Context<any> = createContext([22, () => {}]);

export const useQuantity = () => {
	return (
		useContext(QuantityContext)
	)
}

export const QuantityProvider = ({children}: any) => {
	const [quantity, quantitySet] = useState<number>(33);
	return (
		<QuantityContext.Provider value={{quantity, quantitySet}}>
			{children}
		</QuantityContext.Provider>
	)
}