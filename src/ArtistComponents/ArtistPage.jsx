import { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import ArtistShowSocialsIcons from "./ArtistShowSocialIcons";
import ArtistEventItemList from "./ArtistEventItemList";
import ArtistBreadcrumbs from "./ArtistBreadcrumbs";
import {
  indexBestRatioUrl,
  FetchEventsInTicketmasterAPI,
  FetchArtistMetadataFromLastFM,
  FetchTopTracksFromLastFM,
  Spinner,
} from "../Services";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";

export default function ArtistPage({ onScreen, setOnScreen }) {
  const [eventDataFetched, setEventDataFetched] = useState([]);
  const [metadataLastFM, setMetadataLastFM] = useState("");
  const [topTracksLastFM, setTopTracksLastFM] = useState("");
  const ShowArtistMetadata = lazy(() => import("./ShowArtistMetadata"));
  let params = useParams();

  let currentData = JSON.parse(localStorage.getItem("onScreen"));
  if (onScreen.id) {
    localStorage.setItem("onScreen", JSON.stringify(onScreen));
  }

  FetchEventsInTicketmasterAPI(currentData.id, setEventDataFetched);
  FetchArtistMetadataFromLastFM(currentData, setMetadataLastFM);
  FetchTopTracksFromLastFM(currentData, setTopTracksLastFM);

  function ArtistShow() {
    return (
      <div
        className="h-[85vh]"
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black),linear-gradient(to bottom, black 5%, rgba(0, 0, 0, 0), black), url(${
            currentData.images[indexBestRatioUrl("16_9", currentData)].url
          }) no-repeat 50% 30%`,
        }}
      >
        <div className="flex flex-col h-100 text-sm font-bold  text-white ">
          <div className=" ml-5 mt-2 text-4xl md:text-6xl">{currentData.name}</div>
          <div className="ml-5 text-lg">
            {currentData.classifications[0].genre.name}/
            {currentData.classifications[0].subGenre.name}
          </div>
          <div className="m-2 ml-5 text-sm ">
            {currentData.upcomingEvents._total}{" "}
            {currentData.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
          <div className="flex flex-col md:flex-row-reverse ">
            <Suspense
              fallback={
                <div className="flex flex-col justify-center items-center md:w-1/2">
                  <Spinner />
                </div>
              }
            >
              <ShowArtistMetadata metadata={metadataLastFM} topTracks={topTracksLastFM} />
            </Suspense>
            <ArtistEventItemList
              setOnScreen={setOnScreen}
              params={params}
              eventData={eventDataFetched}
            />
          </div>
          <ArtistShowSocialsIcons data={currentData} />
        </div>
      </div>
    );
  }

  return (
    <div className="fadeInAnimation ">
      <div className="flex justify-between dark:bg-gray-800 bg-gray-400">
        <ArtistBreadcrumbs />
        <BackArrowOverlay />
      </div>
      <ArtistShow />
    </div>
  );
}
