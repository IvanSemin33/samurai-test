import {
  FETCH_TABLE,
  FETCH_TABLE_ERROR,
  FETCH_TABLE_SUCCESS,
  SET_TABLE_DATA,
  SET_DIALOG_OPEN,
  FETCH_DIALOG,
  FETCH_DIALOG_SUCCESS,
  FETCH_DIALOG_ERROR,
  SET_PATIENT_DATA,
} from '../types'
import { get_patient, post_patient, put_patient } from '../../API/api'
import { parsePatientData } from '../../helpers/actionsHelper'

/**
 * Set open state of dialog
 */
export const setDialogOpen = ({ open, patientId }) => (dispatch) => {
  dispatch({
    type: SET_DIALOG_OPEN,
    open,
    patientId,
  })
}

/**
 * Create new patient
 */
export const createPatient = ({ token, data }) => (dispatch) => {
  dispatch({
    type: FETCH_DIALOG,
  })

  const patientData = parsePatientData({ data, type: 'request' })

  post_patient({ token, data: patientData })
    .then((response) => {
      dispatch({
        type: FETCH_DIALOG_SUCCESS,
        response,
      })
      dispatch({
        type: SET_DIALOG_OPEN,
        open: '',
      })
    })
    .then(() => {
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
        type: FETCH_DIALOG_ERROR,
        error,
      })
    })
}

/**
 * Get patient data
 */
export const getPatientData = ({ token, id }) => (dispatch) => {
  dispatch({
    type: FETCH_DIALOG,
  })

  get_patient({ token, id })
    .then((response) => {
      dispatch({
        type: FETCH_DIALOG_SUCCESS,
        response,
      })

      const patientData = parsePatientData({
        data: response.data,
        type: 'store',
      })

      dispatch({
        type: SET_PATIENT_DATA,
        data: patientData,
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_DIALOG_ERROR,
        error,
      })
    })
}

/**
 * Update patient
 */
export const updatePatient = ({ token, data, id }) => (dispatch) => {
  dispatch({
    type: FETCH_DIALOG,
  })

  const patientData = parsePatientData({ data, type: 'request' })

  put_patient({ token, data: patientData, id })
    .then((response) => {
      dispatch({
        type: FETCH_DIALOG_SUCCESS,
        response,
      })
      dispatch({
        type: SET_DIALOG_OPEN,
        open: '',
      })
    })
    .then(() => {
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
        type: FETCH_DIALOG_ERROR,
        error,
      })
    })
}
