import ColorButtons from './ColorButtons';

const Navbar = () => {
	return (
		<nav className="navbar navbar-inverse navbar-fixed-top">
			  <div className="container-fluid">
			    <div className="navbar-header">
			    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>                        
			      </button>
			      <a className="navbar-brand" href="/frontend">Gustavo Gonzalez</a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			    <ul className="nav navbar-nav">
			      <li className="active"><a href="/frontend"><i className="glyphicon glyphicon-home"></i></a></li>
			      <li className="dropdown">
			        <a className="dropdown-toggle" data-toggle="dropdown" href="/frontend">Geometry
			        <span className="caret"></span></a>
			        <ul className="dropdown-menu">
			          <li><a className="geometry" href="/frontend">Sphere</a></li>
			          <li><a className="geometry" href="/frontend">Cube</a></li>
			          <li><a className="geometry" href="/frontend">Cylinder</a></li>
			          <li><a className="geometry" href="/frontend">Equation1</a></li>
			        </ul>
			      </li>
			      <li><a href="/frontend">Items</a></li>
			      <li><a href="/frontend">Material</a></li>

			    </ul>
			    <ul className="nav navbar-nav navbar-right">
				    <li>
					    <ColorButtons />
				    </li>
			      <li><a href="/frontend"><span className="glyphicon glyphicon-user"></span>Sign in</a></li>
			      <li><a href="/frontend"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
			    </ul>

			    <form className="navbar-form navbar-left" action="/">
			  <div className="input-group">
			    <input type="text" className="form-control" placeholder="Search" list="nodesList"></input>
			    <datalist id="nodesList"></datalist>
			    <div className="input-group-btn">
			      <button className="btn btn-default" type="submit">
			        <i className="glyphicon glyphicon-search"></i>
			      </button>
			    </div>
			  </div>
			</form>
			</div>
			  </div>
		</nav>
	)
}

Navbar.displayName="Navbar";

export default Navbar;