import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';

describe('Home Page', () => {
  it('should render the homepage', () => {
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
    const renderedComponent = shallow(
      <HomePage data={fakeData} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
