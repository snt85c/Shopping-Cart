import { useState } from "react";
export default function AddToCart({ setCart, cart, data }) {
  const [counter, setCounter] = useState(1);

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
        onClick={() => (data.priceRanges ? updateCounter(counter + 1) : "")}
      >
        +
      </div>
    );
  }

  function AddToCartButton() {
    return (
      <div className="font-bold border-2 text-amber-500 bg-gray-900 border-amber-500 p-1 cursor-pointer"
        onClick={() =>
          data.priceRanges
            ? ((data.ticketInCart = counter),
              setCart({
                ...cart,
                display: "block",
                items: [...cart.items, data],
              }))
            : 0
        }
      >
        {data.priceRanges ? "ADD TO CART" : "NO TICKETS"}
        {" "} (
        {data.priceRanges ? counter : 0} {counter > 1 ? "items" : "item"})
      </div>
    );
  }

  function DecreaseCounter() {
    return (
      <div className="m-2 font-bold border-2  text-amber-500 bg-gray-900 border-amber-500 p-1 px-2 cursor-pointer "
        onClick={() => (data.priceRanges ? updateCounter(counter - 1) : "")}
      >
        -
      </div>
    );
  }

  return (
    <>
    <div className="flex justify-center items-center mt-2">
        <IncreaseCounter />
        <AddToCartButton />
        <DecreaseCounter />
      </div>
    </>
  );
}
