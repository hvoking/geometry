// React imports
import { useState, useContext, createContext } from 'react';

// Third-party imports
import * as THREE from "three";
import { GUI } from 'dat.gui'

const CanvasContext: React.Context<any> = createContext(null)

export const useCanvas = () => {
	return (
		useContext(CanvasContext)
	)
}

export const CanvasProvider = ({children}: any) => {
	const [ scene, setScene ] = useState<any>(new THREE.Scene());
	const [ gui, setGui ] = useState<any>(new GUI({ autoPlace: false }));

	const clearScene = (scene: any) => {
		while (scene.children.length)
		{
		    scene.remove(scene.children[0]);
		}
	}	

	const createNewRenderer = () => {
		const renderer = new THREE.WebGLRenderer();
		renderer.setClearColor("rgba(170, 170, 170, 1)");
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