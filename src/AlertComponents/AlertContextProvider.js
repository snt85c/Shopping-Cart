import React, { useState, createContext } from "react";

const AlertContext = createContext({
  //will be called back where needed after being imported  and then initialized with const AlertCtx = useContext(AlertContext). this allows to call all the above variables and functions. this is the initial state of the context (no message, not displayed, no type)
  msg: "",
  isDisplayed: false,
  type: "",
  displayMsg: (msg, type) => {},
  onClose: () => {},
});

let timer;

export const AlertContextProvider = (props) => {
  const [msg, setMsg] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [type, setType] = useState("");

  const displayHandler = (msg, type) => {
    //sets a message and the alert-type for the Alert component from daisyui, sets the alert to be displayed for 3 seconds
    setMsg(msg);
    setType(type);
    setIsDisplayed(true);
    timer = setTimeout(() => {
      closeHandler();
    }, 3000); // close snackbar after 3 seconds
  };
  const closeHandler = () => {
    clearTimeout(timer);
    setIsDisplayed(false);
  };

  return (
    <AlertContext.Provider
      value={{
        msg,
        isDisplayed,
        type,
        displayMsg: displayHandler,
        onClose: closeHandler,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
