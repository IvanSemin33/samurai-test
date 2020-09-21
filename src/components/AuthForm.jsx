import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { login } from '../redux/actions/authActions'
import { TextField, Grid, Button, Typography } from '@material-ui/core'
import _ from 'lodash'
import { ExitToApp as LoginToApp } from '@material-ui/icons'

/**
 * Authorization form
 */
const AuthForm = ({ login, apiError, fetchInProgress }) => {
  AuthForm.propTypes = {
    login: PropTypes.func.isRequired,
    apiError: PropTypes.object.isRequired,
    fetchInProgress: PropTypes.bool.isRequired,
  }

  const [values, setValues] = useState({ secret: '', id: '' })
  const [error, setError] = useState(false)

  useEffect(() => {
    _.isEmpty(apiError) ? setError(false) : setError(true)
  }, [apiError])

  const onClickLogin = () => {
    login({ ...values })
  }

  const handleField = (event, fieldId) => {
    setError(false)
    setValues({ ...values, [fieldId]: event.target.value })
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      className="auth_container"
    >
      <Grid item>
        <Typography variant="h6">Authorization</Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Client ID"
          onChange={(event) => handleField(event, 'id')}
          error={error}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Client Secret"
          onChange={(event) => handleField(event, 'secret')}
          type="password"
          error={error}
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClickLogin}
          disabled={fetchInProgress}
          endIcon={<LoginToApp />}
        >
          Sign in
        </Button>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  apiError: state.auth.error,
  fetchInProgress: state.auth.fetchInProgress,
})

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
