import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { indexBestRatioUrl, SearchSuggest } from "./Services";
import { FaGithub } from "react-icons/fa";
import SuggestionsShowBackgroundVideo from "./SuggestionVideoComponent";

export default function SuggestionPage({ setOnScreen }) {
  const [suggest, setSuggest] = useState([]);
  const navigate = useNavigate();

  SearchSuggest(setSuggest);

  function handleClick(item) {
    setOnScreen(item);
    navigate(`/${item.name.replace(/ /g, "_")}`);
  }

  function Footer() {
    return (
      <div className="footer flex w-full px-2 justify-between items-center h-7 dark:bg-slate-600 bg-slate-200 rounded-b-xl">
        <span className="text-black dark:text-gray-300 ">
          created by Snt (2022)
        </span>
        <a
          href="https://github.com/snt85c"
          className="text-black dark:text-white"
        >
          <FaGithub />
        </a>
      </div>
    );
  }

  function SuggestItem({ data, handleClick }) {
    return (
      <>
        <div
          className="flex flex-col md:rounded-xl border-gray-700 md:border-2 border-b-2  hover:border-4 hover:border-amber-500 duration-100 h-[7rem] md:h-[12rem]  md:p-2 cursor-pointer font-bold text-lg md:text-xl md:mb-1"
          style={{
            background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0) 80%),url(${
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
      <div className="flex flex-col md:flex-row-reverse ">
        <SuggestionsShowBackgroundVideo />
        <div className="flex flex-col md:w-1/2 justify-between duration-1000 ">
          <div className="m-1  fadeInAnimation">{suggestions}</div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
