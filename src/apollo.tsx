import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const localStorageKey = "apolloStore"

interface Storage {
  savedArtists: string[]
}

function saveStateToLocalStorage(state: Storage) {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

const getLocalState = (): Storage => {
  let localStorageState: Storage

  try {
    if (typeof localStorage !== `undefined`) {
      localStorageState = JSON.parse(localStorage.getItem(localStorageKey))
    }
  } catch (e) {
    console.error(e)
  }

  return (
    localStorageState || {
      savedArtists: [],
    }
  )
}

interface Variable {
  id: string
}

const client = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net/",
  fetch,
  resolvers: {
    Mutation: {
      toggleSave: (_root, variables: Variable, { client }) => {
        const id = variables.id
        let { savedArtists } = getLocalState()
        let isSaved = false

        // save
        if (!savedArtists.includes(id)) {
          savedArtists = savedArtists.concat(id)
          isSaved = true
        } else {
          // unsave
          savedArtists = savedArtists.filter(_id => _id !== id)
          isSaved = false
        }

        client.writeData({ data: { savedArtists } })
        saveStateToLocalStorage({ savedArtists })
        return isSaved
      },
    },
  },
})

client.writeData({ data: getLocalState() })

export default client
