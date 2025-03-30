import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthService from "./services/auth.service";
import { Container, Typography, Button, Box } from "@mui/material";

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <div style={styles.header}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signup"
          sx={styles.myBtn}>
          Sign up
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={styles.myBtn}>
          Login
        </Button>
      </div>
      <section>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/character/:id" exact element={<Character />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;

const styles = {
  myBtn: {
    mx: 1,
    marginLeft: 3,
  },
  header: {
    backgroundColor: "blue",
    height: "100px",
    alignContent: "center",
  },
};
