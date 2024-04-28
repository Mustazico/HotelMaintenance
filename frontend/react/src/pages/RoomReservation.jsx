import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RoomReservation() {
    const [roomList, setRoomList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); 
    const [showAvailableOnly, setShowAvailableOnly] = useState(false); 
    const [numberOfBeds, setNumberOfBeds] = useState(false);
    const userDataString = localStorage.getItem('user')  || null;
    const userData = JSON.parse(userDataString);
    const username = userData.username;
    const navigate = useNavigate();

    useEffect(() => {
      if(username === null) {
        navigate("/Login");
      }


        try {
            axios.get("https://localhost:7028/api/Room")
            .then(res => {
        
            setRoomList(res.data);
            setFilteredList(res.data);

            console.log(filteredList);
        })
        } catch(err) {
            console.error("Failed to fetch list of rooms", err);
        }
  }, []);


    useEffect(() => {
      let filteredRooms = [...roomList];
      if(showAvailableOnly) {
        filteredRooms = roomList.filter(room => room.availability);
      } 

      if(numberOfBeds) {
        filteredRooms = roomList.sort((roomA, roomB) => roomB.beds - roomA.beds);
      }

        setFilteredList(filteredRooms);
    }, [showAvailableOnly, roomList, numberOfBeds]);
    

    const handleAvailabilityChange= (e) => {
      setShowAvailableOnly(e.target.value === "available");
      setNumberOfBeds(e.target.value === "noofrooms");
    }

  return (
    <div>
      <h1>Welcome to hotel reservation {username}</h1>
      <label htmlFor="availability">Sort by</label>
            <select id="availability" onChange={handleAvailabilityChange}>
                <option value="all">All</option>
                <option value="available">Available Only</option>
                <option value="noofrooms">Number of rooms</option>
            </select>
      <ul style={{listStyle: "none"}}>
      {filteredList.map(room => 
      <li key={room.roomId}> 
      <div style={{ marginBottom: "60px" }}>
        <p>{room.roomName}</p>
        <p>{room.roomType}</p>
        <p>Number of beds {room.beds}</p>
        <p>Available: {room.availability ? "Yes" : "No"}</p>
        </div>
        </li>
      )
      }
      </ul>
    </div>
  )
}