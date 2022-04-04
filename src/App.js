import './index.css';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './Navbar';

function App() {
const [cart, setCart] =useState([])
  return (
    <>
      {/* <Navbar cart={cart} setCart={setCart}/> */}
      <Outlet />
    </>
  );
}

export default App;