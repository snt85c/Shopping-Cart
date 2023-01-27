import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  indexBestWidthUrl,
  FetchAttractionToSearchFromTicktmasterAPI,
} from "../Services";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Cart from "../CartComponents/Cart";
import DarkMode from "./DarkMode";
import { useDispatch } from "react-redux";
import { setArtist } from "../redux/slice";

export default function Navbar({ setCart }) {
  const cart = useSelector((state) => state.reducer.cart);
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchbarDisplay, setSearchbarDisplay] = useState("none");
  const [cartIconDisplay, setCartIconDisplay] = useState("none");
  const navigate = useNavigate();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // ref.current.style.display = "none";
          setSearchbarDisplay("none");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  FetchAttractionToSearchFromTicktmasterAPI(search, setSearchItems);

  function searchbarDisplayToggle() {
    searchbarDisplay === "flex"
      ? setSearchbarDisplay("none")
      : setSearchbarDisplay("flex");
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleCartDisplay() {
    setCartIconDisplay(cartIconDisplay === "block" ? "none" : "block");
  }

  function CartCounter() {
    return (
      <div className="absolute top-1 md:top-2 right-3 md:rigth-2 w-5 h-5 text-center  text-xs font-bold z-10 rounded-full border-2 border-amber-500 dark:bg-gray-900  bg-white text-red-500">
        {cart.items.length}
      </div>
    );
  }

  function SearchbarItems({ data }) {
    const dispatch = useDispatch();
    return (
      <>
        <div
          className="flex-row flex p-1 border border-white hover:border-amber-500 bg-black  cursor-pointer  hover:bg-gray-800 hover:text-amber-500"
          onClick={() => {
            dispatch(setArtist(data));

            navigate(`/${data.name.replace(/ /g, "_")}`);
            setSearchbarDisplay("none");
          }}
        >
          <div className=" flex flex-col">
            <div className="flex w-40  text-sm  ">{data.name}</div>
            <div className="flex w-40 text-sm ">
              {data.upcomingEvents._total} events
            </div>
          </div>
          <img
            className=" flex m-1 w-12 h-full object-contain"
            alt=""
            src={data.images[indexBestWidthUrl(data)].url}
          ></img>
        </div>
      </>
    );
  }

  function CartIcon() {
    return (
      <>
        <div className="md:hidden block -ml-7">
          <DarkMode />
        </div>
        <div
          className="absolute top-2 right-3 cursor-pointer text-amber-500"
          onClick={() => handleCartDisplay()}
        >
          <HiOutlineShoppingCart />
        </div>
      </>
    );
  }

  function SearchSuggestions() {
    const searchItemsList = searchItems.map((item) => (
      <SearchbarItems data={item} key={item.id} />
    ));
    return (
      <>
        <div
          ref={wrapperRef}
          className=" absolute flex flex-col z-20  right-auto +5 top-24  md:right-12 md:top-14"
          style={{ display: searchbarDisplay }}
        >
          {searchItemsList}
        </div>
      </>
    );
  }

  return (
    <>
      <div aria-label="navbar" className=" w-full relative top-0 flex  flex-col md:flex-row justify-between items-center max-w-full border-b-amber-500 dark:bg-gray-900 bg-white border-b-2 font-extrabold text-4xl  h-[12vh]md:h-[6vh]  ">
        <div
          className="flex w-full md:justify-start pt-2 md:pt-0 md:pl-2 font-newake subpixel-antialiased tracking-wider justify-center cursor-pointer dark:text-white duration-1000 text-black "
          onClick={() => navigate("/")}
        >
          Ticketmaster
        </div>

        <div className="flex w-full md:justify-end md:mr-10 justify-center items-center">
          <CartIcon />
          <div className="hidden md:block">
            <DarkMode />
          </div>

          <input
            onChange={handleChange}
            className="flex m-2 top-36 dark:bg-black bg-white dark:text-white duration-[1000ms] text-black text-sm p-2 mx-2 w-2-3 rounded-md  border-amber-500 border-2"
            placeholder="Search by Artist"
            onClick={() => searchbarDisplayToggle()}
          ></input>
          <SearchSuggestions />
          <CartCounter />
        </div>
        <Cart cart={cart} setCart={setCart} display={cartIconDisplay} />
      </div>
    </>
  );
}
