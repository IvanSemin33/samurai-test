import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/authReducer";
import tableReducer from "./reducers/tableReducer";

const reducers = combineReducers({
  auth: authReducer,
  table: tableReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
