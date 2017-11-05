import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { getPrize, updatePrize, createPrize } from '../actions/prizeActions';
import { showNotificationMessage } from '../actions/notificationActions';
import PrizeForm from '../components/prize/PrizeForm';
import CircularIndeterminate from '../components/common/CircularIndeterminate';

import Styles from '../components/common/style/Styles';

class PrizeEditPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFirstLoad = this.isFirstLoad.bind(this);
  }

  componentDidMount() {
    if (this.isFirstLoad()) {
      this.props.getPrize(this.props.match.params.id).catch((err) => {
        this.props.history.push('/prizes/');
      });
    }
  }

  handleSubmit(values) {
    const { id } = this.props.match.params;
    // Update Existing Prize
    if (id) {
      return new Promise((resolve, reject) => {
        this.props.updatePrize(values).then(
          () => {
            resolve(this.props.history.push('/prizes'));
          },
          (err) => {
            if (
              typeof err.response.data === 'string' ||
              err.response.data instanceof String
            ) {
              resolve(this.props.showNotificationMessage(err.response.data));
            } else if (err.response.status == 400) {
              reject(new SubmissionError({
                ...err.response.data,
                _error: 'Update failed!',
              }));
            }
            reject(err);
          },
        );
      });
    }
    // Create New Prize
    return new Promise((resolve, reject) => {
      this.props.createPrize(values).then(
        () => {
          resolve(this.props.history.push('/prizes'));
        },
        (err) => {
          if (
            typeof err.response.data === 'string' ||
            err.response.data instanceof String
          ) {
            resolve(this.props.showNotificationMessage(err.response.data));
          } else if (err.response.status == 400) {
            reject(new SubmissionError({
              ...err.response.data,
              _error: 'Created failed!',
            }));
          }
          reject(err);
        },
      );
    });
  }

  isFirstLoad() {
    const { id } = this.props.match.params;
    if (this.props.prize.id && id && this.props.prize.id != id) {
      return true;
    }
    return false;
  }

  render() {
    if (this.isFirstLoad()) {
      return <CircularIndeterminate />;
    }
    const { classes, prize } = this.props;
    return (
      <Paper className={classes.form}>
        <Typography type="display1" gutterBottom>
          {prize.id > 0 && 'Update Prize'}
          {prize.id <= 0 && 'Create Prize'}
        </Typography>
        <PrizeForm
          onSubmit={this.handleSubmit}
          initialValues={this.props.prize}
          values={this.props.prize}
          submitting={this.props.isLoading}
        />
      </Paper>
    );
  }
}

PrizeEditPage.propTypes = {
  history: PropTypes.object.isRequired,
  getPrize: PropTypes.func.isRequired,
  createPrize: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  prize: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    chances: PropTypes.number,
    isActive: PropTypes.bool,
  }),
  updatePrize: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showNotificationMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

PrizeEditPage.defaultProps = {
  prize: {
    id: -1,
    name: '',
    description: '',
    quantity: 0,
    chances: 0,
    isActive: true,
  },
};

const mapStateToProps = ({ prizes, ajaxCallsInProgress }, ownProps) => {
  if (prizes.length > 0) {
    return {
      prize: prizes.find(prize => prize.id == ownProps.match.params.id),
      isLoading: ajaxCallsInProgress > 0,
    };
  }
  return { isLoading: ajaxCallsInProgress > 0 };
};

const mapDispatchToProps = dispatch => ({
  updatePrize: bindActionCreators(updatePrize, dispatch),
  createPrize: bindActionCreators(createPrize, dispatch),
  getPrize: bindActionCreators(getPrize, dispatch),
  showNotificationMessage: bindActionCreators(
    showNotificationMessage,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(PrizeEditPage));
