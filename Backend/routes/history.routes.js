const express = require("express");
const router = express.Router();

const {
  getAIHistory,
  deleteAIHistory,
} = require("../controllers/history.controller");

const { protect } = require("../middleware/auth.middleware");

// Get all history
router.get("/", protect, getAIHistory);

// Delete a history record
router.delete("/:id", protect, deleteAIHistory);

module.exports = router;