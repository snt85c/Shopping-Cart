import { HiOutlineShoppingCart } from "react-icons/hi";
import { indexBestWidthUrl, SearchAttraction } from "../Services";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Cart from "../CartComponents/Cart";
import DarkMode from "./DarkMode";

export default function Navbar({ setOnScreen, cart, setCart }) {
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [searchbarDisplay, setSearchbarDisplay] = useState("none");
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

  SearchAttraction(search, setSearchItems);

  function cartDisplayToggle() {
    return cart.display === "block" ? "none" : "block";
  }

  function searchbarDisplayToggle() {
    searchbarDisplay === "flex"
      ? setSearchbarDisplay("none")
      : setSearchbarDisplay("flex");
  }

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function CartCounter() {
    return (
      <div className="absolute top-1 md:top-2 right-1 md:rigth-2 w-5 h-5 text-center  text-xs font-bold z-10 rounded-full border-2 border-amber-500 dark:bg-gray-900 bg-white text-red-500">
        {cart.items.length}
      </div>
    );
  }

  function SearchbarItems({ data }) {
    return (
      <>
        <div
          className="flex-row flex p-1 border border-white hover:border-amber-500 bg-black  cursor-pointer  hover:bg-gray-800 hover:text-amber-500"
          onClick={() => {
            setOnScreen(data);
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

  function SearchSuggestions() {
    const searchItemsList = searchItems.map((item) => (
      <SearchbarItems data={item} key={item.id} />
    ));
    return (
      <>
        <div
          ref={wrapperRef}
          className=" absolute flex flex-col z-20  right-auto top-24  md:right-12 md:top-14"
          style={{ display: searchbarDisplay }}
        >
          {searchItemsList}
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" w-full md:static top-0 flex  flex-col md:flex-row justify-between items-center max-w-full border-b-amber-500 dark:bg-gray-900 bg-gray-50 border-b-2  font-extrabold text-4xl rounded-t-xl">
        <div
          className="flex w-full md:justify-start pt-2 md:pt-0 md:pl-2 font-newake subpixel-antialiased tracking-wider justify-center cursor-pointer dark:text-white text-black "
          onClick={() => (
            setCart({ ...cart, display: "none" }),
            navigate("/")
          )}
        >
          Ticketmaster
        </div>

        <div className="flex w-full md:justify-end md:mr-10 justify-center items-center">
          <DarkMode />
          <HiOutlineShoppingCart
            className="absolute top-2 md:top-2 right-1 cursor-pointer text-amber-500"
            onClick={() => setCart({ ...cart, display: cartDisplayToggle() })}
          />
          <input
            onChange={handleChange}
            className="flex m-2 top-36 dark:bg-black bg-white dark:text-white text-black text-sm p-2 mx-2 w-2-3 rounded-md  border-amber-500 border-2"
            placeholder="Search by Artist"
            onClick={() => searchbarDisplayToggle()}
          ></input>
          <SearchSuggestions />
          <CartCounter />
        </div>
      </div>
      <Cart cart={cart} setCart={setCart} />
    </>
  );
}
