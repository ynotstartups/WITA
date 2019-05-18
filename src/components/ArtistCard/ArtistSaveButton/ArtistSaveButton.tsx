import React, { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import Favorite from "@material-ui/icons/Favorite"
import { Mutation, withApollo, Query } from "react-apollo"
import gql from "graphql-tag"

interface Props {
  id: string
}

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

const ArtistSaveButton: React.FunctionComponent<Props> = ({ id }) => {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Query query={SAVED_ARTISTS}>
      {({ data }) => {
        if (data) {
          setIsSaved(data.savedArtists.includes(id))
        }

        return (
          <Mutation mutation={TOGGLE_SAVE} variables={{ id }}>
            {toggleSave => (
              <IconButton
                onClick={e => {
                  e.stopPropagation()
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

export default withApollo(ArtistSaveButton)
