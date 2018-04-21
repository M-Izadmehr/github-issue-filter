import { fromJS } from 'immutable';

import {
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  FETCHING_PENDING,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  data: {},
  loading: true,
  error: null,
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA_SUCCESS:
      return state
        .set('data', action.payload)
        .set('loading', false)
        .set('error', null);
    case FETCHING_DATA_FAILURE:
      return state
        .set('data', {})
        .set('loading', false)
        .set('error', action.payload);
    case FETCHING_PENDING:
      return state
        .set('data', {})
        .set('loading', true)
        .set('error', null);
    default:
      return state;
  }
}

export default searchReducer;
