
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { store } from './src/redux/configureStore';
import Navigation from './src/Navigation';


const persistor = persistStore(store)

export default function App() { 
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store} >        
        <Navigation />
      </Provider>
    </PersistGate>
  );
}



