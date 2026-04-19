import { useEffect, useState } from 'react';
import { ProductsContext } from '../context';

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <ProductsContext.Provider value={{ products, setProducts }}>
        {children}
      </ProductsContext.Provider>
    </>
  );
}
