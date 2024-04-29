import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RoomReservation() {
    const [roomList, setRoomList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); 
    const [showAvailableOnly, setShowAvailableOnly] = useState(false); 
    const [numberOfBeds, setNumberOfBeds] = useState(false);
    const [dateFrom, setDateFrom] = useState(false); 
    const [dateTo, setDateTo] = useState(false);
    const userDataString = localStorage.getItem('user')  || null;
    const userData = JSON.parse(userDataString);
    const username = userData.username;
    const navigate = useNavigate();

    useEffect(() => {
      if(username === null) {
        navigate("/Login");
      }


        // try {
        //     axios.get("https://localhost:7028/api/Room")
        //     .then(res => {
        
        //     setRoomList(res.data);
        //     setFilteredList(res.data);

        //     console.log(filteredList);
        // })
        // } catch(err) {
        //     console.error("Failed to fetch list of rooms", err);
        // }
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

    const fetchAvailableRooms = () => {
      const formattedDateFrom = dateFrom.toISOString();
      const formattedDateTo = dateTo.toISOString();

      if(formattedDateFrom > formattedDateTo) {
        console.log("Date from cant be after date to");
        return;
      }
  
      // Construct the URL with query parameters for the reservation dates
      const url = `https://localhost:7028/api/Reservation/showAvailableRooms?reservationFrom=${formattedDateFrom}&reservationTo=${formattedDateTo}`;
  
      // Make a GET request to the API endpoint
      axios.get(url)
          .then(res => {
              setFilteredList(res.data);
          })
          .catch(err => {
              console.error("Error getting rooms", err);
          });
      };

  return (
    
    <div>
      <h1>Welcome to hotel reservation {username}</h1>
      <label htmlFor="availability">Sort by</label>
            <select id="availability" onChange={handleAvailabilityChange}>
                <option value="all">All</option>
                <option value="noofrooms">Number of rooms</option>
            </select>

            <div>
        <label>Date From: </label>
        <DatePicker selected={dateFrom} onChange={date => setDateFrom(date)} />
      </div>

      <div>
        <label>Date to: </label>
        <DatePicker selected={dateTo} onChange={date => setDateTo(date)} />
      </div>
      

      <button onClick={fetchAvailableRooms}>Check Availability</button>



      <ul style={{listStyle: "none"}}>
      {filteredList.map(room => 
      <li key={room.roomId}> 
      <div style={{ marginBottom: "60px" }}>
        <p>{room.roomName}</p>
        <p>{room.roomType}</p>
        <p>Number of beds {room.beds}</p>
         <button onClick={() => navigate("/MakeReservation", {state: {roomId: room.roomId, reservationFrom: dateFrom, reservationTo: dateTo}})}>
          Book this room
        </button>
        </div>
        </li>
      )
      }
      </ul>
    </div>
  )
}