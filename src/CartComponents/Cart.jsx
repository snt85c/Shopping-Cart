import CartItems from "./CartItems";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useContext } from "react";
import AlertContext from "../AlertComponents/AlertContextProvider";
import { LoginComponent } from "../LoginComponent/UserAuth";
import Logout from "../LoginComponent/Logout";
import GoogleLogin from "../LoginComponent/GoogleLogin";
import emptycart from "../img/empty_cart.webp";
import happycart from "../img/happy_cart.webp";
import { setCart } from "../redux/slice";

export default function Cart({ display }) {
  const AlertCtx = useContext(AlertContext);
  const { user } = LoginComponent();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.reducer.cart);

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
    <CartItems item={item} cart={cart} key={i} index={i} setCart={setCart} />
  ));

  const total = cart.items.reduce(
    (sum, item) => sum + item.priceRanges[0].max * item.ticketInCart,
    0
  );

  function CheckoutButton() {
    return (
      <>
        <div
          className=" border-2 rounded-md font-bold text-base text-gray-800 bg-amber-500 border-amber-900 p-2 m-2 cursor-pointer hover:text-gray-100 shadow-2xl hover:border-white duration-300"
          onClick={() => {
            cart.items.length &&
              AlertCtx.displayMsg(
                "Your purchase has been confirmed! Thank you for trying Tiketmaster",
                "alert-success"
              );
            dispatch(setCart({type:"CHECKOUT_CART"}));
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
        className="cartOverlay absolute shadow-lg z-20 min-h-[92vh] top-[104px] md:top-[56px] right-0 
        dark:bg-gradient-to-t from-amber-500 to-gray-900 duration-1000 bg-white text-black dark:text-white
        w-2/4 md:w-1/3 
        text-center text-sm border-amber-500 border-l-2 border-b-2 pt-2 
        cartAnimation"
        style={{ display: display }}
      >
        {cart.items.length === 0 ? (
          <div className="flex flex-col justify-center items-center fadeInAnimation">
            {cart.isCheckoutClicked ? (
              <>
                {" "}
                <div className="my-6 font-extrabold">
                  Thanks for Shopping with us!
                </div>
                <img
                  src={happycart}
                  className="w-1/2 h-1/2 dark:invert opacity-50 duration-1000"
                  alt="happy_cart"
                />
              </>
            ) : (
              <>
                {" "}
                <div className="my-6 font-extrabold">
                  Your cart is empty at the moment
                </div>
                <img
                  src={emptycart}
                  className="w-1/2 h-1/2 dark:invert opacity-50 duration-1000"
                  alt="empty_cart"
                />
              </>
            )}
          </div>
        ) : (
          <>
            <div className="font-extrabold">
              in the cart
              {user && user.displayName
                ? ` for ${user.displayName.split(" ")[0]}`
                : ""}
              :
            </div>
            <div className="overflow-auto m-1 h-[55vh]  dark:bg-gray-700 bg-gray-200  duration-1000 rounded-xl">
              {items}
            </div>
            <br />
            <div className="text-center text-sm ">
              <div className="divider-horizontal" />
              <div className="divider m-0 ">final price</div>
              <span className="text-amber-500 dark:text-gray-800 duration-300 font-extrabold text-xl">
                {total.toFixed(2)}£
              </span>
            </div>
            <br />
            <div className="pb-5">
              {user ? (
                <div>
                  <CheckoutButton />
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
