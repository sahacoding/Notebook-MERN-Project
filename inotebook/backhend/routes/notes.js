const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get All the Notes using: Get "/api/notes/fetchallnotes".  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    // console.log(notes)
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});

// Route 2: Add a new  Notes using: POST "/api/notes/addnotes".  login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("tittle", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { tittle, description, tag } = req.body;
      //if there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        tittle,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

// Route 3: Update An existing  Notes using: PUT "/api/notes/updatenote".  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { tittle, description, tag } = req.body;
  // create a newNote object
  const newNote = {};
  if (tittle) {
    newNote.tittle = tittle;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// Route 4: Delete An existing  Notes using: Delete "/api/notes/deletenote".  login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Find the note to be delete and delete it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  // Allow deletion only if user owns this Note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ Success: "Note has been deleted", note: note });
});
module.exports = router;
