import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./Reducers/auth";
import searchReducer from "./Reducers/search";
import dataReducer from "./Reducers/data";
import bookingReducer from "./Reducers/booking";
import currencyReducer from "./Reducers/currency";

const store = createStore(
  combineReducers({
    auth: authReducer,
    search: searchReducer,
    data: dataReducer,
    booking: bookingReducer,
    currencies: currencyReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
