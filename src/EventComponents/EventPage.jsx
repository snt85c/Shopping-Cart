import { useNavigate } from "react-router-dom";
import { convertDate, indexBestRatioUrl } from "../Services";
import AddToCart from "../CartComponents/AddToCart";
import BackArrowOverlay from "../NavbarComponents/BackArrowOverlay";
import { Spinner } from "../Services";

import { lazy, Suspense } from "react";

export default function EventPage({ onScreen, cart, setCart }) {
  const navigate = useNavigate();
  //used to keep page on screen when reloading
  if (onScreen.id) {
    localStorage.setItem("onScreen", JSON.stringify(onScreen));
  }

  let data = JSON.parse(localStorage.getItem("onScreen"));
  const EventSeatMap = lazy(() => import("./EventSeatMap"));

  function Breadcrumbs() {
    return (
      <>
        <div className="text-sm breadcrumbs ml-2">
          <ul>
            <li>
              <a
                className="select-none cursor-pointer"
                onClick={() => navigate("/")}
              >
                Attractions
              </a>
            </li>
            <li>
              <a
                className="select-none cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Events {" "}
              </a>
            </li>
            <li className="select-none">Venue</li>
          </ul>
        </div>
      </>
    );
  }

  function EventInfo() {
    return (
      <>
        <div className=" flex flex-col justify-center items-center text-4xl text-center font-extrabold p-3 m-1 basis-1/3">
          {data.name}
          <br />
          <div className="text-lg">
            {convertDate(data.dates.start.localDate)}{" "}
            {data.dates.start.localTime}
          </div>
        </div>
      </>
    );
  }

  function VenueAddress() {
    return (
      <div className=" flex flex-col justify-center align-center text-left basis-1/3 m-2   p-1">
        Venue address: {data._embedded.venues[0].name}
        {", "}
        {data._embedded.venues[0].address.line1}
        {" - "}
        {data._embedded.venues[0].city.name}
        {" ("}
        {data._embedded.venues[0].country.countryCode}
        {")"}
        <div className="flex border-t-2 border-white h-auto pt-2 overflow-auto text-xs text-justify overflow-ellipsis">
          {data.info ? data.info : "no info to display for this event"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[90.5vh] md:overflow-hidden fadeInAnimation dark:bg-gray-800 bg-gray-400 duration-300">
      <div className="flex justify-between dark:bg-gray-800 bg-gray-400">
        <Breadcrumbs />
        <BackArrowOverlay />
      </div>
      <div
        className="flex flex-col md:flex-row md:h-3/4  justify-center "
        style={{
          background: `linear-gradient(to right, black, rgba(0, 0, 0, 0.6), black),
                          url(${
                            data.images[indexBestRatioUrl("16_9", data)].url
                          }) no-repeat 50% 30%`,
        }}
      >
        <EventInfo />
        <VenueAddress />
        <Suspense
          fallback={
            <div className="fadeInAnimation flex justify-center items-center">
             <Spinner/>
            </div>
          }
        >
          <EventSeatMap data={data} />
        </Suspense>
      </div>
      <AddToCart data={onScreen} cart={cart} setCart={setCart} />
    </div>
  );
}
