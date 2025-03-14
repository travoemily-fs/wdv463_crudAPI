const express = require("express");
const router = express.Router();

const Character = require("../models/character");

// RESTful endpojnts
// GET , POST , PATCH , DELETE

// MIDDLEWARE
const getCharacter = async (req, res, next) => {
  let character;
  try {
    character = await Character.findById(req.params.id);
    if (character === null) {
      return res.status(404).json({ message: "character not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.character = character;
  next();
};

// GET ALL
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE by ID
router.get("/:id", getCharacter, async (req, res) => {
  res.json(res.character);
});

// POST/create
router.post("/", async (req, res) => {
  const character = new Character({
    name: req.body.name,
    occupation: req.body.occupation,
  });
  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH/update
router.patch("/:id", getCharacter, async (req, res) => {
  if (req.body.name != null) {
    res.character.name = req.body.name;
  }
  if (req.body.occupation != null) {
    res.character.occupation = req.body.occupation;
  }
  try {
    const updatedCharacter = await res.character.save();
    res.json(updatedCharacter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getCharacter, async (req, res) => {
  try {
    await res.character.deleteOne();
    res.json({ message: "character has been removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
