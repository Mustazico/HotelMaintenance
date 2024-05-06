import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MakeReservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const reservationFrom = location?.state.reservationFrom.toLocaleDateString();
    const reservationTo = location?.state.reservationTo.toLocaleDateString();
    const roomId = location?.state.roomId;
    const userDataString = localStorage.getItem('user')  || null;
    const userData = JSON.parse(userDataString);
    const username = userData.username;



    const makeReservation = () => {
            const requestBody = {
                RoomId: roomId,  // Assuming room ID is passed in the state
                Username: username,       // Assuming user ID is stored in local storage
                ReservationFrom: location?.state.reservationFrom,
                ReservationTo: location?.state.reservationTo
            };
    
            axios.post("https://localhost:7028/api/Reservation/reserveroom", requestBody)
                .then(response => {
                    console.log(response.data);
                    // Navigate to a success page or show success message
                    navigate("/Menu");
                })
                .catch(error => {
                    console.error("Error making reservation", error);
                    // Handle errors (e.g., show an error message)
                });
            }
    
    return (
        <>
            <h1>Reservation details</h1>
            <p>Username: {username} </p>
            
            <p>Reservation from {reservationFrom}</p>
            <p>Reservation to {reservationTo} </p>
            <button onClick={makeReservation}>Confirm reservation</button>
        </>
    )
}