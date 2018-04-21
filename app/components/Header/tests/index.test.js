import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../index';

describe('Issues Page', () => {
  const fakeData = {
    route: '',
  };

  const fakeDataSearchPage = { ...fakeData, route: '/search/react' };
  it('should render the header', () => {
    const renderedComponent = shallow(
      <Header {...fakeData} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render the when in search apge', () => {
    const renderedComponent = shallow(
      <Header {...fakeDataSearchPage} />,
    );
    expect(renderedComponent).toMatchSnapshot();
  });
});
