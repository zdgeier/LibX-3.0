import { combineReducers } from 'redux'
import { SET_LINKS, SET_EDITION } from '../actions'

const links = (state = [], action) => {
  switch (action.type) {
    case SET_LINKS:
      return action.links
    default:
      return state
  }
}

const edition = (state = "", action) => {
  switch (action.type) {
    case SET_EDITION:
      return action.edition
    default:
      return state
  }
}

const rootReducer = combineReducers({
  edition,
  links
})

export default rootReducer
