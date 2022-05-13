import { useContext, useState } from "react";
import AlertContext from "./AlertComponents/AlertContextProvider";
export default function AddToCart({ setCart, cart, data }) {
  const [counter, setCounter] = useState(1);
  const AlertCtx = useContext(AlertContext)

  function updateCounter(value) {
    if (counter >= 1) {
      setCounter(value);
    }
    if (counter === 0) {
      setCounter(1);
    }
  }

  function IncreaseCounter() {
    return (
      <div className="m-2 border-2 font-bold text-amber-500 bg-gray-900 border-amber-500 p-1 px-2 cursor-pointer "
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
      <div className="font-bold  text-center border-2 text-amber-500 bg-gray-900 border-amber-500 p-1 cursor-pointer"
        onClick={() =>
          data.priceRanges
            ? ((data.ticketInCart = counter),
              setCart({
                ...cart,
                display: "block",
                items: [...cart.items, data],
              }), AlertCtx.displayMsg(`${data.name} is added to cart`, "alert-info")
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
      <div className="m-2 font-bold border-2  text-amber-500 bg-gray-900 border-amber-500 p-1 px-2 cursor-pointer "
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
