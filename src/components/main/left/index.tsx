import { TypeSelector } from './type';
import { Options } from './options';
import { Controller } from './controller';
import { Slider } from './slider';
import './styles.scss';

export const Left = () => {
	return (
		<div className="left-wrapper">
			<TypeSelector/>
			<Slider/>
			<Options/>
			<Controller/>
		</div>
	)
}