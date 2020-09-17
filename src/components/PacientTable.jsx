import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getTableData } from "../redux/actions/tableActions";
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
} from "@material-ui/core";
import _ from "lodash";
import { deletePatient } from "../redux/actions/tableActions";
import { setDialogOpen } from "../redux/actions/dialogActions";
import DialogCreate from "./DialogCreate";
import DialogEdit from "./DialogEdit";
import Search from "./Search";
import { Delete } from "@material-ui/icons";

const PacientTable = ({
  getTableData,
  tableData,
  token,
  fetchInProgress,
  setDialogOpen,
  deletePatient,
}) => {
  PacientTable.propTypes = {
    getTableData: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired,
    fetchInProgress: PropTypes.bool.isRequired,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getTableData({ token });
  }, [getTableData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickCreatePatient = () => {
    setDialogOpen({ open: "create" });
  };

  const onClickDeletePatient = (id) => {
    deletePatient({ token, id });
  };

  const onClickEditPatient = (id) => {
    setDialogOpen({ open: "edit", patientId: id });
  };

  return (
    <>
      {_.isEmpty(tableData) && fetchInProgress && <LinearProgress />}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClickCreatePatient}
          >
            Create Patient
          </Button>
        </Grid>
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "ID",
                      "Given name",
                      "Family name",
                      "Birth date",
                      "Gender",
                      "Address",
                      "Last Updated",
                      "Created At",
                      "Delete",
                    ].map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {!_.isEmpty(tableData) && !fetchInProgress && (
                  <TableBody>
                    {tableData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((pacient) => (
                        <TableRow
                          hover
                          key={pacient?.resource?.id}
                          onClick={() =>
                            onClickEditPatient(pacient?.resource?.id)
                          }
                        >
                          <TableCell align="left">
                            {pacient?.resource?.id}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.name &&
                              pacient?.resource?.name[0]?.given[0]}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.name &&
                              pacient?.resource?.name[0]?.family}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.birthDate}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.gender}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.address &&
                              pacient?.resource?.address[0]?.line[0]}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.meta?.lastUpdated}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.meta?.createdAt}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              onClick={() =>
                                onClickDeletePatient(pacient?.resource?.id)
                              }
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
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
          </Paper>
        </Grid>
      </Grid>
      <DialogCreate />
      <DialogEdit />
    </>
  );
};

const mapStateToProps = (state) => ({
  tableData: state.table.data,
  token: state.auth.token,
  fetchInProgress: state.table.fetchInProgress,
});

const mapDispatchToProps = {
  getTableData,
  setDialogOpen,
  deletePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(PacientTable);
