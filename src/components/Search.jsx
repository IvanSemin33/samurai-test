import React, { useState } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { search, getTableData } from "../redux/actions/tableActions";
import { Search as SearchIcon } from "@material-ui/icons";

const Search = ({ search, token, getTableData }) => {
  Search.propTypes = {};

  const [value, setValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value === "") {
        getTableData({ token });
      } else {
        search({ token, value: event.target.value });
      }
    }
  };

  const onClickSearch = (value) => {
    if (value === "") {
      getTableData({ token });
    } else {
      search({ token, value: value });
    }
  };

  return (
    <TextField
      autoFocus
      id="search"
      label="Search"
      fullWidth
      type="search"
      onKeyPress={handleKeyPress}
      onChange={(event) => setValue(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onClickSearch(value)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
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
