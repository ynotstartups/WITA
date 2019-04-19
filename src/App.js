import React from "react";
import { Route, Switch } from "react-router-dom";
import PageSavedArtists from "./Pages/PageSavedArtists";
import PageSearch from "./Pages/PageSearch";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={PageSavedArtists} />
      <Route path="/search" component={PageSearch} />
    </Switch>
  );
};

export default App;
