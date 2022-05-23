export default function EventSeatMap({data}) {
    return (
      <>
        <div className="fadeInAnimation flex flex-col justify-center items-center p-1 basis-1/3">
          <img
            className="p-2 md:w-full object-contain"
            src={data.seatmap ? data.seatmap.staticUrl : ""}
            alt="#"
            style={{
              display: data.seatmap ? "flex" : "none",
            }}
          ></img>
          <div>
            {data.seatmap ? "site map" : "no site map available for this venue"}
          </div>
        </div>
      </>
    );
  }