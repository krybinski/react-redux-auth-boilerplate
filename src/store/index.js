import { createStore } from 'redux';
import reducers from 'reducers';

/* eslint-disable no-underscore-dangle */
const devExt =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

const store = createStore(reducers, devExt);

export default store;
