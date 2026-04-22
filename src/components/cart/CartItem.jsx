import { useState } from 'react';
import useCart from '../../hook/useCart';

export default function CartItem({ item }) {
  const [count, setCount] = useState(item?.quantity);
  const { setCart } = useCart();
  const handleIncrement = async () => {
    if (item.product.stock > count) {
      const newQty = count + 1;

      setCount(newQty); // UI instantly update

      await fetch(`http://localhost:9000/cart/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQty,
        }),
      });

      const res = await fetch(`http://localhost:9000/cart`);
      const data = await res.json();
      setCart(data);
    }
  };
  const handleDecrement = async () => {
    if (count > 1) {
      const newQty = count - 1;

      setCount(newQty);

      await fetch(`http://localhost:9000/cart/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: newQty,
        }),
      });
      const res = await fetch(`http://localhost:9000/cart`);
      const data = await res.json();
      setCart(data);
    }
  };
  const handleDelete = async (id) => {
    await fetch(`http://localhost:9000/cart/${id}`, {
      method: 'DELETE',
    });
    const res = await fetch(`http://localhost:9000/cart`);
    const c = await res.json();
    setCart(c);
  };
  return (
    <>
      <div className="soft-card p-4 flex gap-4">
        <img
          src={`http://localhost:9000/${item.product.image}`}
          alt="Apple Mac Pro"
          className="w-24 h-24 object-cover rounded-lg bg-slate-100"
        />
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">
                {item.product.title}
              </h3>
              <p className="text-slate-500 text-sm">
                SKU: APP-MP-001 · {item.product.category}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-slate-400 hover:text-rose-500"
              aria-label="Remove"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-300"
              >
                −
              </button>
              <span className="text-sm font-semibold">{count}</span>
              <button
                onClick={handleIncrement}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-300"
              >
                +
              </button>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              ${item.product.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
