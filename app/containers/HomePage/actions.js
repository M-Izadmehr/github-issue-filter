import { GET_DATA, CHANGE_REPOSITORY } from './constants';

export function getRepositoryData(payload) {
  return {
    type: GET_DATA,
    payload,
  };
}

export function changeRepository(payload) {
  return {
    type: CHANGE_REPOSITORY,
    payload,
  };
}
