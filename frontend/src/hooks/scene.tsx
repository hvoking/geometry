import { useState, useContext, createContext } from 'react';
import { Scene } from 'three';

const SceneContext: React.Context<any> = createContext(() => {});


export const useScene = () => {
	return (
		useContext(SceneContext)
	)
}

export const SceneProvider = ({children}: any) => {
	const [scene, sceneSet] = useState<Scene>(new Scene())
	return (
		<SceneContext.Provider value={{scene, sceneSet}}>
			{children}
		</SceneContext.Provider>
	)
}