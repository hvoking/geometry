import SearchNode from './components/SearchNode'
import Nodes from './components/Nodes'
import GeoButtons from './components/GeoButtons'
import Navbar from './components/Navbar'
import Slider from './components/Slider'

function App() {
  return (
    <div className="App">
      <Navbar />
      <GeoButtons />
      <Slider />
      <Nodes output="Points" name="Points" />
      <SearchNode />
    </div>
  );
}

export default App;
