import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { useContext } from "react";
import {  useDispatch } from "react-redux";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { setCart } from "../redux/slice";

export default function CartItems({ item, index }) {
  const AlertCtx = useContext(AlertContext);
  const dispatch = useDispatch();

  function ReduceTickets() {
    return (
      <div
        className="flex tooltip w-4 h-4 m-1 pb-1 justify-center items-center cursor-pointer hover:scale-110 duration-100"
        data-tip="reduce tickets"
        onClick={() => (
          dispatch(setCart({ type: "DECREASE_ITEM", payload: item, index })),
          AlertCtx.displayMsg(
            `${item.ticketInCart} tickets for ${item.name} in the Shopping Cart`,
            "alert-info"
          )
        )}
      >
        <AiFillMinusCircle />
      </div>
    );
  }
  function IncreaseTickets() {
    return (
      <div
        className="flex tooltip w-4 h-4  m-1 pb-1  justify-center items-center cursor-pointer hover:scale-110 duration-100"
        data-tip="increase tickets"
        onClick={() => {
          dispatch(setCart({ type: "INCREASE_ITEM", payload: item, index }))
            AlertCtx.displayMsg(
              `${item.ticketInCart} tickets for ${item.name} in the Shopping Cart`,
              "alert-info"
            )
        }}
      >
        <AiFillPlusCircle />
      </div>
    );
  }
  
  function RemoveItem() {
    function handleRemoveItemFromCart() {
      dispatch(setCart({ type: "REMOVE_ITEM", payload: item, index }))
      AlertCtx.displayMsg(
        `all tickets for ${item.name} have been removed from the  Shopping Cart`,
        "alert-info"
      );
    }
    return (
      <div
        className="flex tooltip text-red-700 pb-1 m-1 -700 w-4 h-4 justify-center items-center cursor-pointer hover:scale-110 duration-100"
        data-tip="remove from cart"
        onClick={handleRemoveItemFromCart}
      >
        <AiFillCloseCircle />
      </div>
    );
  }
  function TicketsCost() {
    return (
      <>
        <div className="divider-horizontal" />
        <div className="divider m-0 ">price</div>
        <div className="text-gray-800 dark:text-amber-500 flex justify-center font-bold items-center duration-300">
          {(item.ticketInCart * item.priceRanges[0].max).toFixed(2)}{" "}
          {item.priceRanges[0].currency}
        </div>
      </>
    );
  }

  function Price() {
    return (
      <div className="flex">
        {" "}
        price single ticket:{" "}
        <div className="text-black dark:text-white">
          {item.priceRanges[0].max.toFixed(2)}
          {item.priceRanges[0].currency}
        </div>
      </div>
    );
  }


  function CartItem() {
    return (
      <>
        <div className="text-left border rounded-md border-gray-500 p-3 m-2  text-black dark:text-white shadow-lg">
          <div className="text-black dark:text-white font-extrabold">
            {item.name}
          </div>
          <Price />
          <div className="flex">
            tickets:{" "}
            <div className="flex text-black dark:text-white">
              {" "}
              <ReduceTickets />
              {item.ticketInCart}
              <IncreaseTickets />
              <RemoveItem />
            </div>
          </div>
          <TicketsCost />
        </div>
      </>
    );
  }

  return (
    <>
      <CartItem />
    </>
  );
}
