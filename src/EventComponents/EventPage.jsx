import { convertDate, indexBestRatioUrl } from "../Services";
import AddToCart from "../CartComponents/AddToCart";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";
import EventSeatMap from "./EventSeatMap";
import Breadcrumbs from "./EventsBreadcrumbs";
import EventInfo from "./EventInfo";
import VenueAddress from "./VenueAddress";
import Footer from "../Footer";

export default function EventPage({ onScreen, cart }) {
  if (onScreen.id) {
    localStorage.setItem("onScreen", JSON.stringify(onScreen));
  }
  let data = JSON.parse(localStorage.getItem("onScreen"));

  return (
    <>
      <div className="flex flex-col justify-between min-h-[91vh] md:overflow-hidden fadeInAnimation dark:bg-gray-800 bg-gray-400 duration-300 ">
        <div className="flex justify-between  dark:bg-gray-800 bg-gray-400">
          <Breadcrumbs />
          <BackArrowOverlay />
        </div>
        <div
          className="flex flex-col min-h-[66vh] md:flex-row "
          style={{
            background: `linear-gradient(to right, black, rgba(0, 0, 0, 0.6), black),
          url(${
            data?.images[indexBestRatioUrl("16_9", data)].url
          }) no-repeat 50% 30%`,
          }}
        >
          <EventInfo data={data} />
          <VenueAddress data={data} />
          <EventSeatMap data={data} />
        </div>
        <AddToCart data={data} cart={cart} />
      </div>
    </>
  );
}
