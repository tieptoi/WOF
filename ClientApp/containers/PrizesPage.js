import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import {
  getAllPrizes,
  deletePrize,
  selectAllPrizes,
  selectPrize,
  deselectAllPrizes,
  changePrizePage,
} from '../actions/prizeActions';
import { showNotificationMessage } from '../actions/notificationActions';
import PrizeList from '../components/prize/prizesPage/PrizeList';
import CircularIndeterminate from '../components/common/CircularIndeterminate';
import AlertDialog from '../components/common/AlertDialog';

class PrizesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletingPrize: {},
      openDialog: false,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseAlertDialog = this.handleCloseAlertDialog.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentDidMount() {
    if (this.props.prizes.length <= 1) {
      this.props.getAllPrizes();
    }
  }

  handleEdit(prize) {
    this.props.history.push(`/prizeEdit/${prize.id}`);
  }

  handleDelete(prize) {
    this.setState({ deletingPrize: prize, openDialog: true });
  }

  handleCloseAlertDialog(agree) {
    this.setState({ deletingPrize: {}, openDialog: false });
    if (agree) {
      this.props
        .deletePrize(this.state.deletingPrize)
        .catch(err => this.props.showNotificationMessage(err.message));
    }
  }
  // eslint-disable-next-line no-unused-vars
  handleSort(property) {
    // this.props.changePrizePage(
    //   this.props.page,
    //   this.props.rowPerPage,
    //   property,
    // );
  } // eslint-disable-line class-methods-use-this

  // eslint-disable-next-line no-unused-vars
  handleChangePage(page) {
    this.props.changePrizePage(page, this.props.sortBy, this.props.rowPerPage);
  } // eslint-disable-line class-methods-use-this

  handleChangeRowsPerPage(rowPerPage) {
    this.props.changePrizePage(this.props.page, this.props.sortBy, rowPerPage);
  }

  handleSelectAllClick() {
    if (this.props.isAllPrizesSelected) {
      this.props.deselectAllPrizes();
    } else {
      this.props.selectAllPrizes();
    }
  }

  handleRowSelect(id) {
    this.props.selectPrize(id);
  }

  render() {
    if (this.props.isLoading) {
      return <CircularIndeterminate />;
    }
    return (
      <div>
        <Typography type="display1" gutterBottom>
          Prize List
        </Typography>
        <div>
          <Button
            raised
            color="primary"
            onClick={() => this.props.history.push('/prizeEdit')}
          >
            Create a new Prize
          </Button>
        </div>
        <PrizeList
          page={this.props.page}
          sortBy={this.props.sortBy}
          rowPerPage={this.props.rowPerPage}
          totalCount={this.props.totalCount}
          prizes={this.props.prizes}
          selected={this.props.selectedPrizes}
          history={this.props.history}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onRequestSort={this.handleSort}
          onSelectAllClick={this.handleSelectAllClick}
          onRowSelect={this.handleRowSelect}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <div>
          <AlertDialog
            message="Do you want to remove this prize from your list?"
            title="Message"
            open={this.state.openDialog}
            onCloseAlertDialog={this.handleCloseAlertDialog}
          />
        </div>
      </div>
    );
  }
}

PrizesPage.propTypes = {
  page: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowPerPage: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  prizes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  getAllPrizes: PropTypes.func.isRequired,
  deletePrize: PropTypes.func.isRequired,
  selectPrize: PropTypes.func.isRequired,
  showNotificationMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  selectedPrizes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isAllPrizesSelected: PropTypes.bool.isRequired,
  deselectAllPrizes: PropTypes.func.isRequired,
  selectAllPrizes: PropTypes.func.isRequired,
  changePrizePage: PropTypes.func.isRequired,
};

PrizesPage.defaultProps = {
  prizes: [],
};

const mapStateToProps = ({ prize, ajaxCallsInProgress }) => ({
  prizes: prize.prizes,
  selectedPrizes: prize.selectedPrizes,
  totalCount: prize.totalCount,
  isAllPrizesSelected: prize.isAllPrizesSelected,
  page: prize.page,
  rowPerPage: prize.rowPerPage,
  sortBy: prize.sortBy,
  isLoading: ajaxCallsInProgress > 0,
});

const mapDispatchToProps = dispatch => ({
  changePrizePage: bindActionCreators(changePrizePage, dispatch),
  deselectAllPrizes: bindActionCreators(deselectAllPrizes, dispatch),
  selectAllPrizes: bindActionCreators(selectAllPrizes, dispatch),
  selectPrize: bindActionCreators(selectPrize, dispatch),
  getAllPrizes: bindActionCreators(getAllPrizes, dispatch),
  deletePrize: bindActionCreators(deletePrize, dispatch),
  showNotificationMessage: bindActionCreators(
    showNotificationMessage,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrizesPage);
