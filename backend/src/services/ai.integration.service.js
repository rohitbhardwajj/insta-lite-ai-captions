const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateCaptions(base64ImageFile) {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image in 2 engaging lines in Hindi with emojis. Only return the caption. Do not explain anything or add introductory text." },
  ];

  try {
    const result = await model.generateContent(contents);
    const response = await result.response;
    const captionText = response.text();

    return captionText;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption from AI service.");
  }
}

module.exports = generateCaptions;


