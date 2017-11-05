/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Styles from '../style/Styles';

class ButtonLoading extends React.Component {
  render() {
    const {
      classes,
      loading,
      handleButtonClick,
      color,
      text,
      type,
      disabled,
    } = this.props;

    return (
      //   <div className={classes.buttonLoadingWrapper}>
      <Button
        raised
        className={classNames(!disabled && !loading && classes.buttonSuccess)}
        color={color}
        disabled={loading || disabled}
        onClick={handleButtonClick}
        type={type}
      >
        {text}

        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
      //   </div>
    );
  }
}

ButtonLoading.propTypes = {
  classes: PropTypes.object.isRequired,
  handleButtonClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonLoading.defaultProps = {
  color: 'primary',
  loading: false,
  type: 'button',
  disabled: false,
  handleButtonClick: null,
};

export default withStyles(Styles)(ButtonLoading);
