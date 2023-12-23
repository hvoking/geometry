// App imports
import { Main } from './components';
import './styles.scss';

// Context imports
import { MainProvider } from './components/context';

export const App = () => {
  return (
    <MainProvider>
      <Main/>
    </MainProvider>
  );
}

App.displayName="App";