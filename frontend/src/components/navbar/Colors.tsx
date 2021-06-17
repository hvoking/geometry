import Draggable from 'react-draggable';
import { useColors } from '../Context/colors'
import { useRef, useEffect } from 'react';

const Colors = () => {
	const saturationRef = useRef<any>(null)
	const hueRef = useRef<any>(null)
	const {handleDrag, handleClick} = useColors();
	return (
		<>
			<div onClick={handleClick} className={'saturation-field'}>
				<Draggable bounds="parent" onDrag={handleDrag}>
					<div ref={saturationRef} className={'saturation-knob'}></div>
				</Draggable>
			</div>
			<div onClick={handleClick} className={'hue-field'}>
				<Draggable axis="x" bounds="parent" onDrag={handleDrag}>
					<div ref={hueRef} className={'hue-knob'}></div>
				</Draggable>
			</div>
		</>
	);
}

Colors.displayName="Colors";
export default Colors;