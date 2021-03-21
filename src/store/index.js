import { useReducer, createContext } from 'react';
import { cartReducer, currencyReducer, loadingReducer } from '../reducers';

const initialState = {
  cart: { isOpen: false, items: {} },
  currency: { current: 'USD', previous: 'USD' },
  loading: false,
};

const AppContext = createContext({ state: initialState, dispatch: () => {} });

const mainReducer = (state, action) => ({
  cart: cartReducer(state.cart, action),
  currency: currencyReducer(state.currency, action),
  loading: loadingReducer(state.loading, action),
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
