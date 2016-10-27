// Store for native

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk    from 'redux-thunk';
import reducers from '../reducers';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

var reducer = combineReducers({reducers});
// var reducer = combineReducers({reducers, navigationState});

export default function configureStore() {
  return createStoreWithMiddleware(reducer);
}
