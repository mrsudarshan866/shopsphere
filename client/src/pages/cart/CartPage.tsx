import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const CartPage = () => {
  const { items } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          elevation={2}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 80,
              color: "text.secondary",
              mb: 2,
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
            Your Cart is Empty
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any products yet.
          </Typography>

          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Shopping Cart
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {items.map((item) => (
                <Paper
                  key={item.productId}
                  elevation={1}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <CartItem item={item} />
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Summary */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                position: "sticky",
                top: 24,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Order Summary
              </Typography>

              <CartSummary subtotal={subtotal} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
