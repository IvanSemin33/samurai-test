import {
  FETCH_TABLE,
  FETCH_TABLE_ERROR,
  FETCH_TABLE_SUCCESS,
  SET_TABLE_DATA,
} from "../types";
import { get_patient } from "../../API/api";

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
