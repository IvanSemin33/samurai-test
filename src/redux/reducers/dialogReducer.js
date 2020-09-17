import {
  FETCH_DIALOG,
  FETCH_DIALOG_ERROR,
  SET_DIALOG_OPEN,
  FETCH_DIALOG_SUCCESS,
} from "../types";

const initialState = {
  fetchInProgress: false,
  error: {},
  open: "", //edit, create
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIALOG: {
      return {
        ...state,
        fetchInProgress: true,
      };
    }
    case FETCH_DIALOG_SUCCESS: {
      return {
        ...state,
        fetchInProgress: false,
        error: {},
        response: action.response,
      };
    }
    case FETCH_DIALOG_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
        response: action.response,
      };
    }
    case SET_DIALOG_OPEN: {
      return {
        ...state,
        open: action.open,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
