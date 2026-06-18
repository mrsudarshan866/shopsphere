import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useNavigate, Link } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import {
  PersonAddOutlined,
  Visibility,
  VisibilityOff,
  Close,
} from "@mui/icons-material";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const submitHandler = async (data: RegisterFormValues) => {
    try {
      setErrorMessage("");

      await registerUser(data).unwrap();

      navigate("/login");
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Registration failed");
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
              <PersonAddOutlined
                sx={{
                  fontSize: 20,
                  color: "green",
                  mb: 1,
                }}
              />

              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                Create Account
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
              Join ShopSphere today
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
                label="Full Name"
                margin="normal"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                label="Email Address"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                })}
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
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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
                  "Create Account"
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RegisterPage;
