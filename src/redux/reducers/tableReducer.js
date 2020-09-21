import {
  FETCH_TABLE,
  FETCH_TABLE_SUCCESS,
  FETCH_TABLE_ERROR,
  SET_TABLE_DATA,
  FETCH_DELETE,
  FETCH_DELETE_ERROR,
  FETCH_DELETE_SUCCESS,
  SET_ORDER_BY,
  SET_SEARCH_VALUE,
  SET_TABLE_INIT,
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
  orderBy: {},
  search: '',
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
    case SET_ORDER_BY: {
      return {
        ...state,
        orderBy: { ...state.orderBy, ...action.orderBy },
      }
    }
    case SET_SEARCH_VALUE: {
      return {
        ...state,
        search: action.value,
      }
    }
    case SET_TABLE_INIT: {
      return {
        ...initialState,
      }
    }
    default:
      return state
  }
}

export default authReducer
