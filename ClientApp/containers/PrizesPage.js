import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { getAllPrizes, deletePrize } from '../actions/prizeActions';
import { showNotificationMessage } from '../actions/notificationActions';
import PrizeList from '../components/prize/PrizeList';
import CircularIndeterminate from '../components/common/CircularIndeterminate';
import AlertDialog from '../components/common/AlertDialog';

class PrizesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedPrize: {}, openDialog: false };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseAlertDialog = this.handleCloseAlertDialog.bind(this);
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
    this.setState({ selectedPrize: prize, openDialog: true });
  }

  handleCloseAlertDialog(agree) {
    this.setState({ selectedPrize: {}, openDialog: false });
    if (agree) {
      this.props
        .deletePrize(this.state.selectedPrize)
        .catch(err => this.props.showNotificationMessage(err.message));
    }
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
          prizes={this.props.prizes}
          history={this.props.history}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
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
  history: PropTypes.object.isRequired,
  prizes: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  getAllPrizes: PropTypes.func.isRequired,
  deletePrize: PropTypes.func.isRequired,
  showNotificationMessage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

PrizesPage.defaultProps = {
  prizes: [],
};

const mapStateToProps = ({ prizes, ajaxCallsInProgress }) => ({
  prizes,
  isLoading: ajaxCallsInProgress > 0,
});

const mapDispatchToProps = dispatch => ({
  getAllPrizes: bindActionCreators(getAllPrizes, dispatch),
  deletePrize: bindActionCreators(deletePrize, dispatch),
  showNotificationMessage: bindActionCreators(
    showNotificationMessage,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrizesPage);
