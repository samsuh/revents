import { SubmissionError, reset } from "redux-form";
// import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";
// import { SIGN_OUT_USER } from "./authConstants";
import { closeModal } from "../modals/modalActions";
import { toastr } from "react-redux-toastr";

export const login = (creds) => {
  //now use redux thunk to dispatch async functions
  // return (dispatch) => {
  return async (dispatch, getState, { getFirebase }) => {
    // dispatch({type: LOGIN_USER,payload: { creds }});
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message,
      });
    }
    dispatch(closeModal());
  };
};

// export const logout = () => {
//   return {
//     type: SIGN_OUT_USER,
//   };
// };

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    //use firebase auth method to create user with email/pw via 'user' object user types into form
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    //this: update 'auth' portion of 'users' state in firebase.
    //not this: 'profile' is slice of user state in 'users' collection in firestore
    await createdUser.user.updateProfile({
      displayName: user.displayName,
    });
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message,
    });
  }
};

export const socialLogin = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    const user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });
    // console.log(user);
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (creds) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    await dispatch(reset("account"));
    toastr.success("Success", "Your password has been updated");
  } catch (error) {
    throw new SubmissionError({
      _error: error.message,
    });
  }
};
