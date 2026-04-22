import { useEffect, useState } from 'react';
import { ProductsContext } from '../context';

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState({
    low: '',
    high: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (search) {
        url = `http://localhost:9000/products/search?q=${search}&category=${category}&minPrice=${price.low}&maxPrice=${price.high}&minRating=${rating}`;
      } else {
        url = `http://localhost:9000/products/filter?category=${category}&minPrice=${price.low}&maxPrice=${price.high}&minRating=${rating}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };
    fetchData();
  }, [category, price.low, price.high, rating, search]);
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
          rating,
          setRating,
          search,
          setSearch,
        }}
      >
        {children}
      </ProductsContext.Provider>
    </>
  );
}
