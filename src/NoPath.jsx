import { useNavigate } from "react-router-dom";
export default function NoPath() {
    const navigate = useNavigate();
    return (
        <>
            <p>There's nothing here!</p>
            <button onClick={() => navigate("/")}>back</button>
        </>
    )
}