import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import prizes from './prizeReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import notification from './notificationReducer';
import sideNav from './sideNavReducer';

const rootReducer = combineReducers({
  prizes,
  ajaxCallsInProgress,
  notification,
  sideNav,
  routing,
  form,
});

export default rootReducer;
