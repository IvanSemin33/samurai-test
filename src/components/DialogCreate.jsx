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
  setDialogCreateOpen,
  createPatient,
} from "../redux/actions/tableActions";

const DialogCreate = ({ open, setDialogCreateOpen, createPatient, token }) => {
  DialogCreate.propTypes = {};

  const [data, setData] = useState({ birth_date: new Date() });

  const onCreate = () => {
    createPatient({ token, data });
  };

  const onClose = () => {
    setDialogCreateOpen(false);
  };

  const onChangeField = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  const onChangeDataField = ({ id, date }) => {
    setData({ ...data, [id]: date });
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>New Patient Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="given_name"
            label="Given name"
            fullWidth
            onChange={onChangeField}
          />
          <TextField
            id="family_name"
            label="Family name"
            fullWidth
            onChange={onChangeField}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id="birth_date"
              autoOk
              variant="inline"
              label="Birth date"
              format="YYYY-MM-DD"
              value={data.birth_date}
              InputAdornmentProps={{ position: "end" }}
              onChange={(date) => onChangeDataField({ id: "birth_date", date })}
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="gender"
            label="Gender"
            fullWidth
            onChange={onChangeField}
          />
          <TextField
            id="address"
            label="Address"
            fullWidth
            onChange={onChangeField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  open: state.table.dialogCreate.open,
  token: state.auth.token,
});

const mapDispatchToProps = {
  setDialogCreateOpen,
  createPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogCreate);
