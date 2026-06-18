import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  images?: {
    url: string;
  }[];
}

interface Props {
  products: Product[];
}

const ProductGrid = ({ products }: Props) => {
  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid sx={{width: 290, border: "0.5px solid grey", borderRadius: "20px", overflow: "hidden"}} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
