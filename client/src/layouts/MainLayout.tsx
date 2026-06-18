import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main
        style={{
          minHeight: showNavbar ? "calc(100vh - 64px)" : "100vh",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
