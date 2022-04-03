import Graph from './Graph'
import GuiContainer from './GuiContainer'
import './styles.scss';

const Canvas = () => {
	return (
		<div>
			<Graph />
			<GuiContainer />			
		</div>
	)
}

Canvas.displayName="Canvas";
export default Canvas;