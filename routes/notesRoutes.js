const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Note = require("../models/notes");
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/addnote",
  authMiddleware,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ max: 50 })
      .withMessage("Title must be less then 50 characters"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 200 })
      .withMessage("Description cannot exceed 200 characters"),
    body("text")
      .notEmpty()
      .withMessage("Text is required")
      .isLength({ max: 1500 })
      .withMessage("Text cannot exceed 1500 characters"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { title, description, text } = req.body;

      const note = new Note({
        user: req.user.userId,
        title,
        description,
        text,
      });

      await note.save();
      res.status(201).json({ message: "Note created successfully", note });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.put(
  "/editnote/:id",
  authMiddleware,
  [
    body("title")
      .optional()
      .isLength({ max: 50 })
      .withMessage("Title must be less than 50 characters"),
    body("description")
      .optional()
      .isLength({ max: 200 })
      .withMessage("Description cannot exceed 200 characters"),
    body("Text")
      .optional()
      .isLength({ max: 1500 })
      .withMessage("Text cannot exceed 1500 characters"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, text } = req.body;

      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }

      if (note.user.toString() !== req.user.userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to edit this note" });
      }

      if (title) note.title = title;
      if (description) note.description = description;
      if (text) note.text = text;

      const updatedNote = await note.save();
      return res
        .status(200)
        .json({ message: "Note updated successfully", note: updatedNote });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.delete("/deletenotes", authMiddleware, async (req, res) => {
  try {
    const result = await Note.deleteMany({ user: req.user.userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }

    return res.status(200).json({
      message: "All notes deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/deletenote/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getnotes", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    return res
      .status(200)
      .json({
        message: "Notes fetched successfully",
        count: notes.length,
        notes,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getnote/:id", authMiddleware, async (req, res) => {
  try {

    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Note authorized tio view this note" });
    }

    return res.status(200).json({ message: "Note fetched successfully", note });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
})

module.exports = router;
