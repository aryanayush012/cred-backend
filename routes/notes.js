const express = require("express");
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// ROUTE 1: fetch all notes data: GET "/api/auth/fetchallnotes".  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 1");
  }
});

// ROUTE 2: add anew note: POST "/api/auth/addnote".  login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("BankName", "Enter a valid BankName").isLength({ min: 3 }),
    body("CardNumber", "enter atleast 5 character CardNumber").isLength({
      min: 3,
    }),
    body("CardHolderName", "enter atleast 5 character CardHolderName").isLength(
      { min: 3 }
    ),
    body("ExpiryDate", "enter atleast 5 character ExpiryDate").isLength({
      min: 3,
    }),
    body("cvc", "enter atleast 5 character cvc").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { BankName, CardNumber, CardHolderName, ExpiryDate, cvc } = req.body;
    try {
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        BankName,
        CardNumber,
        CardHolderName,
        ExpiryDate,
        cvc,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error 2");
    }
  }
);

// ROUTE 3: update an existing note: PUT "/api/auth/updatenote".  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { BankName, CardNumber, CardHolderName, ExpiryDate, cvc } = req.body;
  try {
    //create a new note object
    const newNote = {};
    if (BankName) {
      newNote.BankName = BankName;
    }
    if (CardNumber) {
      newNote.CardNumber = CardNumber;
    }
    if (CardHolderName) {
      newNote.CardHolderName = CardHolderName;
    }
    if (ExpiryDate) {
      newNote.ExpiryDate = ExpiryDate;
    }
    if (cvc) {
      newNote.cvc = cvc;
    }

    //validate
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed");
    }

    //find the note to be updated and update it
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 3");
  }
});

// ROUTE 4: delete an existing note: DELETE "/api/auth/deletenote".  login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //validate
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Action not allowed");
    }

    //find the note to be deletion and delete it
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error 4");
  }
});
module.exports = router;
