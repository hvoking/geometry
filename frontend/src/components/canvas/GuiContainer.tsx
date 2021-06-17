import { useRef, useEffect } from 'react';
import * as dat from 'dat.gui';
import './GuiContainer.scss';

const GuiContainer = () => {
	const guiContainerRef = useRef<null | HTMLDivElement>(null)
	useEffect(() => {
		let gui = new dat.GUI({ autoPlace: false });
		if (guiContainerRef.current != null) { 
			guiContainerRef.current.innerHTML = '';
			guiContainerRef.current.appendChild(gui.domElement);
		}
	})
	return (
		<div id="mydiv">
		  <div id="mydivheader">GUI Container</div>
		  <div ref={guiContainerRef} id="gui_container"></div>
		</div>
	)
}

GuiContainer.displayName="GuiContainer";
export default GuiContainer;