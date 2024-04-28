import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Frontpage from './pages/Frontpage';
import LoginPage from './pages/LoginPage';
import RoomReservation from './pages/RoomReservation'
import RegisterUser from './pages/RegisterUser';


function App() {

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Frontpage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/RoomReservation' element={<RoomReservation />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
