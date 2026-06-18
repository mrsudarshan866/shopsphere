import { Link } from "react-router-dom";

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>

        <p className="text-lg font-bold mt-2">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
