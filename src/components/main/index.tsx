// App imports
import { Wrapper } from '../wrapper';
import { Left } from './left';
import { Grid } from './grid';
import './styles.scss';

// Context imports
import { useCanvas } from './context/three/canvas';

export const Main = () => {
	const { canvasRef } = useCanvas();

	return (
		<Wrapper>
			<div className="main-wrapper">
				<Left/>
      			<div ref={canvasRef} style={{position: "relative"}}>
      				<Grid/>
      			</div>
      		</div>
		</Wrapper>
	)
}

Main.displayName="Main";