// App imports
import './styles.scss';

// Context imports
import { useFilters } from 'context/filters'

export const Options = () => {
	const { equation, setEquation } = useFilters();
	const path = process.env.PUBLIC_URL;

	return (
		<div>
			<div className="sidebar-title">
				Formula Selection
			</div>
		    <div className="formulas-wrapper">
		          <div
		          	className="formulas-image-wrapper" 
		          	onClick={() => setEquation("Sphere")}
		          	style={{
		          		backgroundColor: equation === "Sphere" ? 
		          		"rgba(0, 0, 0, 1)" : 
		          		"rgba(0, 120, 120, 0)"
		          	}}
		          >
		          	<img 
		          		className="formulas-image" 
		          		src={path + "/static/geometries/Asset1.png"} 
		          		alt="asset-1"
		          	/>
		          </div>
		          <div 
		          	className="formulas-image-wrapper" 
		          	onClick={() => setEquation("Cube")}
      	          	style={{
      	          		backgroundColor: equation === "Cube" ? 
      	          		"rgba(0, 0, 0, 1)" : 
      	          		"rgba(0, 120, 120, 0)"
      	          	}}
		          >
		          	<img 
		          		className="formulas-image" 
		          		src={path + "/static/geometries/Asset2.png"} 
		          		alt="asset-2"
		          	/>
		          </div>
		          <div 
		          	className="formulas-image-wrapper" 
		          	onClick={() => setEquation("Cylinder")}
      	          	style={{
      	          		backgroundColor: equation === "Cylinder" ? 
      	          		"rgba(0, 0, 0, 1)" : 
      	          		"rgba(0, 120, 120, 0)"
      	          	}}
		          >
		          	<img 
		          		className="formulas-image" 
		          		src={path + "/static/geometries/Asset3.png"} 
		          		alt="asset-3"
		          	/>
		          </div>
		          <div 
		          	className="formulas-image-wrapper" 
		          	onClick={() => setEquation("Equation1")}
      	          	style={{
      					backgroundColor: equation === "Equation1" ? 
      					"rgba(0, 0, 0, 1)" : 
      					"rgba(0, 120, 120, 0)"
      				}}
		          >
		          	<img 
		          		className="formulas-image" 
		          		src={path + "/static/geometries/Asset4.png"} 
		          		alt="asset-4"
		          	/>
		          </div>
		     </div>
		</div>
	)
}

Options.displayName="Options";