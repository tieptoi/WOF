import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import ActionHome from 'material-ui-icons/Home';
import AccountCircle from 'material-ui-icons/AccountCircle';
import GamePad from 'material-ui-icons/Gamepad';
import EditorAttachMoney from 'material-ui-icons/AttachMoney';
import ActionAccountBalanceWallet from 'material-ui-icons/AccountBalanceWallet';
import ActionInfo from 'material-ui-icons/Info';

import { openSideNav, closeSideNav } from '../../../actions/sideNavActions';
import Styles from '../style/Styles';

class SlideNav extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap() {
    this.props.closeSideNav();
  }

  handleRequestClose(open) {
    if (open) {
      this.props.openSideNav();
    } else {
      this.props.closeSideNav();
    }
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        type="persistent"
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
      >
        <div
          className={classes.drawerInner}
          tabIndex={0}
          role="button"
          onClick={this.handleTouchTap}
          onKeyDown={this.handleTouchTap}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ActionHome />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to="/login" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link to="/prizes" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GamePad />
                </ListItemIcon>
                <ListItemText primary="Prizes" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <ActionAccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Vouchers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EditorAttachMoney />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ActionInfo />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

SlideNav.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  openSideNav: PropTypes.func.isRequired,
  closeSideNav: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles, { withTheme: true })(SlideNav));
