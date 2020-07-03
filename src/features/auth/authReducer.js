import { createReducer } from "../../app/common/util/reducerUtils";
import { SIGN_OUT_USER, LOGIN_USER } from "./authConstants";

const initialState = {
  authenticated: false,
  currentUser: null,
};

const loginUser = (state, payload) => {
  return {
    authenticated: true,
    // temp solution until real auth working - use email for now
    currentUser: payload.creds.email,
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null,
  };
};

export default createReducer(initialState, {
  //specify lookups
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOutUser,
});
