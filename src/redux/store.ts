import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Animal } from "../types/responsesType";

import reducer from "./reducers";

export type StateType = {
  location: string;
  breed: string;
  animal: Animal;
  theme: string;
};

const store = createStore(
  reducer,
  // this enables redux dev tools
  composeWithDevTools()
);

export default store;
