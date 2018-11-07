import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'remote-redux-devtools';
import { handleFetchEdition } from './actions/'

browser.storage.local.get('edition').then((initState) => {
  const store = createStore(rootReducer, initState, composeWithDevTools(
    applyMiddleware(thunk)
  ));

  store.dispatch(handleFetchEdition('http://libx.org/editions/9D/49/9D49C04A/config.xml'));
  
  render( 
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('app')
  )
});