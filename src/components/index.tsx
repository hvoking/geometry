// App imports
import { Header } from './header';
import { Canvas } from './canvas';
import './styles.scss';

export const Main = () => {
	return (
		<div className="main-wrapper">
			<Header/>
      		<Canvas/>
		</div>
	)
}

Main.displayName="Main";