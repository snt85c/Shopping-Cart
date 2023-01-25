export default function VenueAddress({ data }) {
  return (
    <>
      {data._embedded.venues && (
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
      )}
    </>
  );
}
