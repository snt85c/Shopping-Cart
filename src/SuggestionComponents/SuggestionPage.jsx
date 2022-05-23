import { Outlet, useNavigate } from "react-router-dom";
import { useState,useEffect, lazy, Suspense } from "react";
import { FetchSuggestFromTicketmasterAPI } from "../Services";
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

  return (
    <>
      <div className="flex flex-col md:flex-row-reverse ">
        <SuggestionsShowBackgroundVideo />
        <div className="flex flex-col md:w-1/2 justify-between duration-1000 ">
          {/* <Suspense fallback={<div>loading</div>}> */}
          <div className="m-1  fadeInAnimation">
            <SuggestionList data={suggest} handleClick={handleClick} />
          </div>
          {/* </Suspense> */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
