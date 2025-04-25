// React imports
import { useState, useEffect, useRef, useContext, createContext } from 'react';

// App imports
import { OrbitControls } from './orbit'

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
	const [ gui, setGui ] = useState<any>(new GUI({ autoPlace: false }));
	const canvasRef = useRef<any>(null);
	const guiRef = useRef<any>(null);

	const [ scene, setScene ] = useState<any>(new THREE.Scene());
	const renderer = new THREE.WebGLRenderer();
	const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
	
	renderer.setClearColor(0x484848, 0.2);
	camera.position.set(2, 2, 2).multiplyScalar(12);
	camera.lookAt(0, 0, 0);

	useEffect(() => {
		// Set the controls 
		new OrbitControls( camera, renderer.domElement );
		const setCurrentSize = () => {
			const clientWidth = canvasRef.current.clientWidth;
			const clientHeight = canvasRef.current.clientHeight;

			camera.aspect = clientWidth / clientHeight;
    		camera.updateProjectionMatrix();

			renderer.setSize( clientWidth, clientHeight );
			canvasRef.current.appendChild(renderer.domElement);	
		}
		canvasRef.current && setCurrentSize();
	}, []);

	useEffect(() => {
	  	const animate = (time: any) => {
	  		time *= 0.01
			if (scene.children[0] != undefined) {
				scene.children[0].rotation.y = time*0.01;
			}
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
		}
		requestAnimationFrame(animate);
	}, [])

	useEffect(() => {
		if (guiRef.current != null) { 
			guiRef.current.innerHTML = '';
			guiRef.current.appendChild(gui.domElement);
		}
	}, []);

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
			renderer, camera,
			canvasRef, guiRef
		}}>
			{children}
		</CanvasContext.Provider>
	)
}

CanvasContext.displayName = "CanvasContext";