import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowArtistMetadata from "./ShowArtistMetadata";
import {
  convertDate,
  indexBestRatioUrl,
  FetchEventsInTicketmasterAPI,
  FetchArtistMetadataFromLastFM,
  FetchTopTracksFromLastFM,
} from "../Services";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";
import {
  BsSpotify,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";

export default function ArtistPage({ onScreen, setOnScreen }) {
  const [eventData, setEventData] = useState([]);
  const [metadata, setMetadata] = useState("");
  const [topTracks, setTopTracks] = useState("");
  
  
  const navigate = useNavigate();
  let params = useParams();
  
  if (onScreen.id) {
    localStorage.setItem("onScreen", JSON.stringify(onScreen));
  }
  let data = JSON.parse(localStorage.getItem("onScreen"));

  FetchEventsInTicketmasterAPI(data.id, setEventData);
  FetchArtistMetadataFromLastFM(data, setMetadata);
  FetchTopTracksFromLastFM(data, setTopTracks);

  function Breadcrumbs() {
    return (
      <>
        <div className="text-sm breadcrumbs pl-2 dark:bg-gray-800 bg-gray-400 duration-300">
          <ul>
            <li>
              <a
                className="select-none cursor-pointer"
                onClick={() => navigate("/")}
              >
                Attraction Selection
              </a>
            </li>
            <li className="select-none ">Events Selection</li>
          </ul>
        </div>
      </>
    );
  }

  function EventList() {
    function EventItem({ data }) {
      return (
        <div
          className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500 duration-200 "
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

    const options = eventData.map((item, i) => (
      <EventItem data={item} key={i} />
    ));

    return (
      <div className="md:h-[300px] flex flex-col mx-5 md:w-1/2 md:overflow-auto bg-gray-800 bg-opacity-50 cursor-pointer ">
        {options}
      </div>
    );
  }

  function AttractionShow() {
    return (
      <div className="flex flex-col h-100 text-sm font-bold  text-white ">
        <div className=" ml-5 mt-2 text-4xl md:text-6xl">{data.name}</div>
        <div className="ml-5 text-lg">
          {data.classifications[0].genre.name}/
          {data.classifications[0].subGenre.name}
        </div>
        <div className="m-2 ml-5 text-sm ">
          {data.upcomingEvents._total}{" "}
          {data.upcomingEvents._total > 1 ? "events" : "event"}
        </div>
        <div className="flex flex-col md:flex-row-reverse ">
          <ShowArtistMetadata metadata={metadata} topTracks={topTracks} />
          <EventList />
        </div>
        <AttractionShowSocialsIcons />
      </div>
    );
  }

  function AttractionShowSocialsIcons() {
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
          <div key={i} className="h-0">
            <a href={data.externalLinks[name][0].url} style={{ padding: "1%" }}>
              <IconType className="text-white h-12 w-12 object-contain pl-2 hover:text-amber-500 duration-100 " />
            </a>
          </div>
        );
      }
    });
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row pt-2 ">{result}</div>
        <span>external links</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between dark:bg-gray-800 bg-gray-400">
        <Breadcrumbs />
        <BackArrowOverlay />
      </div>
      <div
        className="fadeInAnimation h-[85vh]"
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black),linear-gradient(to bottom, black 5%, rgba(0, 0, 0, 0), black), url(${
            data.images[indexBestRatioUrl("16_9", data)].url
          }) no-repeat 50% 30%`,
        }}
      >
        <AttractionShow />
      </div>
    </div>
  );
}
