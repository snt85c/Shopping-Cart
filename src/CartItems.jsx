import { useContext } from "react";
import AlertContext from "./AlertComponents/AlertContextProvider";

export default function CartItems({ item, cart, setCart }) {
  const AlertCtx = useContext(AlertContext);
  function ReduceTickets() {
    return (
      <div
        className="flex  w-4 h-4 m-1 pb-1 border border-white justify-center items-center cursor-pointer"
        onClick={() => (
          item.ticketInCart > 1 ? (item.ticketInCart -= 1) : "",
          (setCart({ ...cart, items: [...cart.items] }),
          AlertCtx.displayMsg(
            `${item.ticketInCart} tickets for ${item.name} in the Shopping Cart`,
            "alert-info"
          ))
        )}
      >
        -
      </div>
    );
  }
  function IncreaseTickets() {
    return (
      <div
        className="flex w-4 h-4  m-1 pb-1 border border-white justify-center items-center cursor-pointer"
        onClick={() => (
          (item.ticketInCart += 1),
          setCart(
            { ...cart, items: [...cart.items] },
            AlertCtx.displayMsg(
              `${item.ticketInCart} tickets for ${item.name} in the Shopping Cart`,
              "alert-info"
            )
          )
        )}
      >
        +
      </div>
    );
  }

  function TicketsCost() {
    return (
      <>
        <div className="border border-white m-t-2" />
        tickets cost:
        <div className="text-white">
          {item.ticketInCart * item.priceRanges[0].max}{" "}
          {item.priceRanges[0].currency}
        </div>
      </>
    );
  }

  function Price() {
    return (
      <div className="flex">
        {" "}
        price:{" "}
        <div className="text-white">
          {item.priceRanges[0].max}
          {item.priceRanges[0].currency}
        </div>
      </div>
    );
  }

  function RemoveItem() {
    return (
      <div
        className="flex text-red-700 pb-1 m-1 border border-red-700 w-4 h-4 justify-center items-center cursor-pointer"
        onClick={() => {
          setCart({
            ...cart,
            items: [
              ...cart.items.filter((element) => {
                return element !== item;
              }),
            ],
          });
          AlertCtx.displayMsg(
            `all tickets for ${item.name} have been removed from the  Shopping Cart`,
            "alert-info"
          );
        }}
      >
        x
      </div>
    );
  }

  return (
    <>
      <div className="text-left border border-gray-500 p-3 m-2 text-gray-400">
        <div className="text-white">{item.name}</div>
        <Price />
        <div className="flex">
          tickets:{" "}
          <div className="flex text-white">
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
