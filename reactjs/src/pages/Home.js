import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function Home() {
  return (
    <Container sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Vought International
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Security Clearance Check Required
      </Typography>

      <Box>
        <Button
          variant="contained"
          component={Link}
          to="/dashboard"
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          })}>
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
