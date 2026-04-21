import { useContext } from 'react';
import { CartContext } from '../context';

export default function useCart() {
  return useContext(CartContext);
}
