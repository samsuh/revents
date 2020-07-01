import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
// import { asyncActionStart, asyncActionFinish } from "../async/asyncActions";
import { asyncActionFinish } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER,
  };
};
export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER,
  };
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const incrementAsync = (name) => {
  return async (dispatch) => {
    // dispatch(asyncActionStart());
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    // dispatch({type: INCREMENT_COUNTER})
    dispatch(incrementCounter());
    dispatch(asyncActionFinish());
  };
};
export const decrementAsync = (name) => {
  return async (dispatch) => {
    // dispatch(asyncActionStart());
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    // dispatch(decrementCounter())
    dispatch(asyncActionFinish());
  };
};
