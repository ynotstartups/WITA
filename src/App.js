import React from 'react';
import { Router } from '@reach/router';
import PageSavedArtists from './Pages/PageSavedArtists';
import PageSearch from './Pages/PageSearch';
import PageArtistGallery from './Pages/PageArtistGallery';

const App = () => (
  <Router>
    <PageSavedArtists path="/" />
    <PageSearch path="search/:query" />
    <PageArtistGallery path="gallery/:id" />
  </Router>
);

export default App;
