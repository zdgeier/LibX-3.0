import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools';

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
