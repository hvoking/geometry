// App imports
import { Slider } from './slider'
import './styles.scss';

// Context imports
import { useCanvas } from '../context/three/canvas';

export const Right = ({ref}: any) => {
	const { guiRef } = useCanvas();
	return (
			<div className="right-wrapper">
				<div className="sidebar-title" style={{paddingLeft: "20px"}}>Controllers</div>
				<div ref={guiRef} className="gui-wrapper"></div>
				<Slider/>
			</div>
	)
}

Right.displayName="Right";