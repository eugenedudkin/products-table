import { Provider } from 'react-redux';
import { store } from './store';

import './App.css';
import AppRouter from './components/router';
import ModalProvider from './components/modal';
import { FC } from 'react';

const App: FC = () => {

  return (
    <Provider store={store}>
      <ModalProvider >
        <AppRouter />
      </ModalProvider>  
    </Provider>
  );
}

export default App;
