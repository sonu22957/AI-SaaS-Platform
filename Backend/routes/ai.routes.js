// const express = require("express");
// const router = express.Router();

// const {
//   checkGeminiConnection,
// } = require("../controllers/ai.controller");

// router.get("/test-connection", checkGeminiConnection);

// module.exports = router;



const express = require("express");
const router = express.Router();

const {
  checkGeminiConnection,
  generateText,
} = require("../controllers/ai.controller");

const { protect } = require("../middleware/auth.middleware");

// Gemini connection test
router.get("/test-connection", checkGeminiConnection);

// Generate AI text
router.post("/generate", protect, generateText);

module.exports = router;