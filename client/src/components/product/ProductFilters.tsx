import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import { useGetCategoriesQuery } from "../../features/categories/categoryApi";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const ProductFilters = ({ category, setCategory }: Props) => {
  const { data, isLoading } = useGetCategoriesQuery(undefined);

  const categories = data?.data || [];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
        Categories
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>

        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
        >
          <MenuItem value="">All Categories</MenuItem>

          {isLoading ? (
            <MenuItem disabled>
              <CircularProgress size={18} />
            </MenuItem>
          ) : (
            categories.map((cat: any) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ProductFilters;
