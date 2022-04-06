import {  Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
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
    display: "none",
    items: [],
  });

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("onAttractionScreen")) {
      setOnAttractionScreen(
        JSON.parse(localStorage.getItem("onAttractionScreen"))
      );
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("onEventScreen")) {
      setOnEventScreen(JSON.parse(localStorage.getItem("onEventScreen")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "onAttractionScreen",
      JSON.stringify(onAttractionScreen)
    );
  }, [onAttractionScreen]);

  useEffect(() => {
    localStorage.setItem("onEventScreen", JSON.stringify(onEventScreen));
  }, [onEventScreen]);

  return (
    <>
      <HashRouter>
        <Navbar
          cart={cart}
          setCart={setCart}
          setOnScreen={setOnAttractionScreen}
        />
        <Cart cart={cart} setCart={setCart} />
        <Routes>
          <Route
            path="/"
            element={<First setOnScreen={setOnAttractionScreen} />}
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
            element={
              <Third onScreen={onEventScreen} cart={cart} setCart={setCart} />
            }
          />

          <Route path="*" element={<NoPath />} />
        </Routes>
      </HashRouter>
    </>
  );
}
