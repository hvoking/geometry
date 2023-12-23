// App imports
import { Buttons } from './buttons';
import './styles.scss';

export const Controllers = () => {
	return (
		<div className="geometry-buttons">
			<Buttons datatype="points"/>
			<Buttons datatype="lines"/>
			<Buttons datatype="mesh"/>
		</div>
	)
}

Controllers.displayName="Controllers";