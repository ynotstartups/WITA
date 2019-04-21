import React from "react";
import { mount } from "enzyme";
import { UnconnectedArtistSaveButton } from "./ArtistSaveButton";
import IconButton from "@material-ui/core/IconButton";

describe("test ArtistSaveButton", () => {
  const id = "tiger";

  test("click should save if it is not saved", () => {
    const dispatchSaveArtist = jest.fn();
    const dispatchRemoveArtist = jest.fn();
    const ShallowArtistSaveButton = mount(
      <UnconnectedArtistSaveButton
        id={id}
        savedArtists={[]}
        dispatchSaveArtist={dispatchSaveArtist}
        dispatchRemoveArtist={dispatchRemoveArtist}
      />
    );

    ShallowArtistSaveButton.find("button").simulate("click");

    expect(dispatchSaveArtist.mock.calls[0][0]).toBe(id);
    expect(dispatchRemoveArtist.mock.calls.length).toBe(0);
  });

  test("click should remove if it is saved", () => {
    const dispatchSaveArtist = jest.fn();
    const dispatchRemoveArtist = jest.fn();
    const ShallowArtistSaveButton = mount(
      <UnconnectedArtistSaveButton
        id={id}
        savedArtists={[id]}
        dispatchSaveArtist={dispatchSaveArtist}
        dispatchRemoveArtist={dispatchRemoveArtist}
      />
    );

    console.log(ShallowArtistSaveButton.debug());
    ShallowArtistSaveButton.find("button").simulate("click");

    expect(dispatchSaveArtist.mock.calls.length).toBe(0);
    expect(dispatchRemoveArtist.mock.calls[0][0]).toBe(id);
  });
});
