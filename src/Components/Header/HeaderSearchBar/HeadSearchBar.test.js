import React from 'react';
import { mount } from 'enzyme';
import * as router from '@reach/router';
import { UnconnectedHeaderSearchBar } from './HeaderSearchBar';

it('HeaderSearchBar should call _changeSearchQuery on submit', () => {
  const spy = jest.spyOn(router, 'navigate');

  // TODO how to global mock classes
  const headerSearchBar = mount(<UnconnectedHeaderSearchBar classes={jest.fn()} />);

  headerSearchBar.find('form').simulate('submit');

  expect(spy.mock.calls[0][0]).toBe('/search/');
});
