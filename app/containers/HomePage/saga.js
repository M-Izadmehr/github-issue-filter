import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { repositoryData } from '../../utils/api';
import {
  GET_DATA_FETCHING_DATA_FAILURE,
  GET_DATA_FETCHING_DATA_SUCCESS,
  GET_DATA_FETCHING_PENDING,
  GET_DATA,
} from './constants';


export function* getData(input) {
  yield put({ type: GET_DATA_FETCHING_PENDING });
  try {
    const payload = yield call(request, repositoryData + input.payload);
    yield put({ type: GET_DATA_FETCHING_DATA_SUCCESS, payload });
  } catch (err) {
    // Handle error
    yield put({ type: GET_DATA_FETCHING_DATA_FAILURE, payload: err });
  }
}

export default function* mainAppSaga() {
  yield takeLatest(GET_DATA, getData);
}
