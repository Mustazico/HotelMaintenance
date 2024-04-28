import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';

export default function LoginPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false); 
    
    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const logInUser = async () => {
        const userData = { 
            username: userName,
            password: password
        }
        
        try {
            const response = await axios.post("https://localhost:7028/api/User/loginuser", userData)
            console.log(response.data);

            localStorage.setItem('user', JSON.stringify(response.data));
            
            setSuccessfulLogin(true);
            setErrorMessage(false);
            setTimeout(() => {
                navigate("/RoomReservation");
                setSuccessfulLogin(false);
        }, 2000);
        } catch(err) {
            console.error("Error signing in user", err);
            setErrorMessage(true);
            

        }
    };

    


    return ( 
        <>
        <h1>Login</h1>

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
            <button type="submit" onClick={logInUser}>Logg inn</button>
        </div>
        
        <p>Not registered yet? Consider creating an account below. </p>
        <button onClick={() => navigate("/RegisterUser")}>Register a new user</button>

        <div>
            {successfulLogin && <Alert severity="success"> User logged in successfully, redirecting...</Alert>}

            {errorMessage && <Alert severity="error">Username or password is wrong.</Alert>}

        </div>

        
        </>
    );
}