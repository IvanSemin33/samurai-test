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
  Grid,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { setDialogOpen, createPatient } from "../redux/actions/dialogActions";
import { validation } from "../helpers/validation";
import _ from "lodash";

const DialogCreate = ({
  open,
  setDialogOpen,
  createPatient,
  token,
  fetchInProgress,
}) => {
  DialogCreate.propTypes = {};

  const [data, setData] = useState({ birth_date: new Date() });
  const [fieldErrors, setFieldErrors] = useState({
    given_name: true,
    family_name: true,
    gender: true,
    address: true,
  });
  const [areErrors, setAreErrors] = useState(false);

  useEffect(() => {
    setAreErrors(_.values(fieldErrors).find((value) => value === true));
  }, [fieldErrors]);

  const onCreate = () => {
    createPatient({ token, data });
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
      <Dialog open={open === "create"} onClose={onClose} fullWidth>
        <DialogTitle>New Patient Info</DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item className="dialog_field">
              <TextField
                autoFocus
                id="given_name"
                label="Given name"
                fullWidth
                onChange={onChangeField}
                error={fieldErrors.given_name}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id="family_name"
                label="Family name"
                fullWidth
                onChange={onChangeField}
                error={fieldErrors.family_name}
                required
              />
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  id="birth_date"
                  autoOk
                  variant="inline"
                  label="Birth date"
                  format="YYYY-MM-DD"
                  value={data.birth_date}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(date) =>
                    onChangeDateField({ id: "birth_date", date })
                  }
                  fullWidth
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <TextField
                id="gender"
                label="Gender"
                fullWidth
                onChange={onChangeField}
                error={fieldErrors.gender}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id="address"
                label="Address"
                fullWidth
                onChange={onChangeField}
                error={fieldErrors.address}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            color="primary"
            disabled={fetchInProgress || areErrors}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.dialog.open,
  token: state.auth.token,
  fetchInProgress: state.dialog.fetchInProgress,
});

const mapDispatchToProps = {
  setDialogOpen,
  createPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogCreate);
