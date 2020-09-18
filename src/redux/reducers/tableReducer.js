import {
  FETCH_TABLE,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_ERROR,
  SET_TABLE_DATA,
  FETCH_DELETE,
  FETCH_DELETE_ERROR,
  FETCH_DELETE_SUCCESS,
} from '../types'

const initialState = {
  fetchInProgress: false,
  error: {},
  data: [],
  dialogCreate: { open: false },
  response: {},
  deletion: {
    fetchInProgress: false,
    error: {},
    response: {},
  },
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLE: {
      return {
        ...state,
        fetchInProgress: true,
      }
    }
    case FETCH_TABLE_SUCCESS: {
      return {
        ...state,
        fetchInProgress: false,
        error: {},
        response: action.response,
      }
    }
    case FETCH_TABLE_ERROR: {
      return {
        ...state,
        fetchInProgress: false,
        error: action.error,
        response: action.response,
      }
    }
    case SET_TABLE_DATA: {
      const { entry = [] } = action.data
      return {
        ...state,
        data: entry,
      }
    }
    case FETCH_DELETE: {
      return {
        ...state,
        deletion: {
          fetchInProgress: true,
        },
      }
    }
    case FETCH_DELETE_SUCCESS: {
      return {
        ...state,
        deletion: {
          fetchInProgress: false,
          error: {},
          response: action.response,
        },
      }
    }
    case FETCH_DELETE_ERROR: {
      return {
        ...state,
        deletion: {
          fetchInProgress: false,
          error: action.error,
          response: action.response,
        },
      }
    }
    default:
      return state
  }
}

export default authReducer
