import { useState } from "react";

export default function EventSeatMap({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className=" flex flex-col justify-center items-center p-1 basis-1/3">
        <img
          className="p-2 md:w-full object-contain transition-opacity ease-linear opacity-1"
          src={data.seatmap ? data.seatmap.staticUrl : ""}
          alt=""
          onLoad={() => setIsLoaded(true)}
          style={
            isLoaded
              ? {
                  display: "flex",
                }
              : { display: "none" }
          }
        ></img>
      </div>
    </>
  );
}
