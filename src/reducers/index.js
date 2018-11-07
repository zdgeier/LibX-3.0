import { combineReducers } from 'redux';
import asyncHandler from './asyncHandler.js';
import { FETCH_EDITION, SELECT_DRAWER } from '../actions';

const drawerIndex = (state = 0, action) => {
  switch(action.type) {
    case SELECT_DRAWER:
      return action.index;
    default:
      return state;
  }
}

export default combineReducers({
  edition: asyncHandler(FETCH_EDITION),
  drawerIndex: drawerIndex,
})