// React imports
import { useRef } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useColors } from '../../context/colors';

// Third-party imports
import Draggable from 'react-draggable';

export const Colors = () => {
	const saturationRef = useRef<any>(null)
	const hueRef = useRef<any>(null)
	const {handleDrag, handleClick} = useColors();
	const onClick = (e: any) => {
		const parentPosition = handleClick(e);
		console.log(parentPosition);
		const xPosition = e.clientX - parentPosition.x - (saturationRef.current.clientWidth / 2);
		const yPosition = e.clientY - parentPosition.y - (saturationRef.current.clientHeight / 2);
		saturationRef.current.style.left = xPosition + "px";
		saturationRef.current.style.top = yPosition + "px";
	}
	return (
		<div className="colors-wrapper">
			<div 
				onMouseDown={onClick} 
				className={'saturation-field'}
				>
				<Draggable 
					nodeRef={saturationRef} 
					bounds="parent" 
					onDrag={handleDrag}
					>
					<div 
						style={{position: "absolute"}} 
						ref={saturationRef} 
						className={'saturation-knob'}
						>
					</div>
				</Draggable>
			</div>
			<div 
				onMouseDown={onClick} 
				className={'hue-field'}
				>
				<Draggable 
					nodeRef={hueRef} 
					axis="x" bounds="parent" 
					onDrag={handleDrag}
					>
					<div 
						ref={hueRef} 
						className={'hue-knob'}
						>
					</div>
				</Draggable>
			</div>
		</div>
	);
}

Colors.displayName="Colors";