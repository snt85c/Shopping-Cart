import { useContext, useState, useEffect } from "react";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/slice";

export default function AddToCart({ cart, data }) {
  const AlertCtx = useContext(AlertContext);
  const [counter, setCounter] = useState(1);
  const [buttonStatus, setButtonStatus] = useState({
    message: "ADD TO CART",
    isInCart: false,
    isAvailable: true,
  });
  const cartDOMElement = document.getElementsByClassName("cartOverlay");
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart && cart.items.length !== 0) {
      if (cart.items.some((item) => item.id === data.id)) {
        setButtonStatus({
          ...buttonStatus,
          message: "ALREADY IN THE CART",
          isInCart: true,
        });
      }
    } else {
      setButtonStatus({
        ...buttonStatus,
        message: "ADD TO CART",
        isInCart: false,
        isAvailable: true,
      });
    }
    if (!data.priceRanges) {
      setButtonStatus({
        ...buttonStatus,
        message: "NO TICKETS AVAILABLE",
        isAvailable: false,
      });
    }
  }, [cart.items]);

  function handleAddToCart() {
    if (buttonStatus.isAvailable && !buttonStatus.isInCart) {
      const newItem = { ...data, ticketInCart: counter };
      //manipulates directly the DOM to circumvent passing state, some components with Suspense were affected
      cartDOMElement[0].style.display = "block";
      //sets the cart with new
      AlertCtx.displayMsg(`${data.name} is added to cart`, "alert-success");
      dispatch(setCart({ type: "ADD_TO_CART", payload: newItem }));
    } else if (buttonStatus.isAvailable && buttonStatus.isInCart) {
      AlertCtx.displayMsg(
        `${data.name} is already in the basket`,
        "alert-warning"
      );
    } else {
      AlertCtx.displayMsg(
        `${data.name} has no events available`,
        "alert-error"
      );
    }
  }

  function updateCounter(value) {
    if (value >= 1) {
      setCounter(value);
    }
  }

  function IncreaseCounter() {
    return (
      <div
        className="flex items-center justify-center shadow-2xl my-2  h-10 w-10 text-center border-2 rounded font-bold p-1 px-2 cursor-pointer
       dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300 "
        style={{
          display:
            data.priceRanges &&
            buttonStatus.isAvailable &&
            !buttonStatus.isInCart
              ? "block"
              : "none",
        }}
        onClick={() => (data.priceRanges ? updateCounter(counter + 1) : "")}
      >
        +
      </div>
    );
  }

  function DecreaseCounter() {
    return (
      <div
        className=" my-2 h-10 w-10 font-bold border-2 rounded shadow-2xl text-center p-1 px-2 cursor-pointer
      dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300"
        onClick={() => (data.priceRanges ? updateCounter(counter - 1) : "")}
        style={{
          display:
            data.priceRanges &&
            buttonStatus.isAvailable &&
            !buttonStatus.isInCart
              ? "block"
              : "none",
        }}
      >
        -
      </div>
    );
  }

  function AddToCartButton() {
    return (
      <div className="flex flex-col justify-center items-center">
        <div
          className="addToCart m-2 flex items-center justify-center shadow-2xl font-bold md:w-80 h-10  border-2 rounded cursor-pointer p-1
      dark:text-amber-500 text-gray-900 dark:bg-gray-900 bg-amber-500 border-amber-500 hover:text-gray-100 dark:hover:text-white duration-300 "
          onClick={handleAddToCart}
        >
          {buttonStatus.message} ({data.priceRanges ? counter : 0}{" "}
          {counter > 1 ? "items" : "item"})
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center mx-4">
        <DecreaseCounter />
        <AddToCartButton />
        <IncreaseCounter />
      </div>
    </>
  );
}
