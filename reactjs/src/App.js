import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AuthService from "./services/auth.service";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

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
    setCurrentUser(false); // controls log in / log out switch
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

        {currentUser ? (
          <Button
            variant="contained"
            color="dark"
            onClick={logOut}
            sx={(theme) => ({
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
            })}
            component={Link}
            to="/">
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="dark"
            component={Link}
            to="/login"
            sx={(theme) => ({
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
            })}
            >
            Login
          </Button>
        )}
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
    backgroundColor: grey[900],
    height: "100px",
    alignContent: "center",
  },
};
