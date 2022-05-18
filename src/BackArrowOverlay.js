import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function BackArrowOverlay() {
    const navigate = useNavigate()
    return (
      <IoArrowBackCircleSharp
        className="absolute right-0 top-12 md:top-20 cursor-pointer h-12 w-12"
        onClick={() => {
          navigate(-1);
        }}
      />
    );
  }