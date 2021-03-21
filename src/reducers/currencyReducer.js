import { SET_CURRENCY } from '../constants';

const currencyReducer = (state, action) => {
  if (action.type === SET_CURRENCY) {
    return action.payload;
  }

  return state;
};

export default currencyReducer;
