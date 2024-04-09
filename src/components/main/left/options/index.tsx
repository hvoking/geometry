// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters'

export const Options = () => {
	const { equation, setEquation } = useFilters();

	return (
		<div>
			<div className="sidebar-title">
				Formula Selection
			</div>
		    <div className="formulas-wrapper">
		          <div 
		          	onClick={() => setEquation("Sphere")}
		          	style={{backgroundColor: equation === "Sphere" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"}}
		          >
		          	Sphere
		          </div>
		          <div 
		          	onClick={() => setEquation("Cube")}
      	          	style={{backgroundColor: equation === "Cube" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"}}
		          >
		          	Waves1
		          </div>
		          <div 
		          	onClick={() => setEquation("Cylinder")}
      	          	style={{backgroundColor: equation === "Cylinder" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"}}
		          >
		          	Waves2
		          </div>
		          <div 
		          	onClick={() => setEquation("Equation1")}
      	          	style={{
      					backgroundColor: equation === "Equation1" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"
      				}}
		          >
		          	Waves3
		          </div>
		     </div>
		</div>
	)
}

Options.displayName="Options";