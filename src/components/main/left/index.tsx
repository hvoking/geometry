import { TypeSelector } from './type';
import { Options } from './options';
import { GuiContainer } from './gui';
import { Slider } from './slider';
import './styles.scss';

export const Left = () => {
	return (
		<div className="left-wrapper">
			<div className="selectors-wrapper">
				<TypeSelector/>
				<Options/>
			</div>
			<div className="right-wrapper">
				<div className="sidebar-title">Controllers</div>
				<GuiContainer/>
				<Slider/>
			</div>
		</div>
	)
}