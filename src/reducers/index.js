import { combineReducers } from 'redux'
import { SET_LINKS } from '../actions'

const links = (state = [], action) => {
  switch (action.type) {
    case SET_LINKS:
      return action.links
    default:
      return state
  }
}

const rootReducer = combineReducers({
    links
})

export default rootReducer
