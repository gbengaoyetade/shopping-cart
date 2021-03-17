import { ADD_TO_CART, REMOVE_FROM_CART, CLOSE_CART } from '../constants';

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const newState = { items: { ...state.items }, isOpen: true };
      if (newState.items[payload.id]) {
        newState.items[payload.id] += 1;
      } else {
        newState.items[payload.id] = 1;
      }
      return newState;

    case REMOVE_FROM_CART:
      const newItems = { ...state.items };
      delete newItems[payload.id];
      return { isOpen: true, items: newItems };

    case CLOSE_CART:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

export default cartReducer;
