import React from "react";
import { mount } from "enzyme";
import { HeaderSearchBar } from "./HeaderSearchBar";

it("HeaderSearchBar should call _changeSearchQuery on submit", () => {
  const mockFunction = jest.fn();
  //TODO how to global mock classes
  const headerSearchBar = mount(
    <HeaderSearchBar classes={{}} _changeSearchQuery={mockFunction} />
  );

  headerSearchBar.find("form").simulate("submit");

  expect(mockFunction.mock.calls.length).toBe(1);
});
