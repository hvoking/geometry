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

	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xd4d0c8, 0);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight - 198 );
	
	const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000)
	camera.position.set(2, 2, 2).multiplyScalar(8);
	camera.lookAt(0, 0, 0);

	const clearScene = (scene: any) => {
		while (scene.children.length)
		{
		    scene.remove(scene.children[0]);
		}
	}	

	return (
		<CanvasContext.Provider value= {{ 
			scene, clearScene,
			gui, setGui,
			renderer, camera
		}}>
			{children}
		</CanvasContext.Provider>
	)
}

CanvasContext.displayName = "CanvasContext";