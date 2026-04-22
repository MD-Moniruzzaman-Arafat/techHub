import { useEffect, useState } from 'react';
import { CartContext } from '../context';

export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [cartBtn, setCartBtn] = useState(false);
  useEffect(() => {
    const fetchCartData = async () => {
      const res = await fetch(`http://localhost:9000/cart`);
      const data = await res.json();
      setCart(data);
    };
    fetchCartData();
  }, []);
  return (
    <>
      <CartContext.Provider value={{ cart, setCart, cartBtn, setCartBtn }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
