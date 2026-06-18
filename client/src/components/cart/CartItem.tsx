import { useRemoveCartItemMutation } from "../../features/cart/cartApi";

interface Props {
  item: any;
}

const CartItem = ({ item }: Props) => {
  const [removeItem] = useRemoveCartItemMutation();

  return (
    <div className="flex gap-4 border rounded-lg p-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover"
      />

      <div className="flex-1">
        <h3>{item.name}</h3>

        <p>₹{item.price}</p>

        <p>Qty: {item.quantity}</p>
      </div>

      <button
        onClick={() => removeItem(item.productId)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
