const SearchBar = () => {
	return (
		<div className="search-bar">
			<form className="navbar-form" action="/">
			  <div className="input-group">
			    <input type="text" className="form-control" placeholder="Search"></input>
			    <div className="input-group-btn">
			      <button className="btn btn-default" type="submit">
			        <i className="glyphicon glyphicon-search"></i>
			      </button>
			    </div>
			  </div>
			</form>
			
		</div>
	)
}

SearchBar.displayName="SearchBar";
export default SearchBar;