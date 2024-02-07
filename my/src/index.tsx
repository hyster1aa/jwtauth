import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store/StoreLogin';
import StoreRegistration from './store/StoreRegistration';
import { BrowserRouter } from 'react-router-dom';

interface State {
  store: Store,
}

interface StateReg {
  storeRegistration: StoreRegistration,
}

const store = new Store();
const storeRegistration = new StoreRegistration();

export const Context = createContext<State>({
  store
})

export const ContextRegistration = createContext<StateReg>({
  storeRegistration
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ContextRegistration.Provider value={{storeRegistration}}>
    <Context.Provider value = {{
      store
    }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
       
    </Context.Provider>
    </ContextRegistration.Provider>
);