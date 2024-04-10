// App imports
import { Main } from './components/main';
import './styles.scss';

// Context imports
import { MainProvider } from './components/main/context';

export const App = () => {
  return (
    <div className="App">
      <MainProvider>
        <Main/>
      </MainProvider>
    </div>
  );
}

App.displayName="App";