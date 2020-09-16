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
} from "@material-ui/core";
import _ from "lodash";

const PacientTable = ({ getTableData, tableData, token, fetchInProgress }) => {
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

  return (
    <>
      {_.isEmpty(tableData) && fetchInProgress && <LinearProgress />}
      {!_.isEmpty(tableData) && !fetchInProgress && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {[
                        "ID",
                        "Name",
                        "Age",
                        "Last Updated",
                        "Created At",
                        "Delete",
                      ].map((header) => (
                        <TableCell key={header}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((pacient) => (
                        <TableRow hover key={pacient.resource.id}>
                          <TableCell align="left">
                            {pacient?.resource?.id}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.name &&
                              pacient?.resource?.name[0]?.given[0]}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.age}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.meta?.lastUpdated}
                          </TableCell>
                          <TableCell align="left">
                            {pacient?.resource?.meta?.createdAt}
                          </TableCell>
                          <TableCell align="left">
                            <Button>X</Button>
                          </TableCell>
                        </TableRow>
                      ))}
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
            </Paper>
          </Grid>
        </Grid>
      )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(PacientTable);
