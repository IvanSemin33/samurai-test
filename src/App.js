import React, { useEffect } from 'react'
import './App.css'
import AuthForm from './components/AuthForm'
import { connect } from 'react-redux'
import PacientTable from './components/PacientTable'
import { PropTypes } from 'prop-types'
import { checkToken } from './redux/actions/authActions'
import { LinearProgress } from '@material-ui/core'

const App = ({ authorized, checkToken, authFetchInProgress }) => {
  App.propTypes = {
    authorized: PropTypes.bool.isRequired,
    authFetchInProgress: PropTypes.bool.isRequired,
    checkToken: PropTypes.func.isRequired,
  }

  useEffect(() => {
    checkToken()
  }, [checkToken])

  return (
    <div className="App">
      {authFetchInProgress ? <LinearProgress /> : authorized ? <PacientTable /> : <AuthForm />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  authFetchInProgress: state.auth.fetchInProgress,
})

const mapDispatchToProps = {
  checkToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
