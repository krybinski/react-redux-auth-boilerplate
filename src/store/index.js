import { createStore } from 'redux';
import reducers from 'reducers';

const devExt =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, devExt);

export default store;
