import { useState } from 'react';
import useProducts from '../../hook/useProducts';
import Card from '../card/Card';

export default function Products() {
  const { products } = useProducts();
  const [sort, setSort] = useState('newest');
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  const sortProducts = [...(products?.data || [])].sort((a, b) => {
    if (sort === 'low') return a.price - b.price;
    if (sort === 'high') return b.price - a.price;
    if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
  });
  return (
    <>
      <div className="md:col-span-3">
        {/* <!-- Sorting Options --> */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            Showing {products?.data?.length} products
          </p>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-slate-700"
            >
              Sort by:
            </label>
            <select
              onChange={handleChange}
              value={sort}
              id="sort"
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
            >
              <option value={'newest'}>Newest</option>
              <option value={'oldest'}>Oldest</option>
              <option value={'low'}>Price: Low to High</option>
              <option value={'high'}>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* <!-- Products Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
          {/* <!-- Product Card 1 --> */}
        </div>
      </div>
    </>
  );
}
