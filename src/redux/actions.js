import { createAction } from 'redux-starter-kit';

const saveArtist = createAction('SAVE_ARTIST');
const removeArtist = createAction('REMOVE_SAVED_ARTIST');

const changeSearchQuery = createAction('ADD_SEARCH_QUERY');

export { saveArtist, removeArtist, changeSearchQuery };
