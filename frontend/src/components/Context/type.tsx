import { useState, useContext, createContext } from 'react';

const TypeContext: React.Context<any> = createContext(["mesh", () => {}]);

export const useType = () => {
	return (
		useContext(TypeContext)
	)
}

export const TypeProvider = ({children}: any) => {
	const [type, typeSet] = useState<string>("points");
	const toogleType = (type: string) => {
		typeSet(type)
	};
	return (
		<TypeContext.Provider value={{type, toogleType}}>
			{children}
		</TypeContext.Provider>
	)}