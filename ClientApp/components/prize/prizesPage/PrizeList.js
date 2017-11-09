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
      page,
      prizes,
      rowPerPage,
      totalCount,
      sortBy,
      selected,
      onEdit,
      onDelete,
      classes,
      onRequestSort,
      onSelectAllClick,
      onRowSelect,
      onChangePage,
      onChangeRowsPerPage,
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
                sortBy={sortBy}
                rowCount={totalCount}
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
                    count={totalCount}
                    rowsPerPage={rowPerPage}
                    page={page - 1}
                    onChangePage={(event, pageNo) => onChangePage(pageNo + 1)}
                    onChangeRowsPerPage={onChangeRowsPerPage}
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
  prizes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  selected: PropTypes.array,
  totalCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  rowPerPage: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRowSelect: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};

PrizesList.defaultProps = {
  prizes: [],
  selected: [],
};

export default withStyles(Styles)(PrizesList);
