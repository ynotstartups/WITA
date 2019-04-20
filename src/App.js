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
      <Route path="/gallery/:id" component={PageArtistGallery} />
      {/* Go to PageSavedArtists when no match */}
      <Route component={PageSavedArtists} />
    </Switch>
  );
};

export default App;
