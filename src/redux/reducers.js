import { createReducer } from "redux-starter-kit"
import { saveArtist, removeArtist, changeSearchQuery } from "./actions"

const localStorageKey = "reduxStore"

function saveStateToLocalStorage(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

const getInitialState = () => {
  console.log("in getInitialState")
  let localStorageState

  try {
    if (typeof localStorage !== `undefined`) {
      localStorageState = JSON.parse(localStorage.getItem(localStorageKey))
      console.log(localStorageState)
    }
  } catch (e) {
    console.error(e)
  }

  return (
    localStorageState || {
      savedArtists: [],
      searchQuery: "Tiger",
    }
  )
}

const createRootReducer = () => {
  const initialState = getInitialState()

  return createReducer(initialState, {
    [saveArtist]: (state, { payload: id }) => {
      // immer gotcha, can't destruct
      // eslint-disable-next-line
      const savedArtists = state.savedArtists
      if (!savedArtists.includes(id)) {
        savedArtists.push(id)

        saveStateToLocalStorage(state)
      }
    },
    [removeArtist]: (state, { payload: id }) => {
      const savedArtists = state.savedArtists.filter(_id => _id !== id)

      saveStateToLocalStorage(state)

      return {
        ...state,
        savedArtists,
      }
    },
    [changeSearchQuery]: (state, { payload: query }) => {
      state.searchQuery = query
      saveStateToLocalStorage(state)
    },
  })
}

export default createRootReducer
