import React from "react";
import renderer from "react-test-renderer";
import ArtworkGallery from "./ArtworkGallery";

it("renders correctly", () => {
  const theme = {
    breakpoints: {
      values: {
        sm: 1,
        md: 2,
        lg: 3
      }
    }
  };
  const tree = renderer
    .create(<ArtworkGallery theme={theme} photos={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
