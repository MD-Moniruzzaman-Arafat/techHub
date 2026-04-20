import { useEffect, useState } from 'react';
import { ProductsContext } from '../context';

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState({
    low: '',
    high: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:9000/products/filter?category=${category}&minPrice=${price.low}&maxPrice=${price.high}`
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, [category, price.low, price.high]);
  return (
    <>
      <ProductsContext.Provider
        value={{
          products,
          setProducts,
          category,
          setCategory,
          price,
          setPrice,
        }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
}
