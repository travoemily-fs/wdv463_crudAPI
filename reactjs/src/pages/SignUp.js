import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import AuthService from "../services/auth.service";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await AuthService.signup(email, password).then(
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
        Sign Up
      </Typography>

      <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
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
            Sign Up
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

export default SignUp;
