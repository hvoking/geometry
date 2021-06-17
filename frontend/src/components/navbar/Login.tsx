const Login = () => {
	return (
		<div className="login">
			<ul className="nav navbar-nav navbar-right">
				<li><a href="/frontend"><span className="glyphicon glyphicon-user"></span>Sign in</a></li>
				<li><a href="/frontend"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
			</ul>
		</div>
	)
}

Login.displayName="Login";
export default Login;