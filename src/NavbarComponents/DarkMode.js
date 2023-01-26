import { useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../redux/slice";
export default function DarkMode() {
  const isDarkMode = useSelector((state) => state.reducer.isDarkMode);
  const dispatch = useDispatch()

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [localStorage.theme]);

  const handleToggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      dispatch(setIsDarkMode(false))
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      dispatch(setIsDarkMode(true))
    }
  };
  return (
    <>
      <div className="form-control">
        <DarkModeSwitch
          className="m-1"
          checked={isDarkMode}
          onChange={handleToggleDarkMode}
          size={25}
          sunColor="black"
        />
      </div>
    </>
  );
}
