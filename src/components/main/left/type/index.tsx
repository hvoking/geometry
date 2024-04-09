// App imports
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters';

export const TypeSelector = () => {
	const { type, setType } = useFilters();

	return (
		<div style={{display: "grid", cursor: "pointer"}}>
			<div className="sidebar-title">
				Surface Type
			</div>
			<div className="type-selector">
				<div 
					onClick={() => setType("points")} 
					style={{
						backgroundColor: type === "points" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"
					}}
				>
					Points
				</div>
				<div 
					onClick={() => setType("mesh")}
					style={{
						backgroundColor: type === "mesh" ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)"
					}}
				>
					Mesh
				</div>
			</div>
		</div>
	)
}

TypeSelector.displayName="TypeSelector";