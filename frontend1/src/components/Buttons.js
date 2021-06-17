import { pure } from 'recompose';
import { useState } from 'react';
import GeometryComponent from './GeometryComponent';
import PropTypes from 'prop-types'; 

const Buttons = ({ dataType }) => {
	const [type, typeSet] = useState(dataType);
	const [geometry, geometrySet] = useState('Sphere');
	const [rangeValue, rangeValueSet] = useState(25);
	const [currentGeometry, currentGeometrySet] = useState(null);

	const onClick = () => {
		typeSet(type);
		if (type !== undefined) {
	    	currentGeometrySet(GeometryComponent(type, geometry, rangeValue));
		}
	}
	const capitalizeFirstLetter = (string) => {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<div>
			<button data-type={dataType} className="geoImg" onClick={onClick}><span className={`span${capitalizeFirstLetter(dataType)}`}></span></button>
			<div>{currentGeometry}</div>
		</div>
	)
}

Buttons.defaultProps = {
  dataType: 'points', 
}

Buttons.propTypes = {
  dataType: PropTypes.string,
}

export default pure(Buttons);