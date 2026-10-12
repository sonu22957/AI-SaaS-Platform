import api from "./api";

export async function generateText(prompt, contentType = "general") {
  const response = await api.post("/ai/generate", {
    prompt,
    contentType,
  });

  const data = response.data;
  const text =
    data.response ||
    data.text ||
    data.content ||
    data.result ||
    data.data?.response ||
    data.data?.text ||
    data.data?.content ||
    data.data?.result;

  if (data.success === false || typeof text !== "string" || !text.trim()) {
    throw new Error(data.message || "The AI response did not include generated text.");
  }

  return text;
}

export async function testAIConnection() {
  const response = await api.get("/ai/test-connection");
  return response.data;
}