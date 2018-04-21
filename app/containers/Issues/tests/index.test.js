import React from 'react';
import { shallow } from 'enzyme';

import { Issues } from '../index';

describe('Issues Page', () => {
  const fakeData = {
    name: 'atom/atom',
    error: null,
    loading: false,
    location: {
      search: '?sort=comments&direction=asc&state=open&tags=bug,ui&since=2017-11-13T00:11:00+03:30',
    },
    data: [{
      id: 13,
      title: 'issue',
      created_at: '2017-11-13T00:11:00+03:30',
      updated_at: '2017-11-13T00:11:00+03:30',
      closed_at: null,
      url: 'www.google.com',
    }, {
      id: 20,
      title: 'issue2',
      created_at: '2017-11-13T00:11:00+03:30',
      updated_at: '2017-11-13T00:11:00+03:30',
      closed_at: '2017-11-13T00:11:00+03:30',
      url: 'www.google.com',
    }],
  };
  const fakeDataLoading = { ...fakeData, loading: true };
  const fakeDataNoSearch = { ...fakeData, search: '' };
  it('should render the Issues page', () => {
    const renderedComponent = shallow(
      <Issues {...fakeData} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render the loading case', () => {
    const renderedComponent = shallow(
      <Issues {...fakeDataLoading} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render the no search case', () => {
    const renderedComponent = shallow(
      <Issues {...fakeDataNoSearch} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
