import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
  TableBody,
  TableRow,
  TableFooter,
  TablePagination,
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import PriceListRow from './PrizeListRow';
import PriceListHead from './PrizeListHead';
import PriceListToolbar from './PriceListToolbar';
import Styles from '../../../components/common/style/Styles';

class PrizesList extends Component {
  constructor(pros) {
    super(pros);
    this.isSelected = this.isSelected.bind(this);
  }

  isSelected(id) {
    return this.props.selected.indexOf(id) !== -1;
  }

  render() {
    const {
      prizes,
      onEdit,
      onDelete,
      classes,
      onRequestSort,
      onSelectAllClick,
      onRowSelect,
      selected,
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
            <PriceListToolbar numSelected={selected.length} />
            <Table>
              <PriceListHead
                onRequestSort={onRequestSort}
                numSelected={selected.length}
                onSelectAllClick={onSelectAllClick}
                order="asc"
                orderBy="id"
                rowCount={prizes.length}
              />
              <TableBody>
                {prizes.map((prize) => {
                  const isSelected = this.isSelected(prize.id);
                  return (
                    <PriceListRow
                      prize={prize}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      key={prize.id}
                      isSelected={isSelected}
                      onRowSelect={onRowSelect}
                    />
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={13}
                    rowsPerPage={3}
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
  selected: PropTypes.array,
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRowSelect: PropTypes.func.isRequired,
};

PrizesList.defaultProps = {
  prizes: [],
  selected: [],
};

export default withStyles(Styles)(PrizesList);
