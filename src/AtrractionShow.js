import { indexBestRatioUrl } from "./Services";
import EventsList from "./EventsList"
import AttractionShowIcons from "./AttractionShowIcons";
import { useNavigate } from "react-router-dom";

export default function AttractionShow({ data, eventData, handleClickSearch }) {

  const navigate = useNavigate()


  return (
    <div
      className="flex flex-col text-sm font-bold text-white image"
      style={{
        background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black), url(${
          data.images[indexBestRatioUrl("16_9", data)].url
        }) no-repeat 50% 30%`,
      }}
    >
      <div >
        <div className="mt-5 ml-5 text-4xl md:text-6xl">{data.name}</div>
        <div className="ml-5 text-lg">
          {data.classifications[0].genre.name}/
          {data.classifications[0].subGenre.name}
        </div>
        <div className="m-5 mb-0 text-md ">
          {data.upcomingEvents._total}{" "}
          {data.upcomingEvents._total > 1 ? "events" : "event"}
        </div>
          <EventsList data={eventData} handleClickSearch={handleClickSearch} />
      </div>
      <div className="flex justify-center pb-1"
        style={{
          display: data.externalLinks ? "flex" : "none",
        }}
      >
        <AttractionShowIcons data={data} />
      </div>
    </div>
  );
}
