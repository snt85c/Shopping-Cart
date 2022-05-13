import CartItems from "./CartItems";
import { useRef, useEffect, useContext } from "react";
import AlertContext from "./AlertComponents/AlertContextProvider";

export default function Cart({ cart, setCart }) {
  const AlertCtx = useContext(AlertContext);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          ref.current.style.display = "none";
          // setCart({...cart,display:"none"})
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

  const items = cart.items.map((item, i) => (
    <CartItems item={item} cart={cart} key={i} id={i} setCart={setCart} />
  ));

  const total = cart.items.reduce(
    (sum, item) => sum + item.priceRanges[0].max * item.ticketInCart,
    0
  );

  function Checkout() {
    return (
      <>
        <div
          className=" border-2 font-bold text-base text-gray-800 bg-amber-500 border-amber-900 p-2 m-2 cursor-pointer "
          onClick={() => {
            cart.items.length
              ? AlertCtx.displayMsg(
                  "Your purchase has been confirmed! Thank you for trying Tiketmaster",
                  "alert-success"
                )
              : AlertCtx.displayMsg("Nothing on the Shopping Cart", "alert-warning");
            setCart({ ...cart, items: [], number: 0 });
          }}
        >
          CHECKOUT
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className="fixed z-20 top-20 min-h-full md:mt-2 mt-4 md:top-12 right-0 bg-gray-900 w-2/4 md:w-1/3 text-center text-sm border-amber-500 border-l-2 border-b-2 cartAnimation  pt-2"
        style={{ display: cart.display }}
      >
        {cart.items.length === 0 ? "nothing to display" : "in the cart:"}
        <div className="overflow-auto h-64 md:h-80">{items}</div>
        <br />
        <div className="text-center text-sm ">
          <div>TOTAL: {total}£</div>
          <br />
          <div>
            <Checkout />
          </div>
        </div>
      </div>
    </>
  );
}
