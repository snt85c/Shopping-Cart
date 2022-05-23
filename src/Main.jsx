import { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AlertContextProvider } from "./AlertComponents/AlertContextProvider";
import Navbar from "./NavbarComponents/Navbar";
import SuggestionPage from "./SuggestionComponents/SuggestionPage";
import ArtistPage from "./ArtistComponents/ArtistPage";
import EventPage from "./EventComponents/EventPage";
import Alert from "./AlertComponents/Alert";
import NoPath from "./NoPath";
import "./index.css";

export default function Main() {
  let [onArtistScreen, setOnArtistScreen] = useState([]);
  let [onEventScreen, setOnEventScreen] = useState([]);
  let [cart, setCart] = useState({
    display: "none",
    items: [],
    isCheckoutClicked: false
  });

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("onAttractionScreen")) {
      setOnArtistScreen(
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
      JSON.stringify(onArtistScreen)
    );
  }, [onArtistScreen]);

  useEffect(() => {
    localStorage.setItem("onEventScreen", JSON.stringify(onEventScreen));
  }, [onEventScreen]);

  return (
    <>
      <AlertContextProvider>
        <HashRouter>
          <Alert />
          <Navbar
            cart={cart}
            setCart={setCart}
            setOnScreen={setOnArtistScreen}
          />
          <Routes>
            <Route
              path="/"
              element={<SuggestionPage setOnScreen={setOnArtistScreen} />}
            />
            <Route
              path=":second"
              element={
                <ArtistPage
                  onScreen={onArtistScreen}
                  setOnScreen={setOnEventScreen}
                />
              }
            />
            <Route
              path=":second/:third"
              element={
                <EventPage
                  onScreen={onEventScreen}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />

            <Route path="*" element={<NoPath />} />
          </Routes>
        </HashRouter>
      </AlertContextProvider>
    </>
  );
}
