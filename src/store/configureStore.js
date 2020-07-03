import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer, composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from "redux-devtools-extension";
// import testReducer from "../features/testarea/testReducer";
import rootReducer from "../app/reducers/rootReducer";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "../app/config/firebase";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  // const store = createStore(rootReducer, devToolsEnhancer());
  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
