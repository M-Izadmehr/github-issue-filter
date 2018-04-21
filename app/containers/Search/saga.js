import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { searchRepository } from '../../utils/api';
import { FETCHING_DATA_FAILURE, FETCHING_DATA_SUCCESS, FETCHING_PENDING, SEARCH_REPOSITORY } from './constants';


export function* getData(input) {
  yield put({ type: FETCHING_PENDING });
  try {
    const payload = yield call(request, searchRepository + input.payload);
    yield put({ type: FETCHING_DATA_SUCCESS, payload });
  } catch (err) {
    // Handle error
    yield put({ type: FETCHING_DATA_FAILURE, payload: err });
  }
}

export default function* mainAppSaga() {
  yield takeLatest(SEARCH_REPOSITORY, getData);
}
