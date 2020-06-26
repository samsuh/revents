import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
// import testReducer from "../features/testarea/testReducer";
import rootReducer from "../app/reducers/rootReducer";

export const configureStore = () => {
  const store = createStore(rootReducer, devToolsEnhancer());

  return store;
};
