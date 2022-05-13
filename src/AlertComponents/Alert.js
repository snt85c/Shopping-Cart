import { useContext } from "react";
import AlertContext from "./AlertContextProvider";

export default function Alert() {
  //gets info from the context, if isDisplayed it will show for 3 seconds and with a custom message from various part of the webiste
  const AlertCtx = useContext(AlertContext);

  return (
    <>{AlertCtx.isDisplayed && 
      <div className={`alert ${AlertCtx.type} shadow-lg alert-animation absolute top-20 left-1/3 z-10 w-1/3`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{AlertCtx.msg}</span>
        </div>
      </div>
    }
    </>
  );
}
