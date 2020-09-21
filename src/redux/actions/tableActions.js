import {
  FETCH_TABLE,
  FETCH_TABLE_ERROR,
  FETCH_TABLE_SUCCESS,
  SET_TABLE_DATA,
  FETCH_DELETE,
  FETCH_DELETE_ERROR,
  FETCH_DELETE_SUCCESS,
  SET_ORDER_BY,
  SET_SEARCH_VALUE,
  SET_TABLE_INIT,
} from '../types'
import { get_patient, get_patient_$lookup, delete_patient } from '../../API/api'
import { parseSearchValue, parseOrderBy } from '../../helpers/actionsHelper'

/**
 * Get table data
 */
export const getTableData = ({ token, orderBy }) => (dispatch) => {
  dispatch({
    type: FETCH_TABLE,
  })

  const _sort = parseOrderBy(orderBy)

  get_patient({ token, _sort })
    .then((response) => {
      dispatch({
        type: FETCH_TABLE_SUCCESS,
        response,
      })
      dispatch({
        type: SET_TABLE_DATA,
        data: response.data,
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TABLE_ERROR,
        error,
      })
    })
}

/**
 * Search
 */
export const search = ({ token, value, orderBy }) => (dispatch) => {
  dispatch({
    type: FETCH_TABLE,
  })

  const sort = parseOrderBy(orderBy)
  const searchValue = parseSearchValue(value)

  get_patient_$lookup({ token, q: searchValue, sort })
    .then((response) => {
      dispatch({
        type: FETCH_TABLE_SUCCESS,
        response,
      })
      dispatch({
        type: SET_TABLE_DATA,
        data: response.data,
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TABLE_ERROR,
        error,
      })
    })
}

/**
 * Delete patient by id
 */
export const deletePatient = ({ token, id }) => (dispatch) => {
  dispatch({
    type: FETCH_DELETE,
  })

  delete_patient({ token, id })
    .then((response) => {
      dispatch({
        type: FETCH_DELETE_SUCCESS,
        response,
      })
    })
    .then(() => {
      dispatch({
        type: SET_TABLE_INIT,
      })
      dispatch({
        type: FETCH_TABLE,
      })
      get_patient({ token })
        .then((response) => {
          dispatch({
            type: FETCH_TABLE_SUCCESS,
            response,
          })
          dispatch({
            type: SET_TABLE_DATA,
            data: response.data,
          })
        })
        .catch((error) => {
          dispatch({
            type: FETCH_TABLE_ERROR,
            error,
          })
        })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_DELETE_ERROR,
        error,
      })
    })
}

/**
 * Set order by
 */
export const setOrderBy = (orderBy) => (dispatch) => {
  dispatch({
    type: SET_ORDER_BY,
    orderBy,
  })
}

/**
 * Set search value
 */
export const setSearchValue = (value) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_VALUE,
    value,
  })
}
