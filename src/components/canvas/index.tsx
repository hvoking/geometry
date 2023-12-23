// App imports
import { Graph } from './graph';
import { GuiContainer } from './gui';
import { Slider } from './slider';

export const Canvas = () => {
	return (
		<>
			<Graph/>
			<GuiContainer/>
			<Slider/>
		</>
	)
}

Canvas.displayName="Canvas";