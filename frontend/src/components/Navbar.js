const Navbar = () => {
	return (
		<nav class="navbar navbar-inverse navbar-fixed-top">
			  <div class="container-fluid">
			    <div class="navbar-header">
			    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>                        
			      </button>
			      <a class="navbar-brand" href="/frontend">Gustavo Gonzalez</a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
			    <ul class="nav navbar-nav">
			      <li class="active"><a href="/frontend"><i class="glyphicon glyphicon-home"></i></a></li>
			      <li class="dropdown">
			        <a class="dropdown-toggle" data-toggle="dropdown" href="/frontend">Geometry
			        <span class="caret"></span></a>
			        <ul class="dropdown-menu">
			          <li><a class="geometry" href="/frontend">Sphere</a></li>
			          <li><a class="geometry" href="/frontend">Cube</a></li>
			          <li><a class="geometry" href="/frontend">Cylinder</a></li>
			          <li><a class="geometry" href="/frontend">Equation1</a></li>
			        </ul>
			      </li>
			      <li><a href="/frontend">Items</a></li>
			      <li><a href="/frontend">Material</a></li>

			    </ul>
			    <ul class="nav navbar-nav navbar-right">
				    <li>
					    <div class="selector">
					    	<div class="field-knob"></div>
					    	<div class="saturation-field">
					    		<div class="c" style={{width: "100%", height: "100%", background: "-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)"}}></div>
					    	</div>
					    	<div class="hue-field">
					    		<div class="hue-knob"></div>
					    	</div>
					    	<div>
					    		<input type="checkbox" id="colorsCheckBox"></input>
					    	</div>
					    </div>
				    </li>
			      <li><a href="/frontend"><span class="glyphicon glyphicon-user"></span>Sign in</a></li>
			      <li><a href="/frontend"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
			    </ul>

			    <form class="navbar-form navbar-left" action="/">
			  <div class="input-group">
			    <input type="text" class="form-control" placeholder="Search" list="nodesList"></input>
			    <datalist id="nodesList"></datalist>
			    <div class="input-group-btn">
			      <button class="btn btn-default" type="submit">
			        <i class="glyphicon glyphicon-search"></i>
			      </button>
			    </div>
			  </div>
			</form>
			</div>
			  </div>
		</nav>
	)
}

export default Navbar;