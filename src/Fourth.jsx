import { useNavigate } from "react-router-dom"
export default function Fourth(){
    const navigate = useNavigate()
    return(
        <>
        <div>Fourth</div>
        <button onClick={()=>navigate("/main")}>back to Main</button>
        </>
    )
}