// App imports
import { Main } from './components/main';
import './styles.scss';

// Context imports
import { MainProvider } from './components/main/context';

export const App = () => {
  return (
    <MainProvider>
      <Main/>
    </MainProvider>
  );
}

App.displayName="App";