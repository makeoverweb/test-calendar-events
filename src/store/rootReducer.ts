import { combineReducers } from "redux";
import { eventsReducer } from "./events/reducers";

const reducers = {
  events: eventsReducer,
};

export const reducer = combineReducers(reducers);
