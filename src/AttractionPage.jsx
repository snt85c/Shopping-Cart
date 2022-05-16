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

export default function AttractionPage({ onScreen, setOnScreen }) {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  let params = useParams();

  if (onScreen.id) {
    //used in early version to retain the page when reloaded, TODO: investigate if still needed after adding router
    localStorage.setItem("onScreen", JSON.stringify(onScreen));
  }
  let data = JSON.parse(localStorage.getItem("onScreen"));
  SearchEvents(data.id, setEventData);

  function Breadcrumbs() {
    return (
      <>
        <div className="text-sm breadcrumbs ml-2">
          <ul>
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>Events Selection</li>
          </ul>
        </div>
      </>
    );
  }

  function EventList() {
    const options = eventData.map((item, i) => (
      <EventItem data={item} key={i} />
    ));

    return (
      <div className=" flex flex-col mx-5 h-[19rem]  max-h-screen overflow-auto bg-gray-800 bg-opacity-50 cursor-pointer mb-4 ">
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
      <div className="flex flex-col text-sm font-bold text-white">
        <div className=" min-h-full ">
          <div className="mt-5 ml-5 text-4xl md:text-6xl">{data.name}</div>
          <div className="ml-5 text-lg">
            {data.classifications[0].genre.name}/
            {data.classifications[0].subGenre.name}
          </div>
          <div className="m-2 ml-5 text-sm ">
            {data.upcomingEvents._total}{" "}
            {data.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
          <EventList />
        </div>
      </div>
    );
  }

  function AttractionShowIcons() {
    const icons = [
      AiOutlineHome,
      BsSpotify,
      BsInstagram,
      BsFacebook,
      BsTwitter,
      BsYoutube,
    ];
    const dataExternaLinksNames = [
      "homepage",
      "spotify",
      "instagram",
      "facebook",
      "twitter",
      "youtube",
    ];

    const result = dataExternaLinksNames.map((name, i) => {
      if (data.externalLinks && data.externalLinks[name]) {
        let IconType = icons[i];
        return (
          <>
            <a
              href={data.externalLinks[name]}
              key={i}
              style={{ padding: "1%" }}
            >
              <IconType className="text-white  object-contain w-12 h-12 pl-2 " />
            </a>
          </>
        );
      }
    });
    return <div className="flex justify-center">{result}</div>;
  }

  function BackArrowOverlay() {
    return (
      <IoArrowBackCircleSharp
        className="fixed right-0 top-12 md:top-20 cursor-pointer h-12 w-12"
        onClick={() => {
          navigate(-1);
        }}
      />
    );
  }

  return (
    <>
      <div
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black), url(${
            data.images[indexBestRatioUrl("16_9", data)].url
          }) no-repeat 50% 30%`,
        }}
      >
        <Breadcrumbs />
        <BackArrowOverlay />
        <AttractionShow />
        <AttractionShowIcons />
      </div>
    </>
  );
}
