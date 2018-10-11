import { combineReducers } from 'redux';
import asyncHandler from './asyncHandler.js';
import { FETCH_EDITION } from '../actions';

const rootReducer = combineReducers({
  edition: asyncHandler(FETCH_EDITION),
})

export default rootReducer
