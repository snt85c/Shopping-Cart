import CartItems from "./CartItems";

export default function Cart({ cart, setCart }) {
  const items = cart.items.map((item, i) => (
    <CartItems item={item} cart={cart} key={i} id={i} setCart={setCart} />
  ));

  const total = cart.items.reduce(
    (sum, item) => sum + item.priceRanges[0].max * item.ticketInCart,
    0
  );

  function ProceedToCheckout() {
    return (
      <div className=" border-2 text-gray-800 bg-amber-500 border-amber-300 p-2 m-2 cursor-pointer "
      onClick={() => setCart({ ...cart, items: [], number: 0 })}>
        Checkout
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed z-20 top-28 mt-2 md:top-16 right-0 bg-gray-900 w-2/4 md:w-1/3 text-center text-sm border-amber-500 border-l-2 border-b-2 cartAnimation "
        style={{ display: cart.display }}
      >
        {cart.items.length === 0 ? "nothing to display" : "in the cart:"}
        <div className="overflow-auto h-64 md:h-80">{items}</div>
        <br />
        <div className="text-center text-sm ">
          <div>TOTAL: {total}</div>
          <br />
          <div>
            <ProceedToCheckout />
          </div>
        </div>
      </div>
    </>
  );
}
