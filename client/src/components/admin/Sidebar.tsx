import { NavLink } from "react-router-dom";

import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  // Typography,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";

const drawerWidth = 260;

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: <InventoryIcon />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCartIcon />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <PeopleIcon />,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: <CategoryIcon />,
  },
];

const AdminSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Toolbar>
        <h2>ShopSphere</h2>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
