import React from "react";
import Main from "./Main";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store , persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "flowbite";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
