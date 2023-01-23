import { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AlertContextProvider } from "./AlertComponents/AlertContextProvider";
import telegramAlert from "./LoginComponent/TelegramAlerter";
import Navbar from "./NavbarComponents/Navbar";
import SuggestionPage from "./SuggestionComponents/SuggestionPage";
import ArtistPage from "./ArtistComponents/ArtistPage";
import EventPage from "./EventComponents/EventPage";
import Alert from "./AlertComponents/Alert";
import NoPath from "./NoPath";
import "./index.css";
import { useSelector } from "react-redux";

export default function Main() {
  const artist = useSelector((state) => state.reducer.artist);
  const cart = useSelector((state) => state.reducer.cart);

  useEffect(() => {
    telegramAlert();
  }, []);

  //the below useEffect are used to keep the screen states as well as the cart element if the screen is refreshed,
  // expecially on mobile when scrolling down can trigger an involutnary refresh of the page
 /*

  useEffect(() => {
    if (localStorage.getItem("onAttractionScreen")) {
      setOnArtistScreen(JSON.parse(localStorage.getItem("onAttractionScreen")));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("onEventScreen")) {
      setOnEventScreen(JSON.parse(localStorage.getItem("onEventScreen")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("onAttractionScreen", JSON.stringify(artist));
  }, [artist]);

  useEffect(() => {
    localStorage.setItem("onEventScreen", JSON.stringify(event));
  }, [event]);
*/
  return (
    <>
      
        <AlertContextProvider>
          <HashRouter>
            <Alert />
            <Navbar
              cart={cart}
            />
            <Routes>
              <Route
                path="/"
                element={<SuggestionPage  />}
              />
              <Route
                path=":second"
                element={
                  <ArtistPage
                    onScreen={artist}
                  />
                }
              />
              <Route
                path=":second/:third"
                element={
                  <EventPage
                    cart={cart}
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
