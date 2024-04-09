import { TypeSelector } from './type';
import { Options } from './options';
import './styles.scss';

export const Left = () => {
	return (
		<div className="left-wrapper">
			<TypeSelector/>
			<Options/>
		</div>
	)
}