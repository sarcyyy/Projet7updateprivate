const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },

  description: { type: String, required: true },

  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  usersLiked: { type: [String], required: true },
});

module.exports = mongoose.model("Tweet", tweetSchema);
