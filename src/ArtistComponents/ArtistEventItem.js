import { convertDate } from "../Services";
import { setVenue } from "../redux/slice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function EventItem({ data }) {
  const navigate = useNavigate()
  let params = useParams();
  const dispatch = useDispatch()
  return (
    <div
      className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500 duration-200 "
      onClick={() => {
        navigate(`/${params.second}/${data.id}`);
        dispatch(setVenue(data));
      }}
    >
      <div className="flex flex-col text-sm flex-wrap my-0.5">
        <div className="text-white">
          {convertDate(data.dates.start.localDate)}
        </div>

        {data._embedded.venues && (
          <div className="flex flex-row pt-1 text-xs text-gray-400">
            {data._embedded.venues[0].name} {" - "}
            <div className="text-white ">
              {data._embedded.venues[0].city.name}
            </div>
            {" - "}
            {data._embedded.venues[0].country.countryCode}
          </div>
        )}
      </div>
    </div>
  );
}