import { useCart } from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const CartPage = () => {
  const { items } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-5">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
};

export default CartPage;
