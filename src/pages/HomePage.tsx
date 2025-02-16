import React from "react";
import {
  Container,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LoginForm } from '../features/auth/login/ui';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <h1>Note Taking App</h1>
        <p>Please log in to continue</p>
        <LoginForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/register")}>Register</Button>
        </Typography>
      </Box>
    </Container>
  );
};
