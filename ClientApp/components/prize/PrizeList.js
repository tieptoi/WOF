import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import PriceListRow from './PrizeListRow';
import Styles from '../../components/common/style/Styles';

class PrizesList extends Component {
  render() {
    const {
      prizes, onEdit, onDelete, classes,
    } = this.props;
    return (
      <Grid
        container
        spacing={24}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <Grid item xs={12}>
          {' '}
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Chances</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prizes.map(prize => (
                  <PriceListRow
                    prize={prize}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={prize.id}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={prizes.length}
                    rowsPerPage={8}
                    page={0}
                    /* onChangePage={this.handleChangePage} */
                    /* onChangeRowsPerPage={this.handleChangeRowsPerPage} */
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          {prizes.length == 0 && '- No Record -'}
        </Grid>
      </Grid>
    );
  }
}

PrizesList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  prizes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

PrizesList.defaultProps = {
  prizes: [],
};

export default withStyles(Styles)(PrizesList);
