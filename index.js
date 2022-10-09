import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore , applyMiddleware} from "redux";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    default:
      return state;
  }
};

const loggerMiddleware = (store) => (next) => (action) => {
  console.log("action", action);
  action.payload=3;
  next(action);
};
const middleware = applyMiddleware(loggerMiddleware);
const store = createStore(reducer, middleware);


store.subscribe(() => {
  console.log("current state", store.getState());
});

store.dispatch({
  type: "INCREMENT",
  payload: 1
});

store.dispatch({
  type: "INCREMENT",
  payload: 5
});

store.dispatch({
  type: "DECREMENT",
  payload: 2
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <p>Open console to see the output</p>
  </StrictMode>,
  rootElement
);
