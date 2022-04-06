import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { convertDate, SearchEvents, indexBestRatioUrl } from "./Services";
import {
  BsSpotify,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

export default function Second({ onScreen, setOnScreen }) {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  let params = useParams();

  if(onScreen.id){
    localStorage.setItem("onScreen", JSON.stringify(onScreen))
  }
  let data = JSON.parse(localStorage.getItem("onScreen"))
  SearchEvents(data.id, setEventData);

  function EventList() {
    const options = eventData.map((item, i) => (
      <EventItem data={item} key={i} />
    ));

    return (
      <div className=" flex flex-col mx-5 h-72 bg-gray-800 bg-opacity-50 overflow-auto cursor-pointer mb-4 ">
        {options}
      </div>
    );
  }

  function EventItem({ data }) {
    return (
      <div
        className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500"
        onClick={() => (
          navigate(`/${params.second}/${data.id}`), setOnScreen(data)
        )}
      >
        <div className="flex flex-col text-sm flex-wrap my-0.5">
          <div className="text-white">
            {convertDate(data.dates.start.localDate)}
          </div>
          <div className="flex flex-row pt-1 text-xs text-gray-400">
            {data._embedded.venues[0].name} {" - "}
            <div className="text-white ">
              {data._embedded.venues[0].city.name}
            </div>
            {" - "}
            {data._embedded.venues[0].country.countryCode}
          </div>
        </div>
      </div>
    );
  }

  function AttractionShow() {
    return (
      <div
        className="flex flex-col text-sm font-bold text-white"
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black), url(${data.images[indexBestRatioUrl("16_9", data)].url}) no-repeat 50% 30%`,
        }}
      >
        <div>
          <div className="mt-5 ml-5 text-4xl md:text-6xl">
            {data.name}
          </div>
          <div className="ml-5 text-lg">
            {data.classifications[0].genre.name}/{data.classifications[0].subGenre.name}
          </div>
          <div className="m-2 ml-5 text-sm ">
            {data.upcomingEvents._total}{" "}
            {data.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
          <EventList />
        </div>
        <div
          className="flex justify-center pb-1"
          style={{
            display: data.externalLinks ? "flex" : "none",
          }}
        >
          <AttractionShowIcons />
        </div>
      </div>
    );
  }

  function AttractionShowIcons() {
    return data.externalLinks? (
      <>
        <a
          href={
            data.externalLinks.homepage
              ? data.externalLinks.homepage
              : "no url"
          }
          style={{ padding: "1%" }}
        >
          <AiOutlineHome
            className="text-white  object-contain w-12 h-12 pl-2 "
            style={{
              display: data.externalLinks.homepage ? "flex" : "none",
            }}
          />
        </a>
        <a
          href={
            data.externalLinks.homepage
              ? data.externalLinks.homepage
              : "no url"
          }
          style={{
            padding: "1%",
            display: data.externalLinks.spotify ? "flex" : "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <BsSpotify
            className="text-white  object-contain w-12 h-12 pl-2 "
            style={{}}
          />
        </a>
        <a
          href={
            data.externalLinks.facebook
              ? data.externalLinks.facebook
              : "no url"
          }
          style={{
            padding: "1%",
            display: data.externalLinks.facebook ? "flex" : "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <BsFacebook
            className="text-white object-contain w-12 h-12 pl-2 "
            style={{}}
          />
        </a>
        <a
          href={
            data.externalLinks.instagram
              ? data.externalLinks.instagram
              : ""
          }
          style={{
            padding: "1%",
            display: data.externalLinks.instagram ? "flex" : "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <BsInstagram
            className="text-white object-contain w-12 h-12 pl-2 "
            style={{}}
          />
        </a>
        <a
          href={
            data.externalLinks.twitter
              ? data.externalLinks.twitter
              : ""
          }
          style={{
            padding: "1%",
            display: data.externalLinks.twitter ? "flex" : "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter
            className="text-white object-contain w-12 h-12 pl-2 "
            style={{}}
          />
        </a>
        <a
          href={
            data.externalLinks.youtube
              ? data.externalLinks.youtube
              : ""
          }
          style={{
            padding: "1%",
            display: data.externalLinks.youtube ? "flex" : "none",
          }}
          target="_blank"
          rel="noreferrer"
        >
          <BsYoutube
            className="text-white object-contain w-12 h-12 pl-2 "
            style={{}}
          />
        </a>
      </>
    ) : (
      <></>
    );
  }

  return (
    <>
      <IoArrowBackCircleSharp
        className="absolute right-0 top-30 md:top-20 cursor-pointer h-12 w-12"
        onClick={() => {
          navigate(-1);
        }}
      />
      <AttractionShow />
    </>
  );
}
