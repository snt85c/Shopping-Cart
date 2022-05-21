import { useContext, useState } from "react";
import AlertContext from "../AlertComponents/AlertContextProvider";
export default function AddToCart({ setCart, cart, data }) {
  const [counter, setCounter] = useState(1);
  const AlertCtx = useContext(AlertContext)

  function updateCounter(value) {
    if (value >= 1) {
      setCounter(value);
    }
  }

  function IncreaseCounter() {
    return (
      <div className="flex items-center justify-center shadow-2xl m-2  h-10 w-10 text-center border-2 rounded font-bold p-1 px-2 cursor-pointer
       dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300 "
        style={{display:data.priceRanges?"block":"none"}}
        onClick={() => (data.priceRanges ? updateCounter(counter + 1) : "")}
      >
        +
      </div>
    );
  }

  function AddToCartButton() {
    return (
      <div className="flex flex-col justify-center items-center">
      <div className="addToCart flex items-center justify-center shadow-2xl font-bold md:w-80 h-10  border-2 rounded cursor-pointer p-1
      dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300 "
        onClick={() =>
          data.priceRanges
            ? ((data.ticketInCart = counter),
              setCart({
                display:"block",
                items: [...cart.items, data],
              }), AlertCtx.displayMsg(`${data.name} is added to cart`, "alert-success")
              )
            : AlertCtx.displayMsg(`${data.name} has no events available`, "alert-error")
        }
      >
        {data.priceRanges ? "ADD TO CART" : "NO TICKETS"}
        {" "} (
        {data.priceRanges ? counter : 0} {counter > 1 ? "items" : "item"})
      </div>
      <div className="text-sm mt-2 items-center justify-center text-center" 
      style={{display:data.priceRanges?"none":"block"}}>there are no tickets available for this event at this moment . Please select another venue or date</div>
      </div>
    );
  }

  function DecreaseCounter() {
    return (
      <div className=" m-2 h-10 w-10 font-bold border-2 rounded shadow-2xl text-center p-1 px-2 cursor-pointer
      dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300"
        onClick={() => (data.priceRanges ? updateCounter(counter - 1) : "")}
        style={{display:data.priceRanges?"block":"none"}}
      >
        -
      </div>
    );
  }

  return (
    <>
    <div className="flex justify-center items-center my-4">
        <IncreaseCounter />
        <AddToCartButton />
        <DecreaseCounter />
      </div>
    </>
  );
}