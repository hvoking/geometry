// React imports
import { useRef } from 'react';

// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters';

// Third-party imports
import Draggable from 'react-draggable';

export const Slider = () => {
	const nodeRef = useRef<any>(null);
	const { quantity, setQuantity } = useFilters();

	const onChange = (e: any) => {
		const currentQuantity = parseInt(e.currentTarget.value);
		setQuantity(currentQuantity);
	}
	
	return (
		<Draggable nodeRef={nodeRef} handle="strong">
			<div id="mydiv3">
				<strong>
					<div id="mydiv3header">Slider</div>
				</strong>
				<div ref={nodeRef}>
					<input 
						type="range" 
						min="1" 
						max="100" 
						className="slider" 
						id="uRange" 
						onChange={onChange}>
					</input>
					<div className="slider-number">
						{quantity}
					</div>
				</div>
			</div>
		</Draggable>
	)
}

Slider.displayName="Slider";