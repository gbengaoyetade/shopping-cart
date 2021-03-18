import { useReducer, createContext } from 'react';
import { cartReducer } from '../reducers';

const initialState = {
  cart: { isOpen: false, items: {} },
};

const AppContext = createContext({ state: initialState, dispatch: () => {} });

const mainReducer = (state, action) => ({
  cart: cartReducer(state.cart, action),
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
