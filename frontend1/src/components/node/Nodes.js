import Node from "./Node"

const Nodes = ({ name, active, onDelete, onToggle }) => {		
	return (
		<>
			<Node name={ name } active={ active } onDelete={ onDelete } onToggle={onToggle} />
		</>
	)
}

export default Nodes;
