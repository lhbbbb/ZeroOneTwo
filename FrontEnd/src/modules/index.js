import { combineReducers } from 'redux';
import auth from './auth';
import receipt from './receipt';
import drawer from './drawer';

const rootReducer = combineReducers({ drawer, auth });
export default rootReducer;
