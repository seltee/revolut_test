import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/components/app';
import Reducer from 'src/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'scss/all.scss';

const store = createStore(
  Reducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
