import { createAction } from "redux-starter-kit"

const saveArtist = createAction("SAVE_ARTIST")
const removeArtist = createAction("REMOVE_SAVED_ARTIST")

export { saveArtist, removeArtist }
