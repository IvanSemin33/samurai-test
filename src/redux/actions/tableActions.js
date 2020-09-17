import {
  FETCH_TABLE,
  FETCH_TABLE_ERROR,
  FETCH_TABLE_SUCCESS,
  SET_TABLE_DATA,
  SET_DIALOG_OPEN,
  FETCH_DELETE,
  FETCH_DELETE_ERROR,
  FETCH_DELETE_SUCCESS,
  FETCH_DIALOG,
  FETCH_DIALOG_SUCCESS,
  FETCH_DIALOG_ERROR,
} from "../types";
import {
  get_patient,
  post_patient,
  get_patient_$lookup,
  delete_patient,
} from "../../API/api";
import {
  parsePatientData,
  parseSearchValue,
} from "../../helpers/actionsHelper";

/**
 * Get table data
 */
export const getTableData = ({ token }) => (dispatch) => {
  dispatch({
    type: FETCH_TABLE,
  });

  get_patient({ token })
    .then((response) => {
      dispatch({
        type: FETCH_TABLE_SUCCESS,
        response,
      });
      dispatch({
        type: SET_TABLE_DATA,
        data: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TABLE_ERROR,
        error,
      });
    });
};

/**
 * Set open state of patcient create dialog
 */
export const setDialogOpen = (open) => (dispatch) => {
  dispatch({
    type: SET_DIALOG_OPEN,
    open,
  });
};

/**
 * Create new patient
 */
export const createPatient = ({ token, data }) => (dispatch) => {
  dispatch({
    type: FETCH_DIALOG,
  });

  const patientData = parsePatientData(data);

  post_patient({ token, data: patientData })
    .then((response) => {
      dispatch({
        type: FETCH_DIALOG_SUCCESS,
        response,
      });
      dispatch({
        type: SET_DIALOG_OPEN,
        open: "",
      });
    })
    .then(() => {
      dispatch({
        type: FETCH_TABLE,
      });
      get_patient({ token })
        .then((response) => {
          dispatch({
            type: FETCH_TABLE_SUCCESS,
            response,
          });
          dispatch({
            type: SET_TABLE_DATA,
            data: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: FETCH_TABLE_ERROR,
            error,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_DIALOG_ERROR,
        error,
      });
    });
};

/**
 * Search
 */
export const search = ({ token, value }) => (dispatch) => {
  dispatch({
    type: FETCH_TABLE,
  });

  const searchValue = parseSearchValue(value);

  get_patient_$lookup({ token, q: searchValue })
    .then((response) => {
      dispatch({
        type: FETCH_TABLE_SUCCESS,
        response,
      });
      dispatch({
        type: SET_TABLE_DATA,
        data: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TABLE_ERROR,
        error,
      });
    });
};

/**
 * Delete patient by id
 */
export const deletePatient = ({ token, id }) => (dispatch) => {
  dispatch({
    type: FETCH_DELETE,
  });

  delete_patient({ token, id })
    .then((response) => {
      dispatch({
        type: FETCH_DELETE_SUCCESS,
        response,
      });
    })
    .then(() => {
      dispatch({
        type: FETCH_TABLE,
      });
      get_patient({ token })
        .then((response) => {
          dispatch({
            type: FETCH_TABLE_SUCCESS,
            response,
          });
          dispatch({
            type: SET_TABLE_DATA,
            data: response.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: FETCH_TABLE_ERROR,
            error,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_DELETE_ERROR,
        error,
      });
    });
};
