import useCart from '../../hook/useCart';

function Card({ product }) {
  //   console.log(product);
  const { cart, setCart } = useCart();
  const handleAddToCart = async (data) => {
    const cartData = {
      id: data.id,
      productId: data.id,
      quantity: 1,
      product: {
        data,
      },
    };
    await fetch(`http://localhost:9000/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
    const res = await fetch(`http://localhost:9000/cart`);
    const c = await res.json();
    setCart(c);
  };
  const cartItem = cart?.data?.find((item) => item.productId === product.id);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:9000/cart/${id}`, {
      method: 'DELETE',
    });
    const res = await fetch(`http://localhost:9000/cart`);
    const c = await res.json();
    setCart(c);
  };

  return (
    <>
      <div className="soft-card overflow-hidden hover:-translate-y-1 transition-all">
        <div className="aspect-square bg-linear-to-br from-slate-100 via-white to-rose-50 flex items-center justify-center">
          <img
            src={`http://localhost:9000/${product?.image}`}
            alt="Ultrabook"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">
              {product?.title}
            </h3>
            <span className="px-2 py-1 text-xs rounded-full bg-orange-50 text-orange-600 font-semibold">
              Portable
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-amber-500">⭐ {product?.rating_rate}</span>
            <span className="text-slate-500">
              ({product?.rating_count} reviews)
            </span>
          </div>
          {/* <!-- create date --> */}
          <p className="text-slate-500 text-sm">
            Upload on:{' '}
            <span className="font-semibold">
              {new Date(product?.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </p>

          <p className="text-slate-600 text-sm line-clamp-2">
            {product?.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900">
              ${product?.price}
            </span>
            <span className="text-sm text-emerald-600 font-medium">
              In Stock ({product?.stock})
            </span>
          </div>
          {!cartItem ? (
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full button-primary py-2.5 rounded-lg font-semibold"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => handleDelete(cartItem?.id)}
              className="w-full button-primary py-2.5 rounded-lg font-semibold"
            >
              Remove to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
