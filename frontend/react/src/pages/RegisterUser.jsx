import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";

export default function RegisterUser() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [successfulRegistration, setSuccessfulRegistration] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false); 


    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const registerUser = async () => {
        const userData = {
            username: userName,
            password: password,
        }

        try {
            const response = await axios.post("https://localhost:7028/api/User/registeruser", userData);
            console.log(response.data);

            localStorage.setItem('user', JSON.stringify(response.data));

            setSuccessfulRegistration(true);
            setErrorMessage(false);
            setTimeout(() => {
                navigate("/RoomReservation");
                setSuccessfulRegistration(false);
                
            }, 2000)
        } catch(err) {
            console.error("Registration failed", err);
            setErrorMessage(true);
        }
    }

    return ( 
        <>
        <h1>Register user</h1>
        
        <div>
            <input type="text" 
            name="username" 
            placeholder="Enter username" 
            value={userName} 
            onChange={handleUsernameChange}
            />

            <input type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            />
            <button type="submit" onClick={registerUser}>Register user</button>
        </div>
        
        <div>
            <p>Already registered? Sign in <a href="/Login">here</a></p>
        </div>

        <div>
            {successfulRegistration && <Alert severity="success">User created successfully, redirecting...</Alert> }
            {errorMessage && <Alert severity="error"> User already exists </Alert>}
        </div>
        </>
    )
}