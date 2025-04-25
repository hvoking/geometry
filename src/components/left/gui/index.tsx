// App imports
import './styles.scss';

// Context imports
import { useCanvas } from 'context/three/canvas';

export const GuiContainer = () => {
	const { guiRef } = useCanvas();
	return (
		<div ref={guiRef} className="gui-wrapper"></div>
	)
}

GuiContainer.displayName="GuiContainer";