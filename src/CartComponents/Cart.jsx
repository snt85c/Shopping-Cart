import CartItems from "./CartItems";
import { useRef, useEffect, useContext } from "react";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { LoginComponent } from "../LoginComponent/UserAuth";
import Logout from "../LoginComponent/Logout";
import GoogleLogin from "../LoginComponent/GoogleLogin";
import emptycart from "../img/empty_cart.webp";

export default function Cart({ cart, setCart }) {
  const AlertCtx = useContext(AlertContext);
  const {  user } = LoginComponent();
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        const toggle = document.getElementsByClassName("toggle");
        const addToCart = document.getElementsByClassName("addToCart");
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          !event.target.contains(toggle[0]) &&
          !event.target.contains(addToCart[0])
        ) {
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
          className=" border-2 rounded-md font-bold text-base text-gray-800 bg-amber-500 border-amber-900 p-2 m-2 cursor-pointer hover:text-gray-100 shadow-2xl hover:border-white duration-300"
          onClick={() => {
            cart.items.length
              ? AlertCtx.displayMsg(
                  "Your purchase has been confirmed! Thank you for trying Tiketmaster",
                  "alert-success"
                )
              : AlertCtx.displayMsg(
                  "Nothing on the Shopping Cart",
                  "alert-warning"
                );
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
        className="absolute shadow-lg z-20 min-h-[90%] md:mt-2  md:top-12 right-0 dark:bg-gradient-to-t from-amber-500 to-gray-900 duration-1000 bg-white w-2/4 md:w-1/3 text-center text-sm border-amber-500 border-l-2 border-b-2 pt-2 cartAnimation text-black dark:text-white "
        style={{ display: cart.display }}
      >
        {cart.items.length === 0 ? (
          <div className="flex flex-col justify-center items-center fadeInAnimation">
            <div className="my-6 font-extrabold">
              Your cart is empty at the moment
            </div>
            <img
              src={emptycart}
              className="w-1/2 h-1/2 dark:invert opacity-50 duration-[1000ms]"
              alt="empty_cart"
            />
          </div>
        ) : (
          <>
            <div className="font-extrabold">in the cart{user && user.displayName? ` for ${user.displayName.split(" ")[0]}`:""}:</div>
            <div className="overflow-auto m-1 h-[55vh]  dark:bg-gray-700 bg-gray-200  duration-1000 rounded-xl">
              {items}
            </div>
            <br />
            <div className="text-center text-sm ">
              <div className="divider-horizontal" />
              <div className="divider m-0 ">final price</div>
              <span className="text-amber-500 dark:text-gray-800 duration-300 font-extrabold text-xl">
                {total}£
              </span>
            </div>
            <br />
            <div>
              {user ? (
                <div>
                  <Checkout />
                  <Logout />
                </div>
              ) : (
                <GoogleLogin />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
