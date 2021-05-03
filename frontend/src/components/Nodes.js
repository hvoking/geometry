const Nodes = ({ type, mesh }) => {		
	return (
		<div id="mydiv4">
			<div id="mydiv4header">{ mesh }</div>
			<div id="app"></div>
			<div className="wrapper">
				<div className="inputs">
					<ul>
						<li><span></span>Geometry</li>
						<li>Type</li>
						<li>Quantity</li>
					</ul>
					
				</div>
				<div className="outputs">
					<ul>
						<li>{type}</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Nodes;
