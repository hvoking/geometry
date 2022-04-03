import './styles.scss';
import Navbar from './components/navbar/index';
import Canvas from './components/canvas/index';
import Urange from './components/ranges/index';
import GeoButtons from './components/geoButtons/index';
import { TypeProvider, GeometryProvider, QuantityProvider, SceneProvider, ColorProvider } from './hooks/index'

const App = () => {
  return (
    <div>
    <TypeProvider>
      <GeometryProvider>
        <QuantityProvider>
          <SceneProvider>
            <ColorProvider>
                <Navbar/>
                <Canvas/>
                <GeoButtons/>
                <Urange/>
              </ColorProvider>
          </SceneProvider>
        </QuantityProvider>
      </GeometryProvider>
    </TypeProvider>
    </div>
  );
}

App.displayName="App";
export default App;