import {
  FETCH_TABLE,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_ERROR,
  SET_TABLE_DATA,
} from "../types";

const initialState = {
  fetchInProgress: false,
  error: {},
  data: [],
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
      };
    }
    case FETCH_TABLE_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
      };
    }
    case SET_TABLE_DATA: {
      const { entry = [] } = action.data;
      return {
        ...state,
        data: entry,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
