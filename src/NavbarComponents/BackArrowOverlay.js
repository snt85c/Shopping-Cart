import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function BackArrowOverlay() {
    const navigate = useNavigate()
    return (
      <IoArrowBackCircleSharp
        className="cursor-pointer h-10 w-10 text-black dark:text-white duration-300"
        onClick={() => {
          navigate(-1);
        }}
      />
    );
  }