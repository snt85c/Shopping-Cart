import SearchbarItems from "./SearchbarItems";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import Cart from "./Cart";

export default function Navbar({
  handleChange,
  data,
  handleClickSearch,
  setOnScreen,
  setDisplayCart,
  cart,
  setCart,
  display,
  setDisplay,
}) {
  function CartCounter() {
    return (
      <div className="absolute top-1 md:top-2 right-1 md:rigth-2 w-5 h-5 text-center  text-xs font-bold z-10 rounded-full border-2 border-amber-500 bg-gray-900 text-red-500">
        {cart.items.length}
      </div>
    );
  }

  function Suggestions() {
    const searchItems = data.map((item) => (
      <SearchbarItems
        data={item}
        key={item.id}
        handleClickSearch={handleClickSearch}
        setDisplay={setDisplay}
      />
    ));
    return (
      <>
        <div
        //it moves because the position is absolute to the position of the navbar, which is sticky, so it will stay in the same place
          className=" absolute flex flex-col z-20  right-auto top-48  md:right-12 md:top-16"
          style={{ display: display }}
        >
          {searchItems}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex top-0 flex-col md:flex-row justify-between items-center max-w-full border-b-amber-500 bg-gray-900 border-b-2 py-2 font-extrabold text-4xl z-40">
        <div
          className="flex w-full md:justify-start md:pl-2 font-newake subpixel-antialiased tracking-wider justify-center cursor-pointer text-white"
          onClick={() => (
            setOnScreen([]),
            setCart({ ...cart, display: "none" }),
            setDisplay("none")
          )}
        >
          Ticketmaster
        </div>
        <div className="flex w-full md:justify-end md:mr-10 justify-center ">
          <Suggestions />
          <Cart cart={cart} setCart={setCart} />
          <HiOutlineShoppingCart
            className="absolute top-2 md:top-4 right-1 cursor-pointer text-amber-500"
            onClick={()=>(setDisplayCart(),setDisplay("none"))}
          />
          <input
          ///searchbar on the navbar
            onChange={handleChange}
            className="hidden md:flex m-2 top-36 bg-black text-white text-sm p-2 mx-2 w-2-3 rounded-md  border-amber-500 border-2"
            placeholder="Search by Artist"
            onClick={() =>(
              display === "none" ? (setDisplay("flex"),setDisplayCart("none") ): setDisplay("none"))
            }
          ></input>
          <CartCounter />
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
}
