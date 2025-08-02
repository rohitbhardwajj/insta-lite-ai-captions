// controllers/post.controller.js
const generateCaptions = require("../services/ai.integration.service");
const uploadToImagekit = require("../services/cloud.service");
const postModels = require("../models/post.model");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  const token = req.cookies.token;
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const base64ImageFile = file.buffer.toString("base64");
    const captionResponse = await generateCaptions(base64ImageFile);
    const imageUploadResponse = await uploadToImagekit(file.buffer);


    await postModels.create({
      userId: decode.id,
      image: imageUploadResponse.url,
      caption: captionResponse,
    });

    res.status(200).json({
      message: "Post created successfully",
      caption: captionResponse,
      imageUrl: imageUploadResponse.url,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = createPost;
