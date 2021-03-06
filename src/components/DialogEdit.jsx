import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { setDialogOpen, getPatientData, updatePatient } from '../redux/actions/dialogActions'
import { validation } from '../helpers/validation'
import _ from 'lodash'
import { labels } from '../helpers/labels'

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
  DialogEdit.propTypes = {
    open: PropTypes.string.isRequired,
    setDialogOpen: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    getPatientData: PropTypes.func.isRequired,
    patientId: PropTypes.string,
    patientData: PropTypes.object.isRequired,
    fetchInProgress: PropTypes.bool.isRequired,
    updatePatient: PropTypes.func.isRequired,
  }

  const [data, setData] = useState({ birth_date: new Date() })
  const [fieldErrors, setFieldErrors] = useState({})
  const [areErrors, setAreErrors] = useState(false)

  useEffect(() => {
    setAreErrors(_.values(fieldErrors).find((value) => value === true))
  }, [fieldErrors])

  useEffect(() => {
    patientId && getPatientData({ token, id: patientId })
  }, [patientId, token, getPatientData])

  useEffect(() => {
    setData({ ...patientData })
  }, [patientData])

  const onApply = () => {
    updatePatient({ token, data, id: patientId })
  }

  const onClose = () => {
    setDialogOpen({ open: '' })
  }

  const onChangeField = (event) => {
    const { id, value } = event.target
    setFieldErrors({ ...fieldErrors, [id]: !validation({ id, value }) })
    setData({ ...data, [id]: value })
  }

  const onChangeDateField = ({ id, date }) => {
    setFieldErrors({ ...fieldErrors, [id]: !validation({ id, value: date }) })
    setData({ ...data, [id]: date })
  }

  return (
    <div>
      {!fetchInProgress && (
        <Dialog open={open === 'edit'} onClose={onClose} fullWidth>
          <DialogTitle>Patient Info</DialogTitle>
          <DialogContent>
            <Grid container direction="column" justify="center" alignContent="center" spacing={2}>
              <Grid item className="dialog_field">
                <TextField
                  autoFocus
                  id="given_name"
                  label={labels.given_name}
                  fullWidth
                  onChange={onChangeField}
                  value={data?.given_name}
                  error={fieldErrors.given_name}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="family_name"
                  label={labels.family_name}
                  fullWidth
                  onChange={onChangeField}
                  value={data?.family_name}
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
                    label={labels.birth_date}
                    format="YYYY-MM-DD"
                    value={data?.birth_date}
                    InputAdornmentProps={{ position: 'end' }}
                    onChange={(date) => onChangeDateField({ id: 'birth_date', date })}
                    fullWidth
                    required
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item>
                <TextField
                  id="gender"
                  label={labels.gender}
                  fullWidth
                  onChange={onChangeField}
                  value={data?.gender}
                  error={fieldErrors.gender}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="address"
                  label={labels.address}
                  fullWidth
                  onChange={onChangeField}
                  value={data?.address}
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
            <Button disabled={fetchInProgress || areErrors} onClick={onApply} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  open: state.dialog.open,
  patientId: state.dialog.patientId,
  token: state.auth.token,
  patientData: state.dialog.data,
  fetchInProgress: state.dialog.fetchInProgress,
})

const mapDispatchToProps = {
  setDialogOpen,
  getPatientData,
  updatePatient,
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEdit)
