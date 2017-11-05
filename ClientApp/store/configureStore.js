import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducer from '../reducers/index';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middleware = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}

function configureStoreDev(initialState) {
  // Build the middleware for intercepting and dispatching navigation actions
  const reactRouterMiddleware = routerMiddleware(history);
  const middleware = [
    // Add other middleware on this line...
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
  ];
  // add support for Redux dev tools
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
  return store;
}
const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
