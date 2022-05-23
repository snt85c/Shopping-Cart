import { Outlet, useNavigate } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import {  FetchSuggestFromTicketmasterAPI } from "../Services";
import { FaGithub } from "react-icons/fa";
import SuggestionList from "./SuggestionList";
import SuggestionsShowBackgroundVideo from "./SuggestionVideoComponent";

export default function SuggestionPage({ setOnScreen }) {
  // const SuggestionList = lazy(() => import('./SuggestionList'));

  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();

  FetchSuggestFromTicketmasterAPI(setSuggest);

  function handleClick(item) {
    setOnScreen(item);
    navigate(`/${item.name.replace(/ /g, "_")}`);
  }

  // function Footer() {
  //   return (
  //     <div className="flex w-full px-2 justify-between items-center h-7 dark:bg-slate-600 bg-slate-200 rounded-b-xl">
  //       <span className="text-black dark:text-gray-300 ">
  //         created by Snt (2022)
  //       </span>
  //       <a
  //         href="https://github.com/snt85c"
  //         className="text-black dark:text-white"
  //       >
  //         <FaGithub />
  //       </a>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex flex-col md:flex-row-reverse ">
        <SuggestionsShowBackgroundVideo />
        <div className="flex flex-col md:w-1/2 justify-between duration-1000 ">
          <Suspense fallback={<div>loading</div>}>
          <div className="m-1  fadeInAnimation"><SuggestionList data={suggest} handleClick={handleClick}/></div>
          </Suspense>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
