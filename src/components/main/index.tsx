// App imports
import { Wrapper } from '../wrapper';
import { Geometry } from './geometry';
import { Left } from './left';
import './styles.scss';

export const Main = () => {
	return (
		<Wrapper>
			<div className="main-wrapper">
				<Left/>
      			<Geometry/>
      		</div>
		</Wrapper>
	)
}

Main.displayName="Main";