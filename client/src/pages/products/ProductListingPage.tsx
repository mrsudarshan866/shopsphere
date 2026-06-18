import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import ProductGrid from "../../components/product/ProductGrid";
import ProductFilters from "../../components/product/ProductFilters";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import { useGetProductsQuery } from "../../features/products/productApi";

const ProductsListingPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  const { data, isLoading, isError } = useGetProductsQuery({
    page,
    category,
  });

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography color="error">Failed to load products.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 12 }}>
          <ProductFilters
            category={category}
            setCategory={handleCategoryChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Products
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {data?.products?.length || 0} products found
            </Typography>
          </Box>

          <ProductGrid products={data?.products ?? []} />

          {data?.pagination?.pages > 1 && (
            <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
              <Pagination
                currentPage={page}
                totalPages={data.pagination.pages}
                onPageChange={setPage}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsListingPage;
