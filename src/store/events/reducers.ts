import { createReducer, getType } from "typesafe-actions";
import {
  createEventAction,
  deleteEventAction,
  updateEventAction,
} from "./actions";
import { TEvents } from "./entities";

const initialState: TEvents = {
  data: [],
};

// events
const eventsReducer = createReducer(initialState, {
  [getType(createEventAction)]: (state: TEvents, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  }),
  [getType(updateEventAction)]: (state: TEvents, { payload }) => ({
    ...state,
    data: state.data.map((event) => {
      if (event.id === payload.id) {
        return payload;
      }
      return event;
    }),
  }),
  [getType(deleteEventAction)]: (state: TEvents, { payload }) => ({
    ...state,
    data: state.data.filter((day) => day.id !== payload),
  }),
});

export { eventsReducer };
