import React from "react";
import Connect from "./Connect";
/////////////////////Redux를 위한 것들//////////////////////
import reducer from "./reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Connect />
    </Provider>
  );
}
