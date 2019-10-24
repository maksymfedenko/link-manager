/* eslint-env jest */

import { shallow } from 'enzyme';
import React from 'react';

import { HomePage } from 'pages/index';

describe('With Enzyme', () => {
  it('Index shows "Index page"', () => {
    const app = shallow(<HomePage />);

    expect(app.find('h1').text()).toEqual('Index page');
  });
});
