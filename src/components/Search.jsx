import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { TextField } from "@material-ui/core";
import { search, getTableData } from "../redux/actions/tableActions";

const Search = ({ search, token, getTableData }) => {
  Search.propTypes = {};

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        getTableData({ token });
      } else {
        search({ token, value: event.target.value });
      }
    }
  };

  return (
    <TextField
      autoFocus
      id="search"
      label="search"
      fullWidth
      type="search"
      onKeyPress={handleKeyPress}
    />
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = {
  search,
  getTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
