import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../features/auth/authApi";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Close,
} from "@mui/icons-material";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const submitHandler = async (values: LoginFormValues) => {
    try {
      setErrorMessage("");

      const response: any = await login(values).unwrap();

      const { user, token } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={8}
          sx={{
            width: "70%",
            borderRadius: 8,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                gap: "7px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockOutlined
                sx={{
                  fontSize: 20,
                  color: "red",
                  mb: 1,
                }}
              />

              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Welcome
              </Typography>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Login to your account
            </Typography>

            {errorMessage && (
              <Alert
                severity="error"
                sx={{ mb: 1, mt: 1 }}
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => setErrorMessage("")}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit(submitHandler)}>
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "12px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px transparent inset",
                    WebkitTextFillColor: "#fff",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "8px",
                    fontWeight: 400,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "12px",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px transparent inset",
                    WebkitTextFillColor: "#fff",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "8px",
                    fontWeight: 400,
                  },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: "18px" }} />
                          ) : (
                            <Visibility sx={{ fontSize: "18px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                size="small"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>

              <Typography
                variant="caption"
                align="center"
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                }}
                color="text.secondary"
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Register
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
