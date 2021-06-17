import SearchNode from './components/SearchNode';
import Nodes from './components/node/Nodes';
import GeoButtons from './components/GeoButtons';
import Navbar from './components/Navbar';
// import Slider from './components/Slider';
import Fetcher from './components/Fetcher';
// import Spline from './components/Spline';
import { useState } from 'react';
import store from './store'
import { geometryChanged } from './actions'


function App() {
  const [nodes, setNodes] = useState([{
    name: "Points",
    active: true,
  }]);
  const deleteNode = (name) => {
    setNodes(nodes.filter(node => node.name !== name.name));
  } 

  const activeNode = (name) => {
    setNodes(nodes.map(node => node.name === name.name ? {...node, active: !node.active} : node))
  }

  store.dispatch(geometryChanged(23));
  return (
    <div className="App">
      <Navbar />
      <GeoButtons />
      <Fetcher />
      {/*<Slider />*/}
      {nodes.length > 0 && <Nodes name={nodes[0].name} active={nodes[0].active} onDelete={deleteNode} onToggle={activeNode} />}
      <SearchNode type="Search" />
    </div>
  );
}

export default App;
