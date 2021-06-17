import { useState, useEffect } from 'react';
import { pure } from 'recompose';
import GeometryComponent from './GeometryComponent'

const Slider = props => {
	const [rangeValue, setRangeValue] = useState(25);

	useEffect(() => {
		const example = GeometryComponent('points', 'mesh', rangeValue);
	}, [])
	 // uRange.onchange = () => {
	 // 	if (history.state) {
	 // 		const example = new Geometry(history.state.type, history.state.geometry,uRange.value);
	 // 		example.getPoints();
	 // 	}
	 // 	else {
	 // 		const example = new Geometry("mesh", "Sphere", uRange.value);
	 // 		example.getPoints();
	 // 	}
	 // }
	return (
		<div id="mydiv3">
			<div id="mydiv3header">Slider</div>
			<div>
				<input type="range" min="1" max="100" className="slider" id="uRange" onChange={e => setRangeValue(parseInt(e.currentTarget.value))}></input>
				<div id="u">{rangeValue}</div>
			</div>
		</div>
	)
}

export default pure(Slider);