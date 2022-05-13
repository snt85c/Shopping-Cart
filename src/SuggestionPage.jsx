import { Outlet, useNavigate} from "react-router-dom";
import { useState } from "react";
import {indexBestRatioUrl, SearchSuggest} from "./Services"

export default function SuggestionPage({ setOnScreen}) {
  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();

  SearchSuggest(setSuggest);

  function handleClick(item) {
    setOnScreen(item);
    navigate(`/${item.name.replace(/ /g, "_")}`);
  }

  function SuggestItem({ data, handleClick }) {

    return (
      <>
        <div
          className="flex flex-col bg-gray-800 rounded border-gray-700 border-2 hover:border-4 hover:border-amber-500 h-32 md:h-40  md:p-2 cursor-pointer font-bold text-lg md:text-xl mb-2 "
          style={{
            background: `linear-gradient(to right, black 10%, rgba(0, 0, 0, 0)),url(${
              data.images[indexBestRatioUrl("16_9", data)].url
            })no-repeat 50% 30%`,
          }}
          onClick={() => handleClick(data)}
        >
          <div className=" text-4xl md:text-5xl font-extrabold ">
            {data.name}
          </div>
          <div className="text-xs text-gray-400">
            {data.classifications[0].segment.name}:{" "}
            {data.classifications[0].genre.name}/
            {data.classifications[0].subGenre.name}
          </div>
          <div className="text-xs text-gray-400">
            {data.upcomingEvents._total} upcoming{" "}
            {data.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
        </div>
      </>
    );
  }

  const suggestions = suggest.map((item) => (
    <SuggestItem data={item} key={item.id} handleClick={handleClick} />
  ));


  return (
    <>
      <div>{suggestions}</div>
      <Outlet />
    </>
  );
}
