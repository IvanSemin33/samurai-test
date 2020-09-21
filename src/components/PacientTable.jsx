import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getTableData } from '../redux/actions/tableActions'
import {
  Grid,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableHead,
  LinearProgress,
  IconButton,
  TableSortLabel,
} from '@material-ui/core'
import _ from 'lodash'
import { logout } from '../redux/actions/authActions'
import { search, deletePatient, setOrderBy } from '../redux/actions/tableActions'
import { setDialogOpen } from '../redux/actions/dialogActions'
import DialogCreate from './DialogCreate'
import DialogEdit from './DialogEdit'
import Search from './Search'
import { Delete, Edit, EmojiPeople, ExitToApp } from '@material-ui/icons'
import moment from 'moment'
import { labels } from '../helpers/labels'

const PacientTable = ({
  authFetchInProgress,
  deletePatient,
  fetchInProgress,
  getTableData,
  logout,
  setDialogOpen,
  setOrderBy,
  tableData,
  token,
  orderBy,
  searchValue,
  search,
}) => {
  PacientTable.propTypes = {
    authFetchInProgress: PropTypes.bool.isRequired,
    deletePatient: PropTypes.func.isRequired,
    fetchInProgress: PropTypes.bool.isRequired,
    getTableData: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setDialogOpen: PropTypes.func.isRequired,
    setOrderBy: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    orderBy: PropTypes.object.isRequired,
    searchValue: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = fetchInProgress
    ? rowsPerPage
    : rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage)

  useEffect(() => {
    setPage(0)
    if (searchValue) {
      search({ token, value: searchValue, orderBy })
    } else {
      getTableData({ token, orderBy })
    }
  }, [search, getTableData, token, orderBy, searchValue])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onClickCreatePatient = () => {
    setDialogOpen({ open: 'create' })
  }

  const onClickDeletePatient = (id) => {
    setPage(0)
    deletePatient({ token, id })
  }

  const onClickEditPatient = (id) => {
    setDialogOpen({ open: 'edit', patientId: id })
  }

  const onClickExit = () => {
    logout({ token })
  }

  const handleSort = (id) => {
    switch (orderBy[id]) {
      case 'asc':
        setOrderBy({ [id]: 'desc' })
        break
      case 'desc':
        setOrderBy({ [id]: false })
        break
      case false:
        setOrderBy({ [id]: 'asc' })
        break
      default:
        setOrderBy({ [id]: 'asc' })
        break
    }
  }

  return (
    <>
      {fetchInProgress && <LinearProgress />}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className="grid-container_table"
      >
        <Grid
          item
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={2}
          className="grid-container_table"
        >
          <Grid item>
            <Button
              startIcon={<EmojiPeople />}
              variant="outlined"
              color="primary"
              onClick={onClickCreatePatient}
            >
              Create Patient
            </Button>
          </Grid>
          <Grid item>
            <Button
              endIcon={<ExitToApp />}
              variant="outlined"
              color="inherit"
              onClick={onClickExit}
              disabled={authFetchInProgress}
            >
              Exit
            </Button>
          </Grid>
        </Grid>
        <Grid item className="table">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    'id',
                    'given_name',
                    'family_name',
                    'birth_date',
                    'gender',
                    'address',
                    'last_updated',
                    'created_at',
                  ].map((headerId) => (
                    <TableCell
                      key={headerId}
                      sortDirection={orderBy[headerId] ? orderBy[headerId] : false}
                    >
                      <TableSortLabel
                        active={orderBy[headerId] ? true : false}
                        direction={orderBy[headerId] ? orderBy[headerId] : 'asc'}
                        onClick={() => handleSort(headerId)}
                      >
                        {labels[headerId]}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell colSpan={2} key="search">
                    <Search />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!_.isEmpty(tableData) &&
                  !fetchInProgress &&
                  tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((pacient) => (
                      <TableRow
                        hover
                        key={pacient?.resource?.id}
                        onDoubleClick={() => onClickEditPatient(pacient?.resource?.id)}
                      >
                        <TableCell align="left">{pacient?.resource?.id}</TableCell>
                        <TableCell align="left">
                          {pacient?.resource?.name && pacient?.resource?.name[0]?.given[0]}
                        </TableCell>
                        <TableCell align="left">
                          {pacient?.resource?.name && pacient?.resource?.name[0]?.family}
                        </TableCell>
                        <TableCell align="left">{pacient?.resource?.birthDate}</TableCell>
                        <TableCell align="left">{pacient?.resource?.gender}</TableCell>
                        <TableCell align="left">
                          {pacient?.resource?.address && pacient?.resource?.address[0]?.line[0]}
                        </TableCell>
                        <TableCell align="left">
                          {moment(pacient?.resource?.meta?.lastUpdated).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell align="left">
                          {moment(pacient?.resource?.meta?.createdAt).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => onClickDeletePatient(pacient?.resource?.id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => onClickEditPatient(pacient?.resource?.id)}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 81 * emptyRows }}>
                    <TableCell colSpan={10} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <DialogCreate />
      <DialogEdit />
    </>
  )
}

const mapStateToProps = (state) => ({
  authFetchInProgress: state.auth.fetchInProgress,
  fetchInProgress: state.table.fetchInProgress,
  tableData: state.table.data,
  token: state.auth.token,
  orderBy: state.table.orderBy,
  searchValue: state.table.search,
})

const mapDispatchToProps = {
  deletePatient,
  getTableData,
  logout,
  setDialogOpen,
  setOrderBy,
  search,
}

export default connect(mapStateToProps, mapDispatchToProps)(PacientTable)
