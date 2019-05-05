import { configureStore } from "redux-starter-kit"
import createRootReducer from "./reducers"

const createStore = () => {
  return configureStore({
    reducer: createRootReducer(),
  })
}

export default createStore
