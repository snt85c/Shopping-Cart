import { useNavigate } from "react-router-dom";
import { convertDate, indexBestRatioUrl } from "./Services";
import AddToCart from "./AddToCart";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Third({ onScreen, cart, setCart }) {
  const navigate = useNavigate();
  if(onScreen.id){
    localStorage.setItem("name", onScreen.name )
    localStorage.setItem("date", onScreen.dates.start.localDate)
    localStorage.setItem("start", onScreen.dates.start.localTime)
    localStorage.setItem("image", onScreen.images[indexBestRatioUrl("16_9", onScreen)].url)
    localStorage.setItem("venueName", onScreen._embedded.venues[0].name)
    localStorage.setItem("address", onScreen._embedded.venues[0].address.line1)
    localStorage.setItem("city", onScreen._embedded.venues[0].city.name)
    localStorage.setItem("country", onScreen._embedded.venues[0].country.countryCode)
    localStorage.setItem("info", onScreen.info)
  }
  if(onScreen.seatmap && localStorage.getItem("seatmapUrl") !== onScreen.seatmap.staticUrl ){
    localStorage.setItem("seatmap", onScreen.seatmap)
    localStorage.setItem("seatmapUrl", onScreen.seatmap.staticUrl)
  }
  

  function EventInfo() {
    return (
      <>
        <div className=" flex flex-col items-center text-4xl text-center font-extrabold p-3 m-1 basis-1/3">
          {localStorage.getItem("name")}
          <br />
          <div className="text-lg">
            {convertDate(localStorage.getItem("date"))}{" "}
            {localStorage.getItem("start")}
          </div>
        </div>
      </>
    );
  }

  function VenueAddress() {
    return (
      <div className=" flex flex-col justify-center align-center text-left basis-1/3 m-2   p-1">
        Venue address: {localStorage.getItem("venueName")}
        {", "}
        {localStorage.getItem("address")}
        {" - "}
        {localStorage.getItem("city")}
        {" ("}
        {localStorage.getItem("country")}
        {")"}
        <div className="flex border-t-2 border-white md:h-60 h-auto pt-2 overflow-auto text-xs text-justify overflow-ellipsis">
          {localStorage.getItem("info") ? localStorage.getItem("info") : "no info to display for this event"}
        </div>
      </div>
    );
  }

  function SeatMap() {
    return (
      <>
        <div className="flex flex-col justify-center items-center p-1 basis-1/3">
          <img
            className="p-2 md:w-full object-contain"
            src={localStorage.getItem("seatmap") ? localStorage.getItem("seatmapUrl") : ""}
            alt="#"
            style={{
              display: localStorage.getItem("seatmap") ? "flex" : "none",
            }}
          ></img>
          <div>
            {localStorage.getItem("seatmap") ? "site map" : "no site map available for this venue"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div >
      <div >
      <IoArrowBackCircleSharp className="absolute right-0 top-30 md:top-20 cursor-pointer h-12 w-12"
        onClick={() => {
          navigate(-1);
        }}
      />
      </div>
      <div
        className="flex flex-col md:flex-row md:mt-10 h-1/3 md:h-2/4 justify-center "
        style={{
          background: `linear-gradient(to right, black, rgba(0, 0, 0, 0.6), black),
                          url(${
                            localStorage.getItem("image")
                          }) no-repeat 50% 30%`,
        }}
      >
        <EventInfo />
        <VenueAddress />
        <SeatMap /> 
      </div>
      <AddToCart  data={onScreen} cart={cart} setCart={setCart} />
    </div>
  );
}
