import React from "react";
import renderer from "react-test-renderer";
import ArtistCard from "./ArtistCard";
import { MemoryRouter } from "react-router";

jest.mock("./ArtistSaveButton/ArtistSaveButton");

test("ArtistCard renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ArtistCard
          imageUrl={"artsy"}
          displayLabel={"Tiger"}
          id={"tiger"}
          href={"wow"}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
