import { LoginComponent } from "./UserAuth";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { useContext } from "react";
export default function Logout() {
  const { logout} = LoginComponent();
  const AlertCtx = useContext(AlertContext);
    async function handleLogout(e) {
      try {
        await logout();
        AlertCtx.displayMsg("logged out", "alert-warning");
      } catch (err) {
        console.log(err);
      }
    }
    return (
      <>
        <div
        className="cursor-pointer hover:text-black duration-300"
          onClick={(e) => {
            handleLogout(e);
          }}
        >
          logout
        </div>
      </>
    );
  }