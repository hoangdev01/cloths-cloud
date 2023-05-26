import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducers } from '../reduces/authReduce';
import {
  LOCAL_STORAGE_ACCESS_TOKEN_NAME,
  LOCAL_STORAGE_REFRESH_TOKEN_NAME,
} from './constants';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducers, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    role: null,
  });
  // Authenticate user
  const loadUser = async () => {
    dispatch({
      type: 'SET_LOADING',
      payload: { isAuthenticated: false, user: null },
    });
    if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-user`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user,
            role: response.data.role,
          },
        });
      } else
        dispatch({
          type: 'SET_STOP_LOAD',
          payload: {
            isAuthenticated: false,
            user: null,
            role: null,
          },
        });
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null,
          role: null,
        },
      });
    }
  };
  useEffect(() => loadUser(), []);

  // login
  const loginUser = async userForm => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_NAME,
          response.data.token.accessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_REFRESH_TOKEN_NAME,
          response.data.token.refreshToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // register
  const registerUser = async registerForm => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, registerForm);
      // await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //verify token
  const verifyToken = async tokenForm => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-email`, tokenForm);
      // const response = await axios.post(
      //   `http://localhost:4000/verify-email`,
      //   tokenForm
      // );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_NAME,
          response.data.token.accessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_REFRESH_TOKEN_NAME,
          response.data.token.refreshToken
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //forget password
  const forgetPassword = async forgetPasswordForm => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/forget-password`,
        forgetPasswordForm
      );
      // await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //reset password
  const resetPassword = async resetPasswordForm => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password`,
        resetPasswordForm
      );
      // await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //logout
  const logoutUser = async () => {
    try {
      if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
        localStorage.clear();
        setAuthToken(null);
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
      return { success: true, message: 'Logged out' };
    } catch (error) {
      if (error) return error;
    }
  };

  const authContextData = {
    verifyToken,
    registerUser,
    loginUser,
    authState,
    logoutUser,
    forgetPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
