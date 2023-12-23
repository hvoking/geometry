// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters'

export const Formulas = () => {
	const { setEquation } = useFilters();

	return (
		    <div className="formulas-wrapper">
		          <div onClick={() => setEquation("Sphere")}>Sphere</div>
		          <div onClick={() => setEquation("Cube")}>Cube</div>
		          <div onClick={() => setEquation("Cylinder")}>Cylinder</div>
		          <div onClick={() => setEquation("Equation1")}>Equation1</div>
		     </div>
	)
}

Formulas.displayName="Formulas";