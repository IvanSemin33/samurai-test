import {
  LOGIN,
  LOGOUT,
  FETCH_AUTH,
  FETCH_AUTH_ERROR,
  FETCH_AUTH_SUCCESS,
} from "../types";
import { post_auth_token } from "../../API/api";

/**
 * Login user
 */
export const login = ({ id, secret }) => (dispatch) => {
  dispatch({
    type: FETCH_AUTH,
  });

  post_auth_token({ client_id: id, client_secret: secret })
    .then((response) => {
      dispatch({
        type: FETCH_AUTH_SUCCESS,
        response,
      });
      dispatch({
        type: LOGIN,
        token: response?.data?.access_token,
      });
      localStorage.setItem("token", response?.data?.access_token);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_AUTH_ERROR,
        error,
      });
    });
};

/**
 * Logout user
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

/**
 * Check user token in Local Storage
 */
export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch({
      type: LOGIN,
      token: token,
    });
  }
};
