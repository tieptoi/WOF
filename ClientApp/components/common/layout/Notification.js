import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from 'material-ui/Snackbar';

import { closeNotificationMessage } from '../../../actions/notificationActions';

class Notification extends PureComponent {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.closeNotificationMessage();
  }

  render() {
    return (
      <Snackbar
        open={this.props.showMessage}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

Notification.propTypes = {
  showMessage: PropTypes.bool.isRequired,
  closeNotificationMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

const mapStateToProps = ({ notification }) => notification;

const mapDispatchToProps = dispatch => ({
  closeNotificationMessage: bindActionCreators(
    closeNotificationMessage,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
