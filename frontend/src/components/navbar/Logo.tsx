const Logo = () => {
	return (
		<div className="navbar-header">
			<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>                        
			</button>
			<span className="logo-wrapper">
				<a className="navbar-brand" href="/frontend">Gustavo Gonzalez</a>
			</span>
			<div className="navbar-brand"><a href="/frontend"><i className="glyphicon glyphicon-home"></i></a></div>
		</div>
	)
}

Logo.displayName="Logo";
export default Logo;