import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  product: any;
}

const ProductCard = ({ product }: Props) => {
  const discount =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  return (
    <Card
      component={Link}
      to={`/products/${product._id}`}
      sx={{
        position: "relative",
        overflow: "hidden",
        textDecoration: "none",
        height: "100%",
        bgcolor: "background.paper",
        transition: "all 0.35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",

          "& .product-image": {
            transform: "scale(1.08)",
          },
        },
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <Chip
          label={`${discount}% OFF`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 2,
            fontWeight: 400,
            borderRadius: "20px",
            fontSize: "10px",
          }}
        />
      )}

      {/* Image */}
      <Box sx={{ overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="150"
          className="product-image"
          image={
            product.images?.[0]?.url ||
            "https://via.placeholder.com/400x400?text=No+Image"
          }
          alt={product.name}
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5 }}>
          {product.brand}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1.5,
          }}
        >
          <Rating
            value={product.rating || 0}
            precision={0.5}
            size="small"
            readOnly
          />

          <Typography variant="body2" color="text.secondary">
            ({product.totalReviews || 0})
          </Typography>
        </Box>

        {/* Price */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{
              fontWeight: 800,
            }}
          >
            ₹{product.discountPrice || product.price}
          </Typography>

          {product.discountPrice && product.discountPrice < product.price && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
              }}
            >
              ₹{product.price}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
