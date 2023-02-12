import { useNavigate } from "react-router-dom";
import { FetchSuggestFromTicketmasterAPI } from "../Services";
import SuggestionList from "./SuggestionList";
import { useDispatch } from "react-redux";
import SuggestionsShowBackgroundVideo from "./SuggestionVideoComponent";
import { setArtist } from "../redux/slice";
import Footer from "../Footer";

export default function SuggestionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  FetchSuggestFromTicketmasterAPI();

  function handleClick(artist) {
    dispatch(setArtist(artist));
    navigate(`/${artist.name.replace(/ /g, "_")}`);
  }

  return (
    <>
      <div className="flex flex-col md:flex-row-reverse mb-12 min-h-screen  ">
        <SuggestionsShowBackgroundVideo />
        <div className="flex flex-col md:w-1/2 justify-between duration-1000 ">
          <div className="m-1  fadeInAnimation">
            <SuggestionList handleClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
}
