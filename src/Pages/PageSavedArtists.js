import React from "react";
import Header from "../Components/Header/Header";
import { Typography } from "@material-ui/core";

const PageSavedArtists = () => {
  return (
    <>
      <Header />
      <Typography variant="h4" gutterBottom>
        Your saved Artist
      </Typography>
    </>
  );
};

export default PageSavedArtists;
