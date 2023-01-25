import { useNavigate } from "react-router-dom";
export default function EventsBreadcrumbs() {
  const navigate = useNavigate();

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
                Events{" "}
              </a>
            </li>
            <li className="select-none">Venue</li>
          </ul>
        </div>
      </>
    );
  }