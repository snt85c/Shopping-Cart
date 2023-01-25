
import { useNavigate} from "react-router-dom";

export default function ArtistBreadcrumbs() {
    const navigate = useNavigate()
    return (
      <>
        <div className="text-sm breadcrumbs pl-2 h-[5vh]  ">
          <ul>
            <li>
              <a
                className="select-none cursor-pointer"
                onClick={() => navigate("/")}
              >
                Attractions
              </a>
            </li>
            <li className="select-none ">Events</li>
          </ul>
        </div>
      </>
    );
  }