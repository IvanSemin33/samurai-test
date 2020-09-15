import React from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import { connect } from "react-redux";
import PacientTable from "./components/PacientTable";
import { PropTypes } from "prop-types";

const App = ({ authorized }) => {
  App.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };

  return (
    <div className="App">{authorized ? <PacientTable /> : <AuthForm />}</div>
  );
};

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
