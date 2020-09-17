import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/authReducer";
import tableReducer from "./reducers/tableReducer";
import dialogReducer from "./reducers/dialogReducer";

const reducers = combineReducers({
  auth: authReducer,
  table: tableReducer,
  dialog: dialogReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
