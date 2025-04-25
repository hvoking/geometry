// App imports
import { Main } from 'components';
import './styles.scss';

// Context imports
import { MainProvider } from 'context';

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