const Login = () => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
	}
	return (
		<ul className="nav navbar-nav navbar-right">
			<li><a onClick={handleClick} href="/frontend"><span className="glyphicon glyphicon-user"></span>Sign in</a></li>
			<li><a href="/frontend"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
		</ul>
	)
}

Login.displayName="Login";
export default Login;