import { Outlet, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function SecondPage({suggest, setSuggest, onScreen, setOnScreen}){

    const navigate= useNavigate();
    let params = useParams();
    const APIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD";


  function SearchSuggest(setSuggest) {
    useEffect(() => {
      async function getData() {
        let suggest = [];
        const url = `https://app.ticketmaster.com/discovery/v2/suggest?&countryCode=UK&apikey=${APIKEY}`;
        const response = await fetch(url, { mode: "cors" });
        const result = await response.json();
        try {
          result._embedded.attractions.forEach((item) => {
            suggest.push(item);
          });
          setSuggest(suggest);
        } catch (e) {}
      }
      getData();
    }, []);
  }

  

  function handleClick(item) {
    setOnScreen(item);
    // navigate(`/${item.name.replace(/ /g, '_')}`)
    navigate("/second")
    console.log(onScreen, "onScreen");
  }

  function SuggestItem({ data, handleClick }) {
    function indexBestRatioUrl(ratio, data) {
      if (data.images !== undefined) {
        return data.images.findIndex((item) => {
          return item.ratio === ratio && item.width > 2000;
        });
      }
    }
  
    return (
      <>
        <div
          className="flex flex-col bg-gray-800 rounded border-gray-700 border-2 hover:border-4 hover:border-amber-500 h-32 md:h-40  md:p-2 cursor-pointer font-bold text-lg md:text-xl mb-2 "
          style={{
            background: `linear-gradient(to right, black 10%, rgba(0, 0, 0, 0)),url(${
              data.images[indexBestRatioUrl("16_9", data)].url
            }) no-repeat 50% 30%`,
          }}
          onClick={() => handleClick(data)}
        >
          <div className=" text-4xl md:text-5xl font-extrabold ">{data.name}</div>
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
    <SuggestItem
      data={item}
      key={item.id}
      handleClick={handleClick}
    />
  ));

  SearchSuggest(setSuggest);

    return (
        <>
        <div> First Page </div>
        <div>{suggestions}</div>
        <Outlet />
        </>
    )
}