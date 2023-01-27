import ArtistBreadcrumbs from "./ArtistBreadcrumbs";
import ArtistShow from "./ArtistShow";
import {
  indexBestRatioUrl,
  FetchEventsInTicketmasterAPI,
  FetchArtistMetadataFromLastFM,
  FetchTopTracksFromLastFM,
} from "../Services";
import { useDispatch } from "react-redux";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";
import { setArtist } from "../redux/slice";

export default function ArtistPage({ onScreen }) {
  const dispatch = useDispatch();

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  let data = onScreen;

  //this bit allows for the Artist page to be rendered in case of hot reload, as it will save it on localStorage everytime i come here, and will extract it if onScreen is missing (a.k.a there is no global state for it)
  if (onScreen.id) {
    localStorage.setItem("ArtistPage", JSON.stringify(onScreen));
  } else {
    data = JSON.parse(localStorage.getItem("ArtistPage"));
    dispatch(setArtist(data));
  }

  FetchEventsInTicketmasterAPI(data.id);
  FetchArtistMetadataFromLastFM(data);
  FetchTopTracksFromLastFM(data);

  return (
    <div>
      <div
        aria-label="artist-page"
        className="flex justify-between min-h-full dark:bg-gray-800 bg-gray-400 select-none"
      >
        <ArtistBreadcrumbs />
        <BackArrowOverlay />
      </div>
      <div
        className="fadeInAnimation "
        style={{
          background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black),linear-gradient(to bottom, black 5%, rgba(0, 0, 0, 0), black), url(${
            data.images[indexBestRatioUrl("16_9", data)].url
          }) no-repeat 50% 30%`,
        }}
      >
        <ArtistShow data={data} />
      </div>
    </div>
  );
}
