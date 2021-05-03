import SearchNode from './components/SearchNode'
import Nodes from './components/Nodes'

function App() {
  return (
    <div className="App">
      <Nodes type="Points" mesh="points" />
      <SearchNode type="Search" />
    </div>
  );
}

export default App;
