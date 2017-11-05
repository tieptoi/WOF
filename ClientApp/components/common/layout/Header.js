import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { openSideNav, closeSideNav } from '../../../actions/sideNavActions';
import Styles from '../style/Styles';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(isOpen) {
    if (isOpen) {
      this.props.openSideNav();
    } else {
      this.props.closeSideNav();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar
        className={classNames(
          classes.appBar,
          this.props.open && classes.appBarShift,
        )}
      >
        <Toolbar disableGutters={!this.props.open}>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.handleToggle}
            className={classNames(
              classes.menuButton,
              this.props.open && classes.hide,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            AMPerks
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  openSideNav: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired,
  //   isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { isLoading: state.ajaxCallsInProgress > 0, open: state.sideNav.open };
}

function mapDispatchToProps(dispatch) {
  return {
    openSideNav: bindActionCreators(openSideNav, dispatch),
    closeSideNav: bindActionCreators(closeSideNav, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(Header));
