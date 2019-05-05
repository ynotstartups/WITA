import ApolloClient from "apollo-boost"
import fetch from "isomorphic-fetch"

const client = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net/",
  fetch,
})

export default client
