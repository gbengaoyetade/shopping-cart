import { SET_LOADING } from '../constants';

const loadingReducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return action.payload;
  }

  return state;
};

export default loadingReducer;
