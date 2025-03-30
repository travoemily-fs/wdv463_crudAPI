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
        Welcome to Vought International Database.
      </Typography>

      <Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard"
          sx={styles.myBtn}>
          Go to Dashboard
        </Button>

      </Box>
    </Container>
  );
}

export default Home;

const styles = {
  myBtn: {
    mx: 1,
  },
};
