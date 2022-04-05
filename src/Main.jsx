import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar";
import Cart from "./Cart";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import NoPath from "./NoPath";

export default function Main() {
  let [onAttractionScreen, setOnAttractionScreen] = useState([]);
  let [onEventScreen, setOnEventScreen] = useState([]);
  let [cart, setCart] = useState({
    display:"none",
    items: []
  })

  return (
    <>
      <HashRouter>
        <Navbar cart={cart} setCart={setCart} setOnScreen={setOnAttractionScreen}/>
        <Cart cart={cart} setCart={setCart}/>
        <Routes>
          <Route
            path="/"
            element={
              <First
                setOnScreen={setOnAttractionScreen}
              />
            }
          />
          <Route
            path=":second"
            element={
              <Second
                onScreen={onAttractionScreen}
                setOnScreen={setOnEventScreen}
              />
            }
          />
          <Route
            path=":second/:third"
            element={<Third onScreen={onEventScreen} cart={cart} setCart={setCart} />}
          />

          <Route path="*" element={<NoPath />} />
        </Routes>
      </HashRouter>
    </>
  );
}
