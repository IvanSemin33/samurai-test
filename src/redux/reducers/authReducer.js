import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_ERROR,
  LOGIN,
  LOGOUT,
} from "../types";

const initialState = {
  fetchInProgress: false,
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
      };
    }
    case FETCH_AUTH_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
        authorized: false,
      };
    }
    case LOGIN: {
      return {
        ...state,
        authorized: true,
        id: action.id,
        secret: action.secret,
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
