import { useContext } from 'react';
import { ProductsContext } from '../context';

export default function useProducts() {
  return useContext(ProductsContext);
}
