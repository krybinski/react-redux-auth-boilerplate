import { combineReducers } from 'redux';
import AuthReducer from 'reducers/authReducer';

const reducers = combineReducers({
  auth: AuthReducer,
});

export default reducers;
