import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProducts, deleteProduct } from "../../services/admin.service";

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getProducts,
  });

  const mutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Products
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product</strong>
              </TableCell>

              <TableCell>
                <strong>Price</strong>
              </TableCell>

              <TableCell>
                <strong>Stock</strong>
              </TableCell>

              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.products?.map((product: any) => (
              <TableRow key={product._id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={product.images?.[0]?.url || product.images?.[0]}
                      alt={product.name}
                      width={60}
                      height={60}
                      style={{
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />

                    <Typography sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>₹{product.price}</TableCell>

                <TableCell>
                  <Chip
                    label={`${product.stock} Available`}
                    color={product.stock > 0 ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <Button startIcon={<EditIcon />} size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon />}
                    disabled={mutation.isPending}
                    onClick={() => {
                      if (window.confirm("Delete this product?")) {
                        mutation.mutate(product._id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {!data?.products?.length && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
