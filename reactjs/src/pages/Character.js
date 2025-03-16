import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Character() {
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [values, setValues] = useState({
    name: "",
    aliases: "", // convert to array on submit
    age: "",
    species: "",
    abilities: "", // convert to array on submit
    occupation: "",
    knownAllies: "", // convert to array on submit
    knownEnemies: "", // convert to array on submit
    status: "alive", // default schema value
    threatLevel: "none", // default schema value
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
      : process.env.REACT_APP_BASE_URL;

  // simulates unmounting
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getCharacter();
    }
    return () => {
      ignore = true;
    };
  }, []);

  // GET CHARACTER
  const getCharacter = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/characters/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          setValues({
            name: data.name || "",
            aliases: data.aliases ? data.aliases.join(", ") : "", // convert array to string
            age: data.age ? data.age.toString() : "",
            gender: data.gender || "",
            species: data.species || "",
            abilities: data.abilities ? data.abilities.join(", ") : "", // convert array to string
            occupation: data.occupation || "",
            knownAllies: data.knownAllies ? data.knownAllies.join(", ") : "", // convert array to string
            knownEnemies: data.knownEnemies ? data.knownEnemies.join(", ") : "", // convert array to string
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

  // DELETE CHARACTER
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

  // UPDATE CHARACTER
  const updateCharacter = async () => {
    // converting the raw string inputs from the form that need to be processed as arrays to correct format
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
        body: JSON.stringify(formattedValues), // call for formatted values
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
  // SUBMIT FOR UPDATE HANDLER
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCharacter();
  };

  // UPDATE CHARACTER HANDLER
  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vought International Database</h1>

        <div className="profile-details">
          <p>
            <strong>Name:</strong> {values.name}
          </p>
          <p>
            <strong>Aliases:</strong> {values.aliases}
          </p>
          <p>
            <strong>Age:</strong> {values.age}
          </p>
          <p>
            <strong>Gender:</strong> {values.gender}
          </p>
          <p>
            <strong>Species:</strong> {values.species}
          </p>
          <p>
            <strong>Abilities:</strong> {values.abilities}
          </p>
          <p>
            <strong>Occupation:</strong> {values.occupation}
          </p>
          <p>
            <strong>Known Allies:</strong> {values.knownAllies}
          </p>
          <p>
            <strong>Known Enemies:</strong> {values.knownEnemies}
          </p>
          <p>
            <strong>Status:</strong> {values.status}
          </p>
          <p>
            <strong>Threat Level:</strong> {values.threatLevel}
          </p>
        </div>

        <button onClick={() => deleteCharacter()}>Delete Profile</button>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>

        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Aliases:
            <input
              type="text"
              name="aliases"
              value={values.aliases}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={values.gender}
              onChange={handleInputChanges}>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non binary">Non Binary</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label>
            Species:
            <select
              name="species"
              value={values.species}
              onChange={handleInputChanges}>
              <option value="">Select Species</option>
              <option value="supe">Supe</option>
              <option value="human">Human</option>
            </select>
          </label>
          <label>
            Abilities:
            <input
              type="text"
              name="abilities"
              value={values.abilities}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Occupation:
            <input
              type="text"
              name="occupation"
              value={values.occupation}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Known Allies:
            <input
              type="text"
              name="knownAllies"
              value={values.knownAllies}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Known Enemies:
            <input
              type="text"
              name="knownEnemies"
              value={values.knownEnemies}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={values.status}
              onChange={handleInputChanges}>
              <option value="">Select Status</option>
              <option value="alive">Alive</option>
              <option value="deceased">Deceased</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label>
            Threat Level:
            <select
              name="threatLevel"
              value={values.threatLevel}
              onChange={handleInputChanges}>
              <option value="">Select Threat Level</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
              <option value="none">None</option>
            </select>
          </label>
          <input type="submit" value="submit" />
        </form>
      </header>
    </div>
  );
}

export default Character;
