import { useNavigate } from "react-router-dom"

export default function Menu () {
    const navigate = useNavigate();
    return (

        <>
        <h1> Menu</h1>
        <button onClick={() => navigate("/RoomReservation")}>Reserve room</button>
        </>
    )
}