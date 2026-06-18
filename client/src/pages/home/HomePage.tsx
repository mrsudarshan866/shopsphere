import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useGetProductsQuery } from "../../features/products/productApi";
import ProductGrid from "../../components/product/ProductGrid";
import Loader from "../../components/common/Loader";

const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 20,
  });

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          color: "#fff",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.55)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 700 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, fontFamily: "monospace" }}
              gutterBottom
            >
              Shop Smarter.
              <br />
              Live Better.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.8,
              }}
            >
              Discover premium electronics, fashion, accessories, and more with
              unbeatable quality and prices.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                component={RouterLink}
                to="/products"
                variant="contained"
                size="large"
              >
                Shop Now
              </Button>

              <Button
                component={RouterLink}
                to="/register"
                variant="outlined"
                size="large"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  "&:hover": {
                    borderColor: "#fff",
                  },
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 8,
          }}
        >
          {[
            {
              title: "Fast Delivery",
              description: "Quick and secure shipping worldwide.",
            },
            {
              title: "Secure Payments",
              description: "100% safe and trusted transactions.",
            },
            {
              title: "Premium Quality",
              description: "Curated products from top brands.",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                p: 4,
                borderRadius: 5,
                bgcolor: "background.paper",
                boxShadow: 2,
                border: "1px solid grey"
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }} gutterBottom>
                {item.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">{item.description}</Typography>
            </Box>
          ))}
        </Box>

        {/* Products Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Featured Products
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Hand-picked products just for you.
            </Typography>
          </Box>

          <Button component={RouterLink} to="/products" variant="outlined">
            View All
          </Button>
        </Box>

        <ProductGrid products={data?.products ?? []} />
      </Container>
    </>
  );
};

export default HomePage;
