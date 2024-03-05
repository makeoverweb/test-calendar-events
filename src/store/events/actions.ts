import { createAction } from "typesafe-actions";
import { TEvent } from "./entities";

const CREATE_EVENT = "@common/CREATE_EVENT";
export const createEventAction = createAction(
  CREATE_EVENT,
  (payload: TEvent) => payload
)();

const UPDATE_EVENT = "@common/UPDATE_EVENT";
export const updateEventAction = createAction(
  UPDATE_EVENT,
  (payload: TEvent) => payload
)();

const DELETE_EVENT = "@common/DELETE_EVENT";
export const deleteEventAction = createAction(
  DELETE_EVENT,
  (payload: string) => payload
)();
