// React imports
import { useState, useContext, createContext } from 'react';

// Third-party imports
import { Scene, WebGLRenderer } from "three";
import { GUI } from 'dat.gui'

const CanvasContext: React.Context<any> = createContext(null)

export const useCanvas = () => {
	return (
		useContext(CanvasContext)
	)
}

export const CanvasProvider = ({children}: any) => {
	const [ scene, setScene ] = useState<Scene>(new Scene());
	const [ gui, setGui ] = useState<any>(new GUI({ autoPlace: false }));

	const clearScene = (scene: any) => {
		while (scene.children.length)
		{
		    scene.remove(scene.children[0]);
		}
	}	

	const createNewRenderer = (): WebGLRenderer => {
		const renderer = new WebGLRenderer();
		renderer.setClearColor(0xAAAAAA);
		renderer.setSize( window.innerWidth, window.innerHeight );
		return renderer
	}

	return (
		<CanvasContext.Provider value= {{ 
			scene, clearScene,
			gui, setGui,
			createNewRenderer
		}}>
			{children}
		</CanvasContext.Provider>
	)
}

CanvasContext.displayName = "CanvasContext";