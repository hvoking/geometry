import SearchNode from './components/SearchNode'
import Nodes from './components/Nodes'
import GeoButtons from './components/GeoButtons'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <GeoButtons />
      <Nodes type="Points" mesh="points" />
      <SearchNode type="Search" />
    </div>
  );
}

export default App;
