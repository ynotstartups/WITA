import { createReducer } from "redux-starter-kit";
import { saveArtist, removeArtist, changeSearchQuery } from "./actions";

let localStorageSavedArtists;
try {
  localStorageSavedArtists = JSON.parse(
    localStorage.getItem(saveArtist.toString())
  );
} catch (e) {
  console.error(e);
}

const initialState = {
  savedArtists: localStorageSavedArtists ? localStorageSavedArtists : [],
  searchQuery: "Tiger"
};

const rootReducer = createReducer(initialState, {
  [saveArtist]: ({ savedArtists }, { payload: id }) => {
    if (!savedArtists.includes(id)) {
      savedArtists.push(id);
      localStorage.setItem(saveArtist.toString(), JSON.stringify(savedArtists));
    }
  },
  [removeArtist]: (state, { payload: id }) => {
    return {
      ...state,
      savedArtists: state.savedArtists.filter(_id => _id !== id)
    };
  },
  [changeSearchQuery]: (state, { payload: query }) => {
    state.searchQuery = query;
  }
});

export default rootReducer;
