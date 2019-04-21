import React from 'react';
import renderer from 'react-test-renderer';
import ArtistCard from './ArtistCard';

jest.mock('./ArtistSaveButton/ArtistSaveButton');

test('ArtistCard renders correctly', () => {
  const tree = renderer
    .create(<ArtistCard imageUrl="artsy" displayLabel="Tiger" id="tiger" href="wow" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
