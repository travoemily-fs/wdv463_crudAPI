// Dashboard.js
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Dashboard() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    aliases: "",
    age: "",
    species: "",
    abilities: "",
    occupation: "",
    knownAllies: "",
    knownEnemies: "",
    status: "alive",
    threatLevel: "none",
    gender: "",
  });

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
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

  // ADD NEW CHARACTER FUNCTIONALITY
  const createCharacter = async () => {
    const formattedValues = {
      ...values,
      age: values.age === "" ? null : Number(values.age),
      aliases: values.aliases
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      abilities: values.abilities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      knownAllies: values.knownAllies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      knownEnemies: values.knownEnemies
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      await fetch(`${API_BASE}/characters/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formattedValues),
      }).then(() => getCharacters());
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCharacter();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Vought International Database
      </Typography>
      <Typography variant="h5" gutterBottom>
        Security Clearance: 5
      </Typography>

      <Button
        variant="contained"
        component={RouterLink}
        to="/"
        sx={{ mb: 2 }}
        style={{
          marginBottom: "50px",
        }}>
        Go Home
      </Button>

      <Typography variant="h5" gutterBottom>
        View All
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}
      {loading && <Typography>Loading...</Typography>}

      {characters && characters.length > 0 ? (
        <List sx={{ mb: 4 }}>
          {characters.map((character) => (
            <ListItem disablePadding key={character._id}>
              <ListItemButton
                component={RouterLink}
                to={`/character/${character._id}`}>
                <ListItemText primary={character.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ mb: 4 }}>
          No characters found.
        </Typography>
      )}

      <Typography variant="h5" gutterBottom>
        Create New Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
        }}>
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleInputChanges}
          required
        />
        <TextField
          label="Aliases (comma separated)"
          name="aliases"
          value={values.aliases}
          onChange={handleInputChanges}
        />
        <TextField
          label="Age"
          type="number"
          name="age"
          value={values.age}
          onChange={handleInputChanges}
        />
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={values.gender}
            label="Gender"
            onChange={handleInputChanges}>
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="non binary">Non Binary</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select
            name="species"
            value={values.species}
            label="Species"
            onChange={handleInputChanges}>
            <MenuItem value="">Select Species</MenuItem>
            <MenuItem value="supe">Supe</MenuItem>
            <MenuItem value="human">Human</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Abilities (comma separated)"
          name="abilities"
          value={values.abilities}
          onChange={handleInputChanges}
        />
        <TextField
          label="Occupation"
          name="occupation"
          value={values.occupation}
          onChange={handleInputChanges}
        />
        <TextField
          label="Known Allies (comma separated)"
          name="knownAllies"
          value={values.knownAllies}
          onChange={handleInputChanges}
        />
        <TextField
          label="Known Enemies (comma separated)"
          name="knownEnemies"
          value={values.knownEnemies}
          onChange={handleInputChanges}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={values.status}
            label="Status"
            onChange={handleInputChanges}>
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="alive">Alive</MenuItem>
            <MenuItem value="deceased">Deceased</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Threat Level</InputLabel>
          <Select
            name="threatLevel"
            value={values.threatLevel}
            label="Threat Level"
            onChange={handleInputChanges}>
            <MenuItem value="">Select Threat Level</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
