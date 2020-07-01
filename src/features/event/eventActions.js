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
import { toastr } from "react-redux-toastr";

export const createEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event,
        },
      });
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEvent = (event) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event,
        },
      });
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
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
