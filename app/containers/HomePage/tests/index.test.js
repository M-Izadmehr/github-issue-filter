import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '../index';

describe('Home Page', () => {
  const fakeData = {
    name: 'atom/atom',
    error: null,
    loading: false,
    data: {
      name: 'atom/atom',
      stargazers_count: '40000',
      description: 'A random description',
      language: 'JavaScript',
      open_issues: '100',
    },
  };
  const fakeDataLoading = { ...fakeData, loading: true };
  it('should render the homepage', () => {
    const renderedComponent = shallow(
      <HomePage {...fakeData} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render the loading case', () => {
    const renderedComponent = shallow(
      <HomePage {...fakeDataLoading} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
