import NodeInputList from "./NodeInputList"
import NodeOutputList from "./NodeOutputList"

const Nodes = ({ name }) => {		
	return (
		<div id="mydiv4">
			<div id="mydiv4header">{ name }</div>
			<div id="app"></div>
			<div class="wrapper">
				<div class="inputs">
					<NodeInputList 
						connected={ ["yes", "no", "yes"] } 
						items= { ["hawai", "jamaica", "paraguay"] } 
						display={ ["yes", "no", "yes"] } 
						onCompleteConnector={3}
					/>
				</div>
				<div class="outputs">
					<NodeOutputList 
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

export default Nodes;
