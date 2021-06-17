import { pure } from 'recompose';
import Buttons from './Buttons'

const GeoButtons = props => {
	return (
		<div id="geoButtons">
			<div id="geometryImages">
				<Buttons dataType="points"/>
				<Buttons dataType="lines"/>
				<Buttons dataType="mesh"/>
				<button className="geoImg"><span className="pokebola"></span></button>
			</div>
		</div>
	)
}

export default pure(GeoButtons);		