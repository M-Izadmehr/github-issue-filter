import { GET_ISSUES } from './constants';

export function getRepositoryIssues(name, search) {
  return {
    type: GET_ISSUES,
    name,
    search,
  };
}
