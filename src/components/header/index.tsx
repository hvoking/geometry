// App imports
import './styles.scss';

export const Header = () => {
	return (
		<div className="geometry-header">
			<img 
				className="gnrt-logo"
				src={process.env.PUBLIC_URL + "/static/logos/logo.svg"} 
				alt="header-logo"
			/>
		</div>
	)
}

Header.displayName="Header"