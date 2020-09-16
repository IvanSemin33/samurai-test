import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  LOGIN,
  LOGOUT,
} from "../types";

const initialState = {
  fetchInProgress: true,
  error: {},
  authorized: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH: {
      return {
        ...state,
        fetchInProgress: true,
      };
    }
    case FETCH_AUTH_SUCCESS: {
      return {
        ...state,
        fetchInProgress: false,
        error: {},
        response: action.response,
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
        authorized: false,
        response: action.response,
      };
    }
    case LOGIN: {
      return {
        ...state,
        authorized: true,
        token: action.token,
        fetchInProgress: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        authorized: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
