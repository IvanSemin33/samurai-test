import {
  LOGIN,
  LOGOUT,
  FETCH_AUTH,
  FETCH_AUTH_ERROR,
  FETCH_AUTH_SUCCESS,
} from "../types";
import { getPatient } from "../../API/api";

/**
 * Login user
 */
export const login = ({ id, secret }) => (dispatch) => {
  dispatch({
    type: FETCH_AUTH,
  });

  getPatient({ username: id, password: secret })
    .then((response) => {
      dispatch({
        type: FETCH_AUTH_SUCCESS,
        response,
      });
      dispatch({
        type: LOGIN,
        id,
        secret,
      });
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
