import './styles/Navbar.scss';
import SearchBar from './SearchBar';
import Login from './Login';
import Logo from './Logo';
import Items from './Items';
import Colors from './Colors'
import { useColors } from '../Context/colors'

const Navbar = () => {
	const {position} = useColors();
	return (
		<nav className="navbar navbar-inverse navbar-fixed-top">
		    <Logo/>
		    <div className="collapse navbar-collapse" id="myNavbar">
		    	<div style={{backgroundColor: `#${position.x}${position.x}`}} className="wrapper">
				    <Items />
				    <div className="search-bar-wrapper">
				    	<SearchBar />
				    </div>
				    <div className="colors-wrapper">
			    		<Colors />
			    	</div>
				    <Login />
			    </div>
			</div>
		</nav>
	)
}

Navbar.displayName="Navbar";
export default Navbar;