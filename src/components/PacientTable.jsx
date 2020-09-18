import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getTableData } from '../redux/actions/tableActions'
import {
  Grid,
  Button,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableHead,
  LinearProgress,
  IconButton,
} from '@material-ui/core'
import _ from 'lodash'
import { logout } from '../redux/actions/authActions'
import { deletePatient } from '../redux/actions/tableActions'
import { setDialogOpen } from '../redux/actions/dialogActions'
import DialogCreate from './DialogCreate'
import DialogEdit from './DialogEdit'
import Search from './Search'
import { Delete, Edit, EmojiPeople, ExitToApp } from '@material-ui/icons'
import moment from 'moment'

const PacientTable = ({
  getTableData,
  tableData,
  token,
  fetchInProgress,
  setDialogOpen,
  deletePatient,
  logout,
}) => {
  PacientTable.propTypes = {
    getTableData: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    fetchInProgress: PropTypes.bool.isRequired,
  }

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage)

  useEffect(() => {
    getTableData({ token })
  }, [getTableData])

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
    deletePatient({ token, id })
  }

  const onClickEditPatient = (id) => {
    setDialogOpen({ open: 'edit', patientId: id })
  }

  const onClickExit = () => {
    logout({ token })
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
                    'ID',
                    'Given name',
                    'Family name',
                    'Birth date',
                    'Gender',
                    'Address',
                    'Last Updated',
                    'Created At',
                  ].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                  <TableCell colSpan={2} key="search">
                    <Search />
                  </TableCell>
                </TableRow>
              </TableHead>
              {!_.isEmpty(tableData) && !fetchInProgress && (
                <TableBody>
                  {tableData
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
              )}
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
  tableData: state.table.data,
  token: state.auth.token,
  fetchInProgress: state.table.fetchInProgress,
})

const mapDispatchToProps = {
  getTableData,
  setDialogOpen,
  deletePatient,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(PacientTable)
