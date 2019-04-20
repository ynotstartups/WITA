import React from "react";
import { Route, Switch } from "react-router-dom";
import PageSavedArtists from "./Pages/PageSavedArtists";
import PageSearch from "./Pages/PageSearch";
import PageArtistGallery from "./Pages/PageArtistGallery";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={PageSavedArtists} />
      <Route path="/search" component={PageSearch} />
      <Route path="/gallery" component={PageArtistGallery} />
    </Switch>
  );
};

export default App;
