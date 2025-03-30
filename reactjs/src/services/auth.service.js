import axios from "axios";

const API_BASE =
process.env.NODE_ENV === "development"
  ? "http://localhost:8000/api/v1"
  : process.env.REACT_APP_BASE_URL;

const API_URL = "/auth";

// sign up route
const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}${API_URL}/`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (err) {
    console.error("signup failed:", err);
    throw err;
  }
};

// login route
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}${API_URL}/signin`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    console.error("login failed:", err);
    throw err;
  }
};

// logout route
const logout = async () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
