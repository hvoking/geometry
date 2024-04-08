// React imports
import { useRef, useEffect } from 'react';

// Context imports
import { useCanvas } from '../../context/three/canvas';

export const Controller = () => {
	const controllerRef = useRef<any>(null);
	const { gui } = useCanvas();

	useEffect(() => {
		if (controllerRef.current != null) { 
			controllerRef.current.innerHTML = '';
			controllerRef.current.appendChild(gui.domElement);
		}
	}, []);

	return (
		  <div ref={controllerRef}></div>
	)
}

Controller.displayName="Controller";