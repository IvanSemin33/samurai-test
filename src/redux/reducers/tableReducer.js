import {
  FETCH_TABLE,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_ERROR,
  SET_TABLE_DATA,
  SET_DIALOG_CREATE_OPEN,
} from "../types";

const initialState = {
  fetchInProgress: false,
  error: {},
  data: [],
  dialogCreate: { open: false },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE: {
      return {
        ...state,
        fetchInProgress: true,
      };
    }
    case FETCH_TABLE_SUCCESS: {
      return {
        ...state,
        fetchInProgress: false,
        error: {},
        response: action.response,
      };
    }
    case FETCH_TABLE_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
        response: action.response,
      };
    }
    case SET_TABLE_DATA: {
      const { entry = [] } = action.data;
      return {
        ...state,
        data: entry,
      };
    }
    case SET_DIALOG_CREATE_OPEN: {
      return {
        ...state,
        dialogCreate: { open: action.open },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
