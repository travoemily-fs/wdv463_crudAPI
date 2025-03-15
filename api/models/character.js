const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  aliases: {
    type: [String],
    default: [],
  },
  age: {
    type: Number,
    default: null,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["female", "male", "non binary", "unknown"],
    required: true,
    trim: true,
  },
  species: {
    type: String,
    enum: ["supe", "human"],
    required: true,
    trim: true,
  },
  abilities: {
    type: [String],
    default: [],
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  knownAllies: {
    type: [String],
    default: [],
  },
  knownEnemies: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ["alive", "deceased", "unknown"],
    default: "alive",
    trim: true,
  },
  threatLevel: {
    type: String,
    enum: ["high", "moderate", "low", "none"],
    default: "none",
    trim: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Character", characterSchema);
