import React, { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import Favorite from "@material-ui/icons/Favorite"
import PropTypes from "prop-types"
import { Mutation, withApollo, Query } from "react-apollo"
import gql from "graphql-tag"

const SAVED_ARTISTS = gql`
  {
    savedArtists @client
  }
`

const TOGGLE_SAVE = gql`
  mutation ToggleSave($id: String!) {
    toggleSave(id: $id) @client
  }
`

function ArtistSaveButton({ id, client }) {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Query query={SAVED_ARTISTS}>
      {({ loading, error, data }) => {
        if (data) {
          setIsSaved(data.savedArtists.includes(id))
        }

        return (
          <Mutation mutation={TOGGLE_SAVE} variables={{ id }}>
            {toggleSave => (
              <IconButton
                onClick={() => {
                  toggleSave().then(({ data }) => {
                    // toggleSave is returned by resolver
                    // is it possible to change name
                    setIsSaved(data.toggleSave)
                  })
                }}
              >
                <Favorite color={isSaved ? "secondary" : "inherit"} />
              </IconButton>
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

ArtistSaveButton.propTypes = {
  id: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
}

export default withApollo(ArtistSaveButton)
