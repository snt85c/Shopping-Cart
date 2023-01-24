import React from "react";
import Main from "./Main";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "flowbite";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
