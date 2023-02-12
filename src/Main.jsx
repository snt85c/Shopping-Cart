import { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { AlertContextProvider } from "./AlertComponents/AlertContextProvider";
import telegramAlert from "./LoginComponent/TelegramAlerter";
import Navbar from "./NavbarComponents/Navbar";
import SuggestionPage from "./SuggestionComponents/SuggestionPage.jsx";
import ArtistPage from "./ArtistComponents/ArtistPage";
import EventPage from "./EventComponents/EventPage";
import Alert from "./AlertComponents/Alert";
import NoPath from "./NoPath";
import "./index.css";
import { setCart } from "./redux/slice";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";

export default function Main() {
  const artist = useSelector((state) => state.reducer.artist);
  const venue = useSelector((state) => state.reducer.venue);
  let cart = useSelector((state) => state.reducer.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    telegramAlert();
    //check if localStorage has a "cart", in that case pass it to the reducer
    if (JSON.parse(localStorage.getItem("cart"))) {
      cart = JSON.parse(localStorage.getItem("cart"));
      dispatch(setCart({ type: "SET_CART", payload: cart }));
    }
  }, []);

  useEffect(() => {
    //everytime the cart is modified, i should save it on localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  return (
    <>
      <AlertContextProvider>
        <HashRouter>
          <Alert />
          <Navbar cart={cart} />
          <Routes>
            <Route path="/" element={<SuggestionPage />} />
            <Route path=":second" element={<ArtistPage onScreen={artist} />} />
            <Route
              path=":second/:third"
              element={<EventPage onScreen={venue} cart={cart} />}
            />

            <Route path="*" element={<NoPath />} />
          </Routes>
          <Footer />
        </HashRouter>
      </AlertContextProvider>
    </>
  );
}
