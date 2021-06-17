import { useType } from '../Context/type'
import './Buttons.scss'

const Buttons = ({datatype}: {datatype: string}) => {
	const {toogleType} = useType();

	const capitalizeFirstLetter = (string: string) => {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}
	const onClick = (e: any) => {
		toogleType(e.currentTarget.dataset.type)
	}

	return (
		<div>
			<button onClick={onClick} data-type={datatype} className="geoImg"><span className={`span${capitalizeFirstLetter(datatype)}`}></span></button>
		</div>
	)
}

Buttons.displayName="Buttons";
export default Buttons;