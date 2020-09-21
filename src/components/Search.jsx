import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { setSearchValue } from '../redux/actions/tableActions'
import { Search as SearchIcon } from '@material-ui/icons'

const Search = ({ setSearchValue, searchValue }) => {
  Search.propTypes = {
    setSearchValue: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
  }

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(searchValue)
  }, [searchValue])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value)
    }
  }

  const onSearch = (value) => {
    setSearchValue(value)
  }

  return (
    <TextField
      autoFocus
      id="search"
      label="Search"
      fullWidth
      type="search"
      onKeyPress={handleKeyPress}
      onChange={(event) => setValue(event.target.value)}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => onSearch(value)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

const mapStateToProps = (state) => ({
  searchValue: state.table.search,
})

const mapDispatchToProps = {
  setSearchValue,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
