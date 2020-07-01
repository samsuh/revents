import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: {
      event,
    },
  };
};

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event,
    },
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId,
    },
  };
};

//call loadEvents from index.js from store's dispatch
export const loadEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart()); //loading indicator
      const events = await fetchSampleData(); //fetch from mock api, save as 'events'
      dispatch({ type: FETCH_EVENTS, payload: { events } }); //dispatch FETCH_EVENTS to eventReducer with the array of events as payload in eventReducer
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
