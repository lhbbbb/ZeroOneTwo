import { combineReducers } from 'redux';
import auth from './auth';
import board from './board';
import drawer from './drawer';

const rootReducer = combineReducers({
  drawer,
  auth,
  board,
});
export default rootReducer;
