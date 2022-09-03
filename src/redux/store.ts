import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";

const store = configureStore({
  reducer,
  // this enables redux dev tools
  // composeWithDevTools() -- but its enabeled by default in redux toolkit
});

export type StateType = ReturnType<typeof store.getState>;

export default store;
