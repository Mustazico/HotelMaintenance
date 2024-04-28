import { useNavigate } from "react-router-dom";

export default function Frontpage() {

    const navigate = useNavigate();

    return (
        <>
        <h1>Welcome to hotel room service</h1>

        <button type="submit" onClick={() => navigate("/RegisterUser")}>Register a user</button>
        <button type="submit" onClick={() => navigate("/Login")}>Login user</button>
        
        </>
    )
}