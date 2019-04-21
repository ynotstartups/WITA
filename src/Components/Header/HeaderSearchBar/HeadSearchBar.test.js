import React from 'react';
import { mount } from 'enzyme';
import { UnconnectedHeaderSearchBar } from './HeaderSearchBar';

it('HeaderSearchBar should call _changeSearchQuery on submit', () => {
  const mockChangeSearchQuery = jest.fn();
  mockChangeSearchQuery.mockReturnValue(new Promise(() => {}));

  const mockHistoryPush = jest.fn();

  // TODO how to global mock classes
  const headerSearchBar = mount(
    <UnconnectedHeaderSearchBar
      _changeSearchQuery={mockChangeSearchQuery}
      classes={jest.fn()}
      history={{ push: mockHistoryPush }}
    />,
  );

  headerSearchBar.find('form').simulate('submit');

  expect(mockChangeSearchQuery.mock.calls.length).toBe(1);
  expect(mockHistoryPush.mock.calls[0][0]).toBe('/search');
});
