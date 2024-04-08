// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters';

export const TypeSelector = () => {
	const { setType } = useFilters();

	return (
		<div className="type-selector">
			<div onClick={() => setType("points")}>Points</div>
			<div onClick={() => setType("lines")}>Lines</div>
			<div onClick={() => setType("mesh")}>Mesh</div>
		</div>
	)
}

TypeSelector.displayName="TypeSelector";