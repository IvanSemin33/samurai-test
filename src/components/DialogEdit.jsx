import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
  setDialogOpen,
  getPatientData,
  updatePatient,
} from "../redux/actions/dialogActions";
import { validation } from "../helpers/validation";
import _ from "lodash";

const DialogEdit = ({
  open,
  setDialogOpen,
  token,
  getPatientData,
  patientId,
  patientData,
  fetchInProgress,
  updatePatient,
}) => {
  DialogEdit.propTypes = {};

  const [data, setData] = useState({ birth_date: new Date() });
  const [fieldErrors, setFieldErrors] = useState({});
  const [areErrors, setAreErrors] = useState(false);

  useEffect(() => {
    setAreErrors(_.values(fieldErrors).find((value) => value === true));
  }, [fieldErrors]);

  useEffect(() => {
    patientId && getPatientData({ token, id: patientId });
  }, [patientId]);

  useEffect(() => {
    setData({ ...patientData });
  }, [patientData]);

  const onApply = () => {
    updatePatient({ token, data, id: patientId });
  };

  const onClose = () => {
    setDialogOpen({ open: "" });
  };

  const onChangeField = (event) => {
    const { id, value } = event.target;
    setFieldErrors({ ...fieldErrors, [id]: !validation({ id, value }) });
    setData({ ...data, [id]: value });
  };

  const onChangeDateField = ({ id, date }) => {
    setFieldErrors({ ...fieldErrors, [id]: !validation({ id, value: date }) });
    setData({ ...data, [id]: date });
  };

  return (
    <div>
      {!fetchInProgress && (
        <Dialog open={open === "edit"} onClose={onClose}>
          <DialogTitle>Patient Info</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              id="given_name"
              label="Given name"
              fullWidth
              onChange={onChangeField}
              value={data?.given_name}
              error={fieldErrors.given_name}
              required
            />
            <TextField
              id="family_name"
              label="Family name"
              fullWidth
              onChange={onChangeField}
              value={data?.family_name}
              error={fieldErrors.family_name}
              required
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                id="birth_date"
                autoOk
                variant="inline"
                label="Birth date"
                format="YYYY-MM-DD"
                value={data?.birth_date}
                InputAdornmentProps={{ position: "end" }}
                onChange={(date) =>
                  onChangeDateField({ id: "birth_date", date })
                }
                fullWidth
                required
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="gender"
              label="Gender"
              fullWidth
              onChange={onChangeField}
              value={data?.gender}
              error={fieldErrors.gender}
              required
            />
            <TextField
              id="address"
              label="Address"
              fullWidth
              onChange={onChangeField}
              value={data?.address}
              error={fieldErrors.address}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={fetchInProgress || areErrors}
              onClick={onClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              disabled={fetchInProgress || areErrors}
              onClick={onApply}
              color="primary"
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.dialog.open,
  patientId: state.dialog.patientId,
  token: state.auth.token,
  patientData: state.dialog.data,
  fetchInProgress: state.dialog.fetchInProgress,
});

const mapDispatchToProps = {
  setDialogOpen,
  getPatientData,
  updatePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogEdit);
