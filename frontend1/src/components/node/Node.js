//@flow

import NodeInput from "./NodeInput";
import NodeOutput from "./NodeOutput";
import { FaTimes } from "react-icons/fa";

import { useContext, useState } from 'react';

import UserContext from './store';

const Node = () => {
	const user = useContext(UserContext);
	const [nodes, setNodes] = useState(user);

	const name = user.name;
	const active = user.active;
	const onDelete = (name) => {
	  setNodes(nodes.filter(node => node.name !== name.name));
	} 

	const onToggle = (name) => {
	  setNodes(nodes.map(node => node.name === name.name ? {...node, active: !node.active} : node))
	}

	return (
		<div id="mydiv4" onDoubleClick={() => onToggle(name)} >
			<div id="mydiv4header"><span></span>{ name }<FaTimes className="deleteNode" style={{ cursor: 'pointer'}} onClick={ () => onDelete(name) }/></div>
			<div className="wrapper">
				<div className="inputs">
					<NodeInput 
						connected={ ["yes", "no", "yes"] } 
						items= { active ? ["hawai", "jamaica", "paraguay"] : ["tu mama", "tu abuela", "tu perro"] } 
						display= { active ? ["hawai", "jamaica", "paraguay"] : ["tu mama", "tu abuela", "tu perro"] }
						onCompleteConnector={3}
					/>
				</div>
				<div className="outputs">
					<NodeOutput 
						connected={ ["yes", "no"] } 
						items={ ["Hello", "world"] } 
						display={ ["Escuela", "Iglesia"] }
						onStartConnector={2}
						scale={1}
						positionOffset={5} 
					/>
				</div>
			</div>
		</div>
	)
}

export default Node;
