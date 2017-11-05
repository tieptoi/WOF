import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import App from './App';
import '../styles/style.css';

const NonBlockApp = withRouter(App);

const theme = createMuiTheme({ drawerWidth: 240 });

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <NonBlockApp />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
