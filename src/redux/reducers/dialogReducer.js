import {
  FETCH_DIALOG,
  FETCH_DIALOG_ERROR,
  SET_DIALOG_OPEN,
  FETCH_DIALOG_SUCCESS,
  SET_PATIENT_DATA,
} from "../types";

const initialState = {
  fetchInProgress: false,
  error: {},
  open: "", //edit, create
  patientId: "",
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
      if (action.open) {
        return {
          ...state,
          open: action.open,
          patientId: action.patientId,
        };
      }
      return {
        ...initialState,
      };
    }
    case SET_PATIENT_DATA: {
      return {
        ...state,
        data: action.data,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
