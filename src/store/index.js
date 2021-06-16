import { combineReducers, createStore } from "redux";
import weatherReducer from "./reducers/weather.reducer";

const rootReducer = combineReducers({
  weatherReducer,
});
const store = createStore(rootReducer);
export default store;
