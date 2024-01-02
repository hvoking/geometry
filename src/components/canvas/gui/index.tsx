// React imports
import { useRef, useEffect } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useCanvas } from '../../context/three/canvas';

export const GuiContainer = () => {
	const guiContainerRef = useRef<any>(null);
	const { gui } = useCanvas();

	useEffect(() => {
		if (guiContainerRef.current != null) { 
			guiContainerRef.current.innerHTML = '';
			guiContainerRef.current.appendChild(gui.domElement);
		}
	}, []);

	return (
		<div className="gui-wrapper">
		  <div id="mydivheader">GUI Container</div>
		  <div ref={guiContainerRef} className="gui-container"></div>
		</div>
	)
}

GuiContainer.displayName="GuiContainer";