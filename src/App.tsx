import { Provider } from 'react-redux';
import { store } from './store';

import './App.css';
import AppRouter from './components/router';
import { FC } from 'react';

const App: FC = () => {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
