import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const localStorageKey = "apolloStore"

function saveStateToLocalStorage(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

const getLocalState = () => {
  let localStorageState

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

const client = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net/",
  fetch,
  resolvers: {
    Mutation: {
      toggleSave: (_root, variables, { cache, getCacheKey, client }) => {
        const id = variables.id
        let { savedArtists } = getLocalState()
        let isSaved = null

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
