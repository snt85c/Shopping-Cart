import { useEffect } from "react";
export default function DarkMode() {
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
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.theme = "dark";
    }
  };
  return (
    <>
      <div className="form-control">
        <input
          type="checkbox"
          className="toggle toggle-xs md:toggle-md "
          onClick={() => handleToggleDarkMode()}
        />
      </div>
    </>
  );
}
