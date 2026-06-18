import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Avatar,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const { user } = useAuth();
  const { items } = useCart();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h5"
          sx={{
            textDecoration: "none",
            color: "text.primary",
            fontWeight: 700,
          }}
        >
          ShopSphere
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button component={RouterLink} to="/products" color="inherit">
            Products
          </Button>

          <IconButton component={RouterLink} to="/wishlist" color="inherit">
            <FavoriteBorderIcon />
          </IconButton>

          <IconButton component={RouterLink} to="/cart" color="inherit">
            <Badge badgeContent={items.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          {user ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ width: 36, height: 36 }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                component={RouterLink}
                to="/profile"
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  fontWeight: 500,
                }}
              >
                {user.name}
              </Typography>
            </Box>
          ) : (
            <Button component={RouterLink} to="/login" variant="contained">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
