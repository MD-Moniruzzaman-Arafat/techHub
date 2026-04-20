import { useEffect, useState } from 'react';
import { ProductsContext } from '../context';

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:9000/products/filter?category=${category}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, [category]);
  return (
    <>
      <ProductsContext.Provider
        value={{ products, setProducts, category, setCategory }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
}
