import { convertDate } from "./Services";
import { useNavigate } from "react-router-dom";

export default function EventList({ data}) {
  function EventItem({ data }) {
    const navigate = useNavigate()
    return (
      <div
        className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500"
        onClick={() => navigate("/fourth")}
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

  const options = data.map((item, i) => (
    <EventItem data={item} key={i} />
  ));

  return (
    <div className=" flex flex-col mx-5 h-80 bg-gray-800 bg-opacity-50 overflow-auto cursor-pointer mb-4 ">
      {options}
    </div>
  );
}
