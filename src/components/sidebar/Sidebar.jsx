import { useEffect, useState } from 'react';
import useProducts from '../../hook/useProducts';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const { category, setCategory, price, setPrice, rating, setRating } =
    useProducts();
  useEffect(() => {
    const loadCategory = async () => {
      const res = await fetch(`http://localhost:9000/categories`);
      const data = await res.json();
      // console.log(data);
      setCategories(data?.data);
    };
    loadCategory();
  }, []);

  const priceRange = [
    {
      low: 0,
      high: 2000,
    },
    {
      low: 2000,
      high: 5000,
    },
    {
      low: 5000,
      high: '',
    },
  ];

  const handleCategory = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCategory(value);
    } else {
      setCategory('');
    }
  };
  const handlePrice = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    const [low, high] = value.split(',');
    if (checked) {
      setPrice({ low: Number(low), high: high ? Number(high) : '' });
    } else {
      setPrice({ low: '', high: '' });
    }
  };
  const handleRating = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRating(value);
    } else {
      setPrice('');
    }
  };
  return (
    <>
      <div className="md:col-span-1 space-y-4">
        <div className="soft-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <button className="text-xs text-rose-500 font-semibold">
              Clear
            </button>
          </div>

          {/* <!-- Category Filter --> */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-3 text-slate-700">
              Category
            </h4>
            <div className="space-y-2">
              {categories?.map((c) => (
                <label key={c.id} className="flex items-center cursor-pointer">
                  <input
                    checked={c.name === category}
                    value={c.name}
                    onChange={handleCategory}
                    type="checkbox"
                    className="w-4 h-4 text-rose-500 rounded border-slate-300"
                  />
                  <span className="ml-3 text-sm text-slate-700">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* <!-- Price Filter --> */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-3 text-slate-700">
              Price Range
            </h4>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  checked={
                    price.low === priceRange[0].low &&
                    price.high === priceRange[0].high
                  }
                  onChange={handlePrice}
                  value={`${priceRange[0].low},${priceRange[0].high}`}
                  type="checkbox"
                  name="price"
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-sm text-slate-700">$0 - $2000</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  checked={
                    price.low === priceRange[1].low &&
                    price.high === priceRange[1].high
                  }
                  onChange={handlePrice}
                  value={`${priceRange[1].low},${priceRange[1].high}`}
                  type="checkbox"
                  name="price"
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-sm text-slate-700">
                  $2000 - $5000
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  checked={
                    price.low === priceRange[2].low &&
                    price.high === priceRange[2].high
                  }
                  onChange={handlePrice}
                  value={`${priceRange[2].low},${priceRange[2].high}`}
                  type="checkbox"
                  name="price"
                  className="w-4 h-4 text-rose-500"
                />
                <span className="ml-3 text-sm text-slate-700">$5000+</span>
              </label>
            </div>
          </div>

          {/* <!-- Rating Filter --> */}
          <div>
            <h4 className="font-medium text-sm mb-3 text-slate-700">Rating</h4>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  checked={rating === '4.5'}
                  onChange={handleRating}
                  value={'4.5'}
                  type="checkbox"
                  className="w-4 h-4 text-rose-500 rounded border-slate-300"
                />
                <span className="ml-3 text-sm text-slate-700">4.5 ⭐ & up</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  checked={rating === '4.0'}
                  onChange={handleRating}
                  value={'4.0'}
                  type="checkbox"
                  className="w-4 h-4 text-rose-500 rounded border-slate-300"
                />
                <span className="ml-3 text-sm text-slate-700">4.0 ⭐ & up</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  checked={rating === '3.5'}
                  onChange={handleRating}
                  value={'3.5'}
                  type="checkbox"
                  className="w-4 h-4 text-rose-500 rounded border-slate-300"
                />
                <span className="ml-3 text-sm text-slate-700">3.5 ⭐ & up</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
