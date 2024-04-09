// App imports
import { GuiContainer } from './gui';
import { Slider } from './slider'
import './styles.scss';

export const Right = ({ref}: any) => {
	
	return (
			<div className="right-wrapper">
				<div className="sidebar-title" style={{paddingLeft: "20px"}}>Controllers</div>
				<GuiContainer/>
				<Slider/>
			</div>
	)
}

Right.displayName="Right";