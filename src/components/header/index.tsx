// App imports
import { Formulas } from './formulas';
import { Controllers } from './controllers';
import './styles.scss';

export const Header = () => {
	return (
	    <div className="header-wrapper">
	    	<Formulas/>
	    	<Controllers/>
		</div>
	)
}

Header.displayName="Header";