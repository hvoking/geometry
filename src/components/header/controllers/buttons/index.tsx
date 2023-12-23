// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../../context/filters';

export const Buttons = ({ datatype }: any) => {
	const { setType } = useFilters();

	const capitalizeFirstLetter = (string: string) => {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const onClick = (e: any) => {
		setType(e.currentTarget.dataset.type)
	}

	return (
		<div>
			<button onClick={onClick} data-type={datatype} className="geoImg">
					<span className={`span${capitalizeFirstLetter(datatype)}`}/>
			</button>
		</div>
	)
}

Buttons.displayName="Buttons";