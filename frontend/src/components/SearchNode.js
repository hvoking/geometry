const SearchNode = ({ type }) => {
	return (
		<div id="mydiv5">
			<div id="mydiv5header">{ type }</div>
			<div id="searchnode"></div>
			<div className="wrapper">
				<div className="input-group">
				    <input type="text" className="form-control" placeholder="Search"></input>
				    <div className="input-group-btn">
				      <button className="btn btn-default" type="submit">
				        <i className="glyphicon glyphicon-search"></i>
				      </button>
				    </div>
				</div>
			</div>
		</div>
	)
}

export default SearchNode;