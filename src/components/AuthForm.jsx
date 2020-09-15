import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../redux/actions/authActions";
import { TextField, Grid, Button } from "@material-ui/core";

const AuthForm = ({ login }) => {
  AuthForm.propTypes = {
    login: PropTypes.func.isRequired,
  };

  const [secret, setSecret] = useState("");
  const [id, setId] = useState("");

  const onClickLogin = () => {
    login({ secret, id });
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <TextField
          variant="outlined"
          label="Client ID"
          onChange={({ target }) => setId(target.value)}
          value={id}
        />
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          label="Client Secret"
          onChange={({ target }) => setSecret(target.value)}
          value={secret}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={onClickLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
