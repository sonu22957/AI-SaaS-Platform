const { testGeminiConnection, generateText: aiGenerateText } = require("../services/ai.service");

const checkGeminiConnection = async (req, res) => {
  try {
    const response = await testGeminiConnection("Reply with exactly: Gemini connection successful!");

    return res.status(200).json({
      success: true,
      message: "Gemini AI connected successfully!",
      response,
    });
  } catch (error) {
    console.error("Gemini connection error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Gemini AI connection failed",
      error: error.message,
    });
  }
};

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Assuming you have a function in your service to generate text
    const response = await aiGenerateText(prompt);

    return res.status(200).json({
      success: true,
      message: "AI text generated successfully!",
      response,
    });
  } catch (error) {
    console.error("AI text generation error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI text",
      error: error.message,
    });
  }
};

module.exports = { checkGeminiConnection, generateText };