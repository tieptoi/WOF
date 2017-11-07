import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Header from './common/layout/Header';
import Notification from './common/layout/Notification';
import SlideNav from './common/layout/SlideNav';

import HomePage from '../containers/HomePage';
import LoginPage from '../containers/LoginPage';
import PrizesPage from '../containers/PrizesPage';
import PrizeEditPage from '../containers/PrizeEditPage';

import Styles from '../components/common/style/Styles';

class App extends Component {
  render() {
    const { classes, open } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header />
          <SlideNav />
          <main
            className={classNames(
              classes.content,
              open && classes.contentShift,
            )}
          >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/prizes" component={PrizesPage} />
              <Route path="/prizeEdit/:id" component={PrizeEditPage} />
              <Route path="/prizeEdit/" component={PrizeEditPage} />
            </Switch>
            <Notification />
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    location: state.routing.location,
    open: state.sideNav.open,
  };
}

export default connect(mapStateToProps)(withStyles(Styles, {
  withTheme: true,
})(App));
