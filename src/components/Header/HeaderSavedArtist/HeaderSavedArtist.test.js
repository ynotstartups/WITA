import React from 'react';
import { mount } from 'enzyme';
import Badge from '@material-ui/core/Badge';
import { createReducer, configureStore } from 'redux-starter-kit';
import HeaderSavedArtist from './HeaderSavedArtist';

it('HeaderSavedArtist badge number equals to length of store savedArtists', () => {
  const initialState = { savedArtists: ['tiger', 'hello'] };

  const store = configureStore({ reducer: createReducer(initialState, {}) });

  const headerSavedArtist = mount(<HeaderSavedArtist store={store} />);

  expect(headerSavedArtist.find(Badge).props().badgeContent).toBe(2);
});
