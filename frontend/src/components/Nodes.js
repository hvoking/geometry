const Nodes = ({ type, name }) => {		
	return (
		<div id="mydiv4">
			<div id="mydiv4header">{ name }</div>
			<div id="app"></div>
			<div className="wrapper">
				<div className="inputs">
					<ul>
						<li>Geometry</li>
						<li>Type</li>
						<li>Quantity</li>
					</ul>
					
				</div>
				<div className="outputs">
					<ul>
						<li>{ output }</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Nodes;
