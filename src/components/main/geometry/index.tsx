// React imports
import { useEffect, useRef } from 'react';

// App imports
import { OrbitControls } from './orbit'

// Context imports
import { useCanvas } from '../context/three/canvas';
import { useCamera } from '../context/three/camera';

export const Geometry = () => {
	const { scene, createNewRenderer } = useCanvas();
	const { createNewCamera } = useCamera();

	const canvasRef = useRef<any>(null);

	useEffect(() => {
		const camera = createNewCamera();
		const renderer = createNewRenderer();

		// Set the controls 
		new OrbitControls( camera, renderer.domElement );

		// Add elements to the html 
		canvasRef.current && canvasRef.current.appendChild( renderer.domElement );

	  	const animate = (time: any) => {
	  		time *= 0.01
			if (scene.children[0] != undefined) {
				scene.children[0].rotation.y = time*0.01;
			}
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
		}
		requestAnimationFrame(animate);
	}, []);

	return (
		<div ref={canvasRef}></div>
	)
}

Geometry.displayName="Geometry";