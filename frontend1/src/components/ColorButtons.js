import Hue from './Hue';
import Saturation from './Saturation';

const ColorButtons = () => {
	return (
		<div className="selector">
				<Saturation />
				<Hue />
			<div>
				<input type="checkbox" id="colorsCheckBox"></input>
			</div>
		</div>
	);
}

export default ColorButtons;