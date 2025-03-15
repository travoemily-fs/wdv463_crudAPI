const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

const characterRouter = require("./routes/characters");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database connection established."));

app.use(express.json());
app.use("/api/v1/characters", characterRouter);

// look in the react build folder for static build
app.use(express.static(path.join(__dirname, "../reactjs/build")));

// for any routes not defined by the api, assume its a direct request to a client-side server route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is currently running on ${PORT}`);
});
