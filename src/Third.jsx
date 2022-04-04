import { useNavigate } from "react-router-dom"
export default function Third(){
    const navigate = useNavigate()
    return(
        <>
        <div className="">Third</div>
        <div className="flex flex-col">
        <button onClick={()=>navigate("/second")}>back </button>
        <button onClick={()=>navigate("/")}>back to Main</button>
        </div>

        </>
    )
}