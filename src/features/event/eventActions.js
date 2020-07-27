// import {
//   // CREATE_EVENT,
//   // UPDATE_EVENT,
//   // DELETE_EVENT,
//   FETCH_EVENTS,
// } from "./eventConstants";
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError,
// } from "../async/asyncActions";
// import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";

// create using form data 'event' to dispatch action.
// export const createEvent = (event) => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: CREATE_EVENT,
//         payload: {
//           event,
//         },
//       });
//       toastr.success("Success!", "Event has been created");
//     } catch (error) {
//       toastr.error("Oops", "Something went wrong");
//     }
//   };
// };

//createEvent using firestore
export const createEvent = (event) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser; //user's auth profile
    const photoURL = getState().firebase.profile.photoURL; //photo from user's firestore profile (may not be up to date)
    const newEvent = createNewEvent(user, photoURL, event); //method to shape data and return event object. pass that event object to firestore. in common/util/helpers.js
    try {
      let createdEvent = await firestore.add("events", newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      });
      toastr.success("Success!", "Event has been created");
      return createdEvent;
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEvent = (event) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      // dispatch({
      //   type: UPDATE_EVENT,
      //   payload: {
      //     event,
      //   },
      // });
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel this event?"
    : "This will reactivate the event. Are you sure?";
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled,
        }),
    });
  } catch (error) {
    console.log(error);
  }
};

// export const deleteEvent = (eventId) => {
//   return {
//     type: DELETE_EVENT,
//     payload: {
//       eventId,
//     },
//   };
// };

//call loadEvents from index.js from store's dispatch
// export const loadEvents = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(asyncActionStart()); //loading indicator
//       const events = await fetchSampleData(); //fetch from mock api, save as 'events'
//       dispatch({ type: FETCH_EVENTS, payload: { events } }); //dispatch FETCH_EVENTS to eventReducer with the array of events as payload in eventReducer
//       dispatch(asyncActionFinish());
//     } catch (error) {
//       console.log(error);
//       dispatch(asyncActionError());
//     }
//   };
// };
