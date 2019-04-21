import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import ArtistCard from './ArtistCard';

jest.mock('./ArtistSaveButton/ArtistSaveButton');

test('ArtistCard renders correctly', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ArtistCard imageUrl="artsy" displayLabel="Tiger" id="tiger" href="wow" />
      </MemoryRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
