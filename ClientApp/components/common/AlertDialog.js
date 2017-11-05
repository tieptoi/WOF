import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose(agree) {
    this.props.onCloseAlertDialog(agree);
  }

  render() {
    const { open, title, message } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onRequestClose={() => this.handleRequestClose(false)}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleRequestClose(false)}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={() => this.handleRequestClose(true)}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AlertDialog.propTypes = {
  onCloseAlertDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertDialog;
