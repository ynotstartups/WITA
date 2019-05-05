import { configureStore } from "redux-starter-kit"
import createRootReducer from "./reducers"

const createStore = () => {
  console.log("in createStore")
  return configureStore({
    reducer: createRootReducer(),
  })
}

export default createStore
