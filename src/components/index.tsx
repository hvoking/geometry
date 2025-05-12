// App imports
import { Left } from './left';
import { Grid } from './grid';
import { Header } from './header';
import './styles.scss';

// Context imports
import { useCanvas } from 'context/three/canvas';

export const Main = () => {
	const { canvasRef } = useCanvas();

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	

	return (
		<div className="wrapper">
			<Header/>
			<div className="main-wrapper">
				<Left/>
      			<div 
      				ref={canvasRef} 
      				style={{position: "relative"}}
      			>
      				<Grid/>
      			</div>
      		</div>
		</div>
	)
}

Main.displayName="Main";