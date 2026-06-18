import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-black text-white">
      <div className="p-6 text-xl font-bold">Admin Panel</div>

      <nav className="flex flex-col">
        <NavLink to="/admin" className="px-6 py-4 hover:bg-gray-800">
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className="px-6 py-4 hover:bg-gray-800">
          Products
        </NavLink>

        <NavLink to="/admin/orders" className="px-6 py-4 hover:bg-gray-800">
          Orders
        </NavLink>

        <NavLink to="/admin/users" className="px-6 py-4 hover:bg-gray-800">
          Users
        </NavLink>

        <NavLink to="/admin/categories" className="px-6 py-4 hover:bg-gray-800">
          Categories
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
