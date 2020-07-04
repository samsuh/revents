import { toastr } from "react-redux-toastr";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  // using this spread will remove isLoaded and isEmpty, which would clutter the firestore db.

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};
