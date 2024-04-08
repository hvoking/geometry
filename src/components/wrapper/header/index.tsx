// App imports
import './styles.scss';

export const Header = () => {
	return (
		<div className="geometry-header">
			<img 
				className="gnrt-logo"
				src={process.env.PUBLIC_URL + "/static/logos/white.svg"} 
				alt="header-logo"
			/>
			<div>
				<div className="logo-name">Gustavo Gonzalez</div>
				<div className="logo-profession">Computational Designer</div>
			</div>
		</div>
	)
}

Header.displayName="Header"