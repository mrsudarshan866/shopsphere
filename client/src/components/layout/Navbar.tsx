import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const { user } = useAuth();
  const { items } = useCart();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ShopSphere
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/products">Products</Link>

          <Link to="/wishlist">
            <Heart />
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart />

            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
              {items.length}
            </span>
          </Link>

          {user ? (
            <Link to="/profile">{user.name}</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
