import useProducts from '../../hook/useProducts';
import Card from '../card/Card';

export default function Products() {
  const { products } = useProducts();
  console.log(products.data);
  return (
    <>
      <div className="md:col-span-3">
        {/* <!-- Sorting Options --> */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            Showing {products.data.length} products
          </p>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-slate-700"
            >
              Sort by:
            </label>
            <select
              id="sort"
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* <!-- Products Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.data?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
          {/* <!-- Product Card 1 --> */}
        </div>
      </div>
    </>
  );
}
