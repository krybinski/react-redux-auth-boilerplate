import { LOGIN, REGISTER, LOGOUT } from './types';

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const register = (user) => {
  return {
    type: REGISTER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
