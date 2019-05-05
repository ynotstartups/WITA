import { createReducer } from "redux-starter-kit"
import { saveArtist, removeArtist } from "./actions"

const localStorageKey = "reduxStore"

function saveStateToLocalStorage(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state))
}

const getInitialState = () => {
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
      state.savedArtists.splice(
        state.savedArtists.findIndex(artist => artist === id),
        1
      )

      saveStateToLocalStorage(state)
    },
  })
}

export default createRootReducer
