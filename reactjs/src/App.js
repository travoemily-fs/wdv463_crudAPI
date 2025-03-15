import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000`
      : process.env.REACT_APP_BASE_URL;

  // simulates unmounting
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getCharacters();
    }
    return () => {
      ignore = true;
    };
  }, []);

  // GET ALL
  const getCharacters = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/characters`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setCharacters(data);
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Characters:</h1>
        <ul>
          <li>characters</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
