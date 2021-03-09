import { createStore, combineReducers } from "redux";
import authReducer from "./Reducers/auth";
import searchReducer from "./Reducers/search";
import bookingReducer from "./Reducers/booking";
import currencyReducer from "./Reducers/currency";

const store = createStore(
  combineReducers({
    auth: authReducer,
    search: searchReducer,
    booking: bookingReducer,
    currencies: currencyReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;