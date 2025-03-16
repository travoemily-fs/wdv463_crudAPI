import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
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

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8000/api/v1`
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
      await fetch(`${API_BASE}/characters/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formattedValues), // call for formatted values
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
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vought International Database</h1>
        <h2>Security Clearance: 5</h2>
        <p>
          {" "}
          For approved eyes only. Any Vought employee who distributes, re-sells,
          alters, or deletes sensitive data will immediately terminated and may
          face legal and/or criminal prosecution.{" "}
        </p>
        <Link to="/">Home</Link>
        <ul>
          {characters?.map((character) => (
            <li key={character._id}>
              <Link to={`/character/${character._id}`}>{character.name} </Link>
            </li>
          ))}
        </ul>

        <h2>Create new profile:</h2>
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

export default Dashboard;
