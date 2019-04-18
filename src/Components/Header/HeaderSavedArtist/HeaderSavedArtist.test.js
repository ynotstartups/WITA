import React from "react";
import { mount } from "enzyme";
import HeaderSavedArtist from "./HeaderSavedArtist";
import Badge from "@material-ui/core/Badge";
import { createReducer, configureStore } from "redux-starter-kit";

it("HeaderSavedArtist badge number equals to length of store savedArtists", () => {
  const initialState = { savedArtists: ["tiger", "hello"] };

  const store = configureStore({ reducer: createReducer(initialState, {}) });

  const headerSavedArtist = mount(<HeaderSavedArtist store={store} />);

  expect(headerSavedArtist.find(Badge).props().badgeContent).toBe(2);
});
