const GeoButtons = () => {
	return (
		<div id="geoButtons">
			<div id="geometryImages">
				<button data-type="points" class="geoImg"><span class="spanPoints"></span></button>
				<button data-type="lines" class="geoImg"><span class="spanLines"></span></button>
				<button data-type="mesh" class="geoImg"><span class="spanMesh"></span></button>
				<button class="geoImg"><span class="pokebola"></span></button>
			</div>
		</div>
	)
}

export default GeoButtons;		