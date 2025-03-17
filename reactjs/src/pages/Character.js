import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Character() {
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

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getCharacter();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getCharacter = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/characters/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({
            name: data.name || "",
            aliases: data.aliases ? data.aliases.join(", ") : "",
            age: data.age ? data.age.toString() : "",
            gender: data.gender || "",
            species: data.species || "",
            abilities: data.abilities ? data.abilities.join(", ") : "",
            occupation: data.occupation || "",
            knownAllies: data.knownAllies ? data.knownAllies.join(", ") : "",
            knownEnemies: data.knownEnemies ? data.knownEnemies.join(", ") : "",
            status: data.status || "alive",
            threatLevel: data.threatLevel || "none",
          });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCharacter = async () => {
    try {
      await fetch(`${API_BASE}/characters/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateCharacter = async () => {
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
      await fetch(`${API_BASE}/characters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      })
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCharacter();
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

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {values.name}
        </Typography>
        <Typography variant="body1">
          <strong>Aliases:</strong> {values.aliases}
        </Typography>
        <Typography variant="body1">
          <strong>Age:</strong> {values.age}
        </Typography>
        <Typography variant="body1">
          <strong>Gender:</strong> {values.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Species:</strong> {values.species}
        </Typography>
        <Typography variant="body1">
          <strong>Abilities:</strong> {values.abilities}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation:</strong> {values.occupation}
        </Typography>
        <Typography variant="body1">
          <strong>Known Allies:</strong> {values.knownAllies}
        </Typography>
        <Typography variant="body1">
          <strong>Known Enemies:</strong> {values.knownEnemies}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {values.status}
        </Typography>
        <Typography variant="body1">
          <strong>Threat Level:</strong> {values.threatLevel}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="error"
          onClick={deleteCharacter}
          sx={{ mr: 2 }}>
          Delete Profile
        </Button>
        <Button variant="outlined" component={RouterLink} to="/" sx={{ mr: 2 }}>
          Home
        </Button>
        <Button variant="outlined" component={RouterLink} to="/dashboard">
          Dashboard
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Update Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
        }}>
        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={handleInputChanges}
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
          Update Profile
        </Button>
      </Box>
    </Container>
  );
}

export default Character;
