import { fromJS } from 'immutable';

import {
  GET_DATA_FETCHING_DATA_FAILURE,
  GET_DATA_FETCHING_DATA_SUCCESS,
  GET_DATA_FETCHING_PENDING,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  data: {},
  loading: true,
  error: null,
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FETCHING_DATA_SUCCESS:
      return state
        .set('data', action.payload)
        .set('loading', false)
        .set('error', null);
    case GET_DATA_FETCHING_DATA_FAILURE:
      return state
        .set('data', {})
        .set('loading', false)
        .set('error', action.payload);
    case GET_DATA_FETCHING_PENDING:
      return state
        .set('data', {})
        .set('loading', true)
        .set('error', null);
    default:
      return state;
  }
}

export default searchReducer;
