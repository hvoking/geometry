import './App.scss';
import Navbar from './components/navbar/Navbar';
import Canvas from './components/canvas/Canvas';
import Urange from './components/ranges/Urange';
import GeoButtons from './components/geoButtons/GeoButtons';
import { TypeProvider } from './components/Context/type';
import { GeometryProvider } from './components/Context/geometry';
import { QuantityProvider } from './components/Context/quantity';
import { SceneProvider } from './components/Context/scene';
import { ColorProvider } from './components/Context/colors';

const App = () => {
  return (
    <div>
    <TypeProvider>
      <GeometryProvider>
        <QuantityProvider>
          <SceneProvider>
            <ColorProvider>
                <Navbar />
                <Canvas />
                <GeoButtons />
                <Urange />
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