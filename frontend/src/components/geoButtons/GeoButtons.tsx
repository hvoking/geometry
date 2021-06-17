import Buttons from './Buttons'

const GeoButtons = () => {
	return (
		<div id="geoButtons">
			<div id="geometryImages">
				<Buttons datatype="points"/>
				<Buttons datatype="lines"/>
				<Buttons datatype="mesh"/>
			</div>
		</div>
	)
}

GeoButtons.displayName="GeoButtons";
export default GeoButtons;