import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer, composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from "redux-devtools-extension";
// import testReducer from "../features/testarea/testReducer";
import rootReducer from "../app/reducers/rootReducer";
import thunk from "redux-thunk";

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  // const store = createStore(rootReducer, devToolsEnhancer());
  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
