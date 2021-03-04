import { createStore, combineReducers } from "redux";
import authReducer from "./Reducers/auth";
import searchReducer from "./Reducers/search";

const store = createStore(
  combineReducers({
    auth: authReducer,
    search: searchReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;