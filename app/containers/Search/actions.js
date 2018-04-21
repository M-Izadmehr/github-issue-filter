import { SEARCH_REPOSITORY } from './constants';

export function searchRepository(payload) {
  return {
    type: SEARCH_REPOSITORY,
    payload,
  };
}
