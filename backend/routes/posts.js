const auth = require("../middleware/authMiddleware");


const { body, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const Note = require("../models/Note");


// 🔹 CREATE Note
router.post(
  "/create",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required")
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = await Note.create(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);



// 🔹 GET All Notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 UPDATE Note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 DELETE Note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
