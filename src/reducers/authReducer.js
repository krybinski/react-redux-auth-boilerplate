import { LOGIN, REGISTER, LOGOUT } from 'actions/types';

const INITIAL_STATE = {
  loggedIn: false,
  user: {},
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return { ...state, loggedIn: true, user: action.payload };
    case LOGOUT:
      return { ...state, loggedIn: false, user: {} };
    default:
      return state;
  }
};

export default AuthReducer;
