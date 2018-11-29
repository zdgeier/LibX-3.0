/*
 * TODO: 
 * Refactor SearchForm 
 * Add cleaner edition creation
 * Fix catalog loading on startup
 * Add more better dropdown names
 */

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools';
import { handleFetchEdition } from './actions/'

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

store.dispatch(handleFetchEdition(null));

render( 
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)