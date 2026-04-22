import useCart from '../../hook/useCart';
import CartItem from './CartItem';

export default function Cart() {
  const { cart } = useCart();
  const subtotal = cart.data.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">
              Your bag
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Shopping Cart
            </h1>
          </div>
          <a
            href="index.html"
            className="text-sm font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-2"
          >
            <span>Continue shopping</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* <!-- Cart Items --> */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* <!-- Cart Item 1 --> */}
              {cart?.data?.map((c) => (
                <CartItem key={c.id} item={c} />
              ))}
            </div>
          </div>

          {/* <!-- Checkout Form --> */}
          <div className="lg:col-span-1">
            <div className="soft-card p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* <!-- Summary --> */}
              <div className="space-y-3 border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 text-slate-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
