import GoogleButton from "react-google-button";
import { LoginComponent } from "../LoginComponent/UserAuth";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { useContext } from "react";

export default function GoogleLogin() {
    const { googleSignIn} = LoginComponent();
    const AlertCtx = useContext(AlertContext);
    async function handleGoogleLogin(e) {
      e.preventDefault();
      try {
        await googleSignIn().then((user)=>{
          AlertCtx.displayMsg(
            `Logged in as ${user._tokenResponse.displayName}`,
            "alert-success"
          );
        });
      } catch (err) {
        AlertCtx.displayMsg(
          `Unable to Login - ${err.message} - please try later`,
          "alert-error"
        );
      }
    }
    return (
      <>
        <div className="flex flex-col justify-center items-center">
          <GoogleButton
            className=" max-w-[120px] md:min-w-[95%] mx-2 "
            onClick={(e) => handleGoogleLogin(e)}
            label="Sign in"
          />
          <div>you need to log in to continue</div>
        </div>
      </>
    );
  }

