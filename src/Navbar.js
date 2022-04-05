import { HiOutlineShoppingCart } from "react-icons/hi";
import { indexBestWidthUrl } from "./Services";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({
  setOnScreen,
  cart,
  setCart,
}) {
  const APIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD";
  let [search, setSearch] = useState("");
  let [searchItems, setSearchItems] = useState([]);
  let [searchbarDisplay, setSearchbarDisplay] = useState("none");
  const navigate = useNavigate();

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

  function SearchAttraction(search, setData) {
    useEffect(() => {
      async function getData() {
        if (search !== "") {
          let attractions = [];
          const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${search}&countryCode=UK&apikey=${APIKEY}`;
          const response = await fetch(url, { mode: "cors" });
          const result = await response.json();
          try {
            result._embedded.attractions.forEach((item) => {
              if (item.upcomingEvents._total !== 0) {
                attractions.push(item);
              }
            });
            setData(attractions);
          } catch (e) {}
        }
      }
      getData();
    }, [search]);
  }

  SearchAttraction(search, setSearchItems);

  function CartCounter() {
    return (
      <div className="absolute top-1 md:top-2 right-1 md:rigth-2 w-5 h-5 text-center  text-xs font-bold z-10 rounded-full border-2 border-amber-500 bg-gray-900 text-red-500">
        {cart.items.length}
      </div>
    );
  }

  function SearchbarItems({ data }) {
    return (
      <>
        <div
          className="flex-row flex p-1 border border-white hover:border-amber-500 bg-black cursor-pointer  hover:bg-gray-800 hover:text-amber-500"
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
      <SearchbarItems
        data={item}
        key={item.id}

      />
    ));
    return (
      <>
        <div
          className=" absolute flex flex-col z-20  right-auto top-48  md:right-12 md:top-14"
          style={{ display: searchbarDisplay }}
        >
          {searchItemsList}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky flex top-0 flex-col md:flex-row justify-between items-center max-w-full border-b-amber-500 bg-gray-900 border-b-2 py-2 font-extrabold text-4xl z-40">
        <div
          className="flex w-full md:justify-start md:pl-2 font-newake subpixel-antialiased tracking-wider justify-center cursor-pointer text-white"
          onClick={() => (
            //   setOnScreen([]),
            setCart({ ...cart, display: "none" }),
            //   setDisplay("none")
            navigate("/")
          )}
        >
          Ticketmaster
        </div>
        <div className="flex w-full md:justify-end md:mr-10 justify-center ">
          <HiOutlineShoppingCart
            className="absolute top-2 md:top-4 right-1 cursor-pointer text-amber-500"
            onClick={() => setCart({ ...cart, display: cartDisplayToggle() })}
          />
          <input
            ///searchbar on the navbar
            onChange={handleChange}
            className="flex m-2 top-36 bg-black text-white text-sm p-2 mx-2 w-2-3 rounded-md  border-amber-500 border-2"
            placeholder="Search by Artist"
            onClick={() => searchbarDisplayToggle()}
          ></input>
          <SearchSuggestions />
          <CartCounter />
        </div>
      </div>
    </>
  );
}
