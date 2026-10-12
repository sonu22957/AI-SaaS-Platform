const AIHistory = require("../models/AIHistory");

// Get logged-in user's AI history
const getAIHistory = async (req, res) => {
  try {
    const history = await AIHistory.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Get AI history error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch AI history.",
    });
  }
};

// Delete one history record
const deleteAIHistory = async (req, res) => {
  try {
    const history = await AIHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "History deleted successfully.",
    });
  } catch (error) {
    console.error("Delete AI history error:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid history ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete AI history.",
    });
  }
};

module.exports = {
  getAIHistory,
  deleteAIHistory,
};