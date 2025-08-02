const postModels = require("../models/post.model");

async function getPosts(req, res) {
  try {
    const id = req.user._id;

    const data = await postModels.findOne({ userId: id }); 

    res.status(200).json({
      message: "User fetched successfully",
      data: data
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = getPosts;
