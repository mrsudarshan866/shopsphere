import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetProductQuery } from "../../features/products/productApi";

import { addItem } from "../../features/cart/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { data } = useGetProductQuery(id);

  const product = data?.data;

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="mt-5 text-gray-600">{product.description}</p>

          <h2 className="text-3xl font-bold mt-6">₹{product.price}</h2>

          <button
            onClick={() =>
              dispatch(
                addItem({
                  productId: product._id,
                  name: product.name,
                  image: product.images[0],
                  quantity: 1,
                  price: product.price,
                }),
              )
            }
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
