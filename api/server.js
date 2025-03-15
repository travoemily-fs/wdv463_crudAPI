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
app.use("/characters", characterRouter);

app.listen(PORT, () => {
  console.log(`server is currently running on ${PORT}`);
});
