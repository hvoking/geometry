import { useRef } from 'react';
import { useQuantity } from '../../hooks/quantity';
import Draggable from 'react-draggable';

import './styles.scss';

const Urange = () => {
	const nodeRef = useRef<HTMLDivElement | null>(null)
	const {quantity, quantitySet} = useQuantity();
	
	return (
		<Draggable nodeRef={nodeRef} handle="strong">
			<div id="mydiv3">
				<strong><div id="mydiv3header">Slider</div></strong>
				<div ref={nodeRef}>
					<input 
						type="range" 
						min="1" 
						max="100" 
						className="slider" 
						id="uRange" 
						onChange= {
							e => quantitySet(parseInt(e.currentTarget.value))
						}>
					</input>
					<div className="sliderNumber">{quantity}</div>
				</div>
			</div>
		</Draggable>
	)
}

Urange.displayName="Urange";
export default Urange;