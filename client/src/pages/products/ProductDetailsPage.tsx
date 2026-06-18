import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Rating,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import { useGetProductQuery } from "../../features/products/productApi";
import { addItem } from "../../features/cart/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useGetProductQuery(id);

  const product = data?.data;

  const [qty, setQty] = useState(1);

  if (!product) return null;

  const image =
    product.images?.[0]?.url ||
    product.images?.[0] ||
    "https://via.placeholder.com/600";

  return (
    <Box
      sx={{
        bgcolor: "#f8fafc",
        minHeight: "50vh",
        py: 2,
      }}
    >
      <Box sx={{ px: 3, maxWidth: "xl", mx: "auto" }}>
        <Grid container spacing={5}>
          {/* Product Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                overflow: "hidden",
                borderRadius: 6,
                bgcolor: "white",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                component="img"
                src={image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 4,
                  transition: "0.4s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                position: "sticky",
                top: 20,
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Chip
                label="In Stock"
                color="success"
                sx={{
                  borderRadius: 10,
                  fontWeight: 400,
                }}
              />

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mt: 2 }}
                gutterBottom
              >
                {product.name}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                {product.brand}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mt: 2 }}
              >
                <Rating
                  value={product.rating || 4.5}
                  precision={0.5}
                  readOnly
                />

                <Typography color="text.secondary">
                  ({product.totalReviews || 0} Reviews)
                </Typography>
              </Stack>

              {/* Price */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", mt: 1 }}
              >
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: 800 }}
                >
                  ₹{product.discountPrice || product.price}
                </Typography>

                {product.discountPrice && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{product.price}
                  </Typography>
                )}
              </Stack>

              {/* Description */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.9 }}
              >
                {product.description}
              </Typography>

              {/* Quantity */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Quantity
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <IconButton
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {qty}
                  </Typography>

                  <IconButton
                    onClick={() => setQty((prev) => prev + 1)}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Box>

              {/* Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ mt: 2 }}
                spacing={2}
              >
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() =>
                    dispatch(
                      addItem({
                        productId: product._id,
                        name: product.name,
                        image,
                        quantity: qty,
                        price: product.price,
                      }),
                    )
                  }
                  sx={{
                    py: 0,
                    borderRadius: 4,
                    fontWeight: 400,
                  }}
                >
                  Add To Cart
                </Button>

                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  startIcon={<FlashOnIcon />}
                  sx={{
                    py: 1,
                    borderRadius: 4,
                    fontWeight: 700,
                  }}
                >
                  Buy Now
                </Button>
              </Stack>

              {/* Features */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 2, flexWrap: "wrap" }}
                useFlexGap
              >
                <Chip label="🚚 Free Shipping" />
                <Chip label="🔄 Easy Returns" />
                <Chip label="🛡 Warranty" />
                <Chip label="🔒 Secure Payment" />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
