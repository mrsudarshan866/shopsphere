import { Button, Container, Stack, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }} color="primary">
          404
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Page Not Found
        </Typography>

        <Typography variant="subtitle2" sx={{ my: 2 }} color="text.secondary">
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<Home />}
          size="small"
        >
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
