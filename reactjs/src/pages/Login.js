import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import AuthService from "../services/auth.service";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password).then(
        (response) => {
          navigate("/dashboard");
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Log in
      </Typography>

      <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fillWidth
            label="password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Log in
          </Button>
        </Stack>
      </Box>

      <Box mt={4}>
        <Button variant="outlined" color="secondary" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
